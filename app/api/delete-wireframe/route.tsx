import { db } from "@/configs/db";
import { WireFrameToCodeTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";
// Update this path

export async function POST(req: NextRequest) {
  try {
    const { uid, imageUrl } = await req.json();

    if (!uid) {
      return NextResponse.json(
        { error: "Wireframe ID is required" },
        { status: 400 }
      );
    }

    // Track if image deletion was successful
    let imageDeleted = false;

    // Handle image deletion if URL is provided
    if (imageUrl && typeof imageUrl === "string") {
      try {
        console.log("Attempting to delete image from URL:", imageUrl);

        // Extract the numeric ID from the URL using regex
        const matches = imageUrl.match(/Frame_to_code(?:%2F|\/)([\d]+)/i);
        const filename = matches && matches[1] ? matches[1] : null;

        if (filename) {
          console.log("Extracted filename:", filename);

          // Construct the correct path
          const fullPath = `Frame_to_code/${filename}`;

          console.log("Deleting file at path:", fullPath);
          const imageRef = ref(storage, fullPath);
          await deleteObject(imageRef);

          console.log("Image successfully deleted");
          imageDeleted = true;
        } else {
          console.error("Could not extract filename from URL:", imageUrl);
        }
      } catch (imageError) {
        console.error("Error deleting image from Firebase:", imageError);
        // We'll continue even if image deletion fails
      }
    }

    // Delete the record from the database
    const deleteResult = await db
      .delete(WireFrameToCodeTable)
      .where(eq(WireFrameToCodeTable.uid, uid))
      .returning({ id: WireFrameToCodeTable.id });

    if (!deleteResult || deleteResult.length === 0) {
      return NextResponse.json(
        { error: "Wireframe not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deletedId: deleteResult[0].id,
      imageDeleted,
    });
  } catch (error: any) {
    console.error("Error deleting wireframe:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete wireframe" },
      { status: 500 }
    );
  }
}

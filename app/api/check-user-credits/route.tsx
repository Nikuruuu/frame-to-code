import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Query the database for user credits
    const creditResult = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    // Check if user exists
    if (!creditResult || creditResult.length === 0) {
      return NextResponse.json(
        { error: "User not found", hasEnoughCredits: false, credits: 0 },
        { status: 404 }
      );
    }

    // Check if user has enough credits
    const userCredits = creditResult[0]?.credits || 0;
    const hasEnoughCredits = userCredits > 0;

    return NextResponse.json({
      hasEnoughCredits,
      credits: userCredits,
    });
  } catch (error) {
    console.error("Error checking credits:", error);
    return NextResponse.json(
      { error: "Failed to check credits", hasEnoughCredits: false },
      { status: 500 }
    );
  }
}

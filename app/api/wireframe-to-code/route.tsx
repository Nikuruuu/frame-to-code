import { db } from "@/configs/db";
import { usersTable, WireFrameToCodeTable } from "@/configs/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { description, model, imageUrl, uid, email } = await req.json();

  try {
    // Step 1: Insert wireframe details into DB
    const result = await db
      .insert(WireFrameToCodeTable)
      .values({
        uid,
        imageUrl,
        model,
        description,
        createdBy: email,
      })
      .returning({ id: WireFrameToCodeTable.id });

    // Step 2: Deduct one credit from the user **only if insertion is successful**
    if (result.length > 0) {
      await db
        .update(usersTable)
        .set({ credits: sql`${usersTable.credits} - 1` }) // Deduct 1 credit
        .where(eq(usersTable.email, email));
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing wireframe-to-code:", error);
    return NextResponse.json(
      { error: "Failed to process wireframe-to-code request" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const uid = searchParams?.get("uid");
  const email = searchParams?.get("email");
  if (uid) {
    const result = await db
      .select()
      .from(WireFrameToCodeTable)
      .where(eq(WireFrameToCodeTable.uid, uid));
    return NextResponse.json(result[0]);
  } else if (email) {
    const result = await db
      .select()
      .from(WireFrameToCodeTable)
      .where(eq(WireFrameToCodeTable.createdBy, email));
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "No record found" });
}

export async function PUT(req: NextRequest) {
  const { uid, codeResponse } = await req.json();

  const result = await db
    .update(WireFrameToCodeTable)
    .set({ code: codeResponse })
    .where(eq(WireFrameToCodeTable.uid, uid))
    .returning({ uid: WireFrameToCodeTable.uid });
  return NextResponse.json(result);
}

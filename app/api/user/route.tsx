import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";

export async function POST(req: NextRequest) {
  const { userEmail, userName } = await req.json();

  // try {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, userEmail));

  if (result?.length == 0) {
    // Insert new user - default credits will be used from schema
    const newUser = await db
      .insert(usersTable)
      .values({
        name: userName,
        email: userEmail,
      })
      .returning();

    return NextResponse.json(newUser[0]);
  }
  return NextResponse.json(result[0]);
}

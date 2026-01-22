import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Role } from "@/generated/prisma/enums";

export async function PUT(request) {
  const session = await getServerSession(authOptions);
  const body = await request.json();
  const { userID, newRole } = body;
  if (!session || session.user.role !== Role.ADMIN) {
    return NextResponse.json(
      { error: "Unauthorized Access." },
      { status: 401 },
    );
  }
  try {
    await prisma.user.update({
      where: { userID: userID },
      data: { status: "ACTIVE", role: newRole },
    });
    return NextResponse.json({ message: "User approved successfully." });
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

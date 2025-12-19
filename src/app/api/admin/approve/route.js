import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req){
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const {userID, newRole} = body;
    if(!session || session.user.role !== "ADMIN"){
        return NextResponse.json({error: "Unauthorized Access."}, {status: 401});
    }
    try{
        const updateUser = await prisma.user.update({
            where: {userID: userID},
            data: {status: "ACTIVE", role: newRole}
        });
        return NextResponse.json({message: "User approved successfully."});
    } catch (error){
        return NextResponse.json({message: "Update failed"}, {status: 500});
    }
}
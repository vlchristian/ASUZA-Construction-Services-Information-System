import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserManagement from "@/components/dashboard/UserManagement";
import { redirect } from "next/navigation";
import { Role } from "@/generated/prisma/enums";
import { checkRole } from "@/lib/auth/checkRole";


export default async function AdminUsersPage() {
  await checkRole(Role.ADMIN);
  const pendingUsers = await prisma.user.findMany({
    where: { status: "PENDING_APPROVAL" },
    orderBy: { createdAt: "asc" }
  });
  return (
    <div className="p-8 ml-10 mr-10">
      <div className="justify-between flex">
      <h1 className="text-2xl font-bold mb-6 text-black">User Management</h1>
      
      </div>
      <UserManagement users={pendingUsers}/>
    </div>
  );
}
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminTable from "@/components/AdminTable";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  const pendingUsers = await prisma.user.findMany({
    where: { status: "PENDING_APPROVAL" },
    orderBy: { createdAt: "asc" }
  });
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-4">Welcome, {session.user.username}!</p>
      <AdminTable users={pendingUsers}/>
    </div>
  );
}
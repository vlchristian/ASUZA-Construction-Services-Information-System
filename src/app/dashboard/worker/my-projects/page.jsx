import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import AssignedProject from "@/components/dashboard/AssignedProject";

export default async function WorkerProject() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Access Denied</div>;
  }

  const workerWithProject = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      project: {
        include: {
          users: {
            select: { userID: true, username: true, fullName: true, role: true }
          }
        }
      }
    }
  });

  const myProject = workerWithProject?.project;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-black">My Projects</h1>
        </div>
        <AssignedProject project={myProject} />
      </div>
    </div>
  );
}
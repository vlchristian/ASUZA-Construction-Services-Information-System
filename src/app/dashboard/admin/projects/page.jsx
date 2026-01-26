import prisma from "@/lib/prisma";
import ProjectManager from "@/components/dashboard/ProjectManager";
import { Role } from "@/generated/prisma/enums";
import { checkRole } from "@/lib/auth/checkRole";

export default async function AdminProjectsPage() {
    await checkRole(Role.ADMIN);
  

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { users: true }
  });
  const staff = await prisma.user.findMany({
    where: {
      role: { in: ["TEAM_LEADER", "WORKER"] },
      status: "ACTIVE"
    },
    select: {
      userID: true,
      username: true,
      role: true,
      project: {
        select: { projectID: true, projectName: true }
      }
    }
  });
  return (
    <div className="p-8 min-h-screen ml-10 mr-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black tracking-tight">Project Management</h1>
      </div>
      
      <ProjectManager initialProjects={projects} availableStaff={staff} />
    </div>
  );  
}
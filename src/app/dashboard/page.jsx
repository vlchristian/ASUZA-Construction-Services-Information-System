import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import prisma from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Role } from "@/generated/prisma/enums";

export default async function DashboardRedirect(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/auth/login");
    }
    switch(session.user.role){
        case Role.ADMIN:
            return redirect("/dashboard/admin");
        case Role.OFFICE_STAFF:
            return redirect("/dashboard/office-staff");
        case Role.TEAM_LEADER:
            return redirect("/dashboard/team-leader");
        case Role.WORKER:
            return redirect("/dashboard/worker");
        default:
            return redirect("/auth/login");
    }
}
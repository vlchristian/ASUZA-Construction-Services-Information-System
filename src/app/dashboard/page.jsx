import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import prisma from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardRedirect(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/login");
    }
    switch(session.user.role){
        case "ADMIN":
            redirect("/dashboard/admin");
        case "OFFICE_STAFF":
            redirect("/dashboard/office-staff");
        case "TEAM_LEADER":
            redirect("/dashboard/team-leader");
        case "WORKER":
            redirect("/dashboard/worker");
        default:
            redirect("/login");
    }
}
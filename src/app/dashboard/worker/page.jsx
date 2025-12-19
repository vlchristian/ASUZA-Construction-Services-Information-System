import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export default async function WorkerDashboardPage(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/login");
    }
    if(session.user.role !== "WORKER"){
        redirect("/dashboard");
    }
    return(
        <div className="flex items-center justify-center bg-gray-300">
            <h1 className="text-3xl text-black font-bold">Welcome To Worker Dashboard</h1>
        </div>
    )
}
import { Role } from "@/generated/prisma/enums";
import { checkRole } from "@/lib/auth/checkRole"

export default async function OfficeStaffDashboardPage(){
    const session = await checkRole(Role.OFFICE_STAFF);

    return(
        <div className="flex items-center justify-center bg-gray-300">
            <h1 className="text-3xl text-black font-bold">Welcome, {session.user.username}</h1>
        </div>
    )
}
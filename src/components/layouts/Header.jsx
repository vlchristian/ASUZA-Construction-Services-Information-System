import Image from "next/image";
export default function Header(){
    return(
        <div className="flex items-center gap-6 bg-white justify-center">
            <Image
            src={"/logo.png"}
            width={60}
            height={60}
            alt="company logo"
            className="ml-8"
            />
            <h1 className="text-black font-bold text-lg">Asuza Construction Services Information System</h1>
        </div>
    )
}
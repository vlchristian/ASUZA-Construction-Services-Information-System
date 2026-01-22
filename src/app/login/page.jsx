import LoginForm from "@/components/forms/LoginForm";
import Header from "@/components/layouts/Header";
import Image from "next/image";


export default function LoginPage() {

    return (

        <div className="flex flex-col h-screen">
            <Header />
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
            </div>
        <LoginForm/>
        </div>
    );
}
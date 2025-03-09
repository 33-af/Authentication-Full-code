import ForgotPassword from "@/components/ForgotPassword/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password | Next App",
    description: "Reset your password easily with Next App.",
};

export default function ForgotPasswordPage() {

    return (
        <section className="loginBg h-[100vh] pt-48 pb-48">
            <div className="container">
                <div className="flex justify-center items-center bg-white/30 rounded-3xl px-[92px] py-[86px]">
                <ForgotPassword/>
                </div>
            </div>
        </section >
    );
}


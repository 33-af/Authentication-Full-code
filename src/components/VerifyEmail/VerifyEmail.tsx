"use client"
import React, { useRef, useState } from 'react'
import Input from '../Input'
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/AuthStore';
import { toast } from 'react-toastify';


const VerifyEmail = () => {
    const [verifyNumber, setVerifyNumber] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { isLoading, emailVerification } = useAuthStore();
    const router = useRouter();

    const handleChange = (index: number, value: string) => {
        const newVerifyNumber = [...verifyNumber];

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newVerifyNumber[i] = pastedCode[i] || "";
            }
            setVerifyNumber(newVerifyNumber);
            const lastFilledIndex = newVerifyNumber.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex]?.focus();
        } else {
            newVerifyNumber[index] = value;
            setVerifyNumber(newVerifyNumber);

            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !verifyNumber[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const verificationNumber = verifyNumber.join("");
        try {
            await emailVerification(verificationNumber);
            toast.success("You successfully verify your email");
            router.push("/")
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className="flex items-center flex-col">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-9 mb-10">
                    {verifyNumber.map((field, index) => (
                        <Input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={field}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            inputMode="numeric"
                            className={`custom-checkbox text-center font-bold text-xl ${field ? 'bg-gradient-to-t from-[#F25019] to-[#F87C47]' : ''}`}
                            ref={(el: HTMLInputElement | null) => inputRefs.current[index] = el}
                        />
                    ))}
                </div>
                <Button
                    title="Verify your Email"
                    className="button w-full py-5 font-bold text-xl"
                    disabled={isLoading || verifyNumber.some((digit) => !digit)}
                    type="submit"
                >
                    {isLoading ? "Verifying..." : "Verify Email"}
                </Button>
            </form>
        </div>
    );
}

export default VerifyEmail

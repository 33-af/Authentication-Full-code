"use client"
import React, { useRef, useState } from 'react'
import Input from '../Input'
import Button from '../Button';

const VerifyEmail = () => {
    const [verifyNumber, setVerifyNumber] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // This is correct now
    
    const handleChange = (index: number, value: string) => {
        const newCode = [...verifyNumber];

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setVerifyNumber(newCode);
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex]?.focus();
        } else {
            newCode[index] = value;
            setVerifyNumber(newCode);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const verificationCode = verifyNumber.join("");
        try {
            // Await the API call or verification logic here
            // await verifyEmail(verificationCode);
            alert("You successfully logged in with code: " + verificationCode);
        } catch (e) {
            console.log(e);
        }
    };

    const isFormComplete = verifyNumber.every((digit) => digit !== "");

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
                    title="Verify Email"
                    className="button w-full py-5 font-bold text-xl"
                    onClick={handleSubmit}
                    disabled={!isFormComplete} 
                />
            </form>
        </div>
    );
}

export default VerifyEmail

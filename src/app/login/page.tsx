'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // State to store error message

    const onLogin = async () => {
        try {
            setLoading(true);
            setErrorMessage(""); // Clear previous errors
            const response = await axios.post("api/users/login", user);
            console.log("Login Success", response.data);
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed!", error.response?.data?.error || error.message);
            setErrorMessage(error.response?.data?.error || "Login failed!"); // Set error message
        } finally {
            setLoading(false);
            setButtonDisabled(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-400">
            <div className="bg-gray-500 shadow-lg rounded-lg w-full max-w-md p-8">
                <h1 className="text-center text-2xl mb-6 text-white">
                    {loading ? "Processing..." : 'Login'}
                </h1>

                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p> // Display error message
                )}

                <label className="text-sm font-medium block text-gray-200" htmlFor="email">Email</label>
                <input className="text-black mt-1 px-4 py-1 mb-4 rounded-md w-[65%] focus:w-[85%] transition-all duration-[400ms] focus:ring-4 focus:outline-none focus:ring-[#4682b4]" type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Enter your email"
                />

                <label className="text-sm font-medium block text-gray-200" htmlFor="password">Password</label>
                <input
                    className="text-black mt-1 px-4 py-1 mb-4 rounded-md w-[65%] focus:w-[85%] transition-all duration-[400ms] focus:ring-4 focus:outline-none focus:ring-[#4682b4]"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                />

                <button
                    className={`w-full py-2 transition-colors text-white rounded-lg ${buttonDisabled ? "bg-gray-400" : "bg-[#4682b4]"}`}
                    disabled={buttonDisabled}
                    onClick={onLogin}
                >
                    {loading ? "Logging in..." : buttonDisabled ? "Enter your details" : "Login"}
                </button>

                <div className="mt-4 text-center">
                    <Link href="/signup">Don't have an account? Signup</Link>
                </div>
            </div>
        </div>
    );
}

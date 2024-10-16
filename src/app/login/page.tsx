"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false)
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user)
            console.log("Login Success", response.data)
            toast.success("Login Success")
            router.push("/profile")
        } catch (error: any) {
            console.log("Login Failed", error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-black">
                <h1 className="text-2xl font-bold text-center mb-6">{loading ? "Processing..." : "Login"}</h1>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                    className="w-full px-4 py-2 mt-1 mb-4 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    type="email" 
                    id="email" 
                    value={user.email} 
                    onChange={(e) => setUser({ ...user, email: e.target.value })} 
                    placeholder="Enter your email"
                />
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                    className="w-full px-4 py-2 mt-1 mb-6 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    type="password" 
                    id="password" 
                    value={user.password} 
                    onChange={(e) => setUser({ ...user, password: e.target.value })} 
                    placeholder="Enter your password"
                />
                <button 
                    onClick={onLogin} 
                    className={`w-full py-2 font-semibold text-white rounded-md transition-colors ${buttonDisabled ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"} focus:outline-none`}
                    disabled={buttonDisabled}
                >
                    {loading ? "Logging in..." : buttonDisabled ? "Enter your details" : "Login"}
                </button>
                <div className="mt-4 text-center">
                    <Link href="/signup" className="text-orange-500 hover:text-orange-600 text-sm">Don't have an account? Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

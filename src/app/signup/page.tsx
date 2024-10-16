"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("SignUp Success", response.data)
            router.push("/login")
        } catch (error: any) {
            console.log("Signup failed", error.message)
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-black">{loading ? "Processing..." : "Sign Up"}</h1>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input 
                    className="w-full px-4 py-2 mt-1 mb-4 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    type="text" 
                    id="username" 
                    value={user.username} 
                    onChange={(e) => setUser({ ...user, username: e.target.value })} 
                    placeholder="Enter your username"
                />
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
                    onClick={onSignUp} 
                    className={`w-full py-2 font-semibold text-white rounded-md transition-colors ${buttonDisabled ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"} focus:outline-none`}
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? "Fill all fields" : "Sign Up"}
                </button>
                <div className="mt-4 text-center">
                    <Link href="/login" className="text-orange-500 hover:text-orange-600 text-sm">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
}

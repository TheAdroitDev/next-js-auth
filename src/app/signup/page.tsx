'use client'
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
        <div className="flex flex-col justify-center min-h-screen py-2 items-center font-sans">
            <h1>{loading ? "Processing" : "SignUp"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className="text-black" type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="Username" />
            <label htmlFor="email">email</label>
            <input className="text-black" type="text" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email" />
            <label htmlFor="password">password</label>
            <input className="text-black" type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password" />
            <button onClick={onSignUp} className="bg-orange-500 font-semibold text-black p-1 m-2">{buttonDisabled ? "No Signup" : "Signup"}</button>
            <Link href="/login">Vist Login Page</Link>
        </div>
    );
}
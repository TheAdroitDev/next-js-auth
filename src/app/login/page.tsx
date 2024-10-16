'use client'
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
            toast.success("Login Success ")
            router.push("/profile")
        } catch (error: any) {
            console.log("Login Failded", error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <div className="flex flex-col justify-center min-h-screen py-2 items-center font-sans">
            <h1>{loading ?"Processing":"Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input className="text-black" type="text" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email" />
            <label htmlFor="password">password</label>
            <input className="text-black" type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password" />
            <button onClick={onLogin} className="bg-orange-500 font-semibold p-1 m-2 text-black">Login</button>
            <Link href="/signup">Vist SignUp Page Here</Link>
        </div>
    );
}
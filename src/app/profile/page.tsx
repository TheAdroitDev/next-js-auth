"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing")
  const handleLogout = async () => {
    try {
      await axios.get("api/users/logout");
      router.push("/login")
    } catch (error: any) {
      console.log(error.message)
    }
  }
  const getUserDetails = async () => {  
    const res = await axios.get("/api/users/me")
    console.log(res.data);
    setData(res.data.data._id )
  }


  const handleClick = () => {
    alert("Will available soon!")
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-md bg-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6">Profile Page</h1>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full mb-4"> <h2>{data==='nothing'?"Nothing": <Link href={`/profile/${data}`}>{data}</Link> }</h2></div>
          <button onClick={handleClick} className="w-full py-2 font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-md focus:outline-none">
            Edit Profile
          </button>
          <button onClick={handleLogout} className="w-full py-2 mt-5 font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-md focus:outline-none">
            Logout
          </button>
          <button onClick={getUserDetails} className="w-full py-2 mt-5 font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-md focus:outline-none">
            Go to Your Details
          </button>
        </div>
      </div>
    </div>
  );
}

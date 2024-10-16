import { connect } from "@/dbconfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        console.log(reqBody);

        //check If the user already exists 
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does'nt exists" }, { status: 400 })
        }

        //If The passoword is correct 
        const validPassword = await bcryptjs.compare(password, user.password); // Fix typo here
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 })
        }
        
        //Create Token Data 
        const tokenData = {
           id:user._id,
           username:user.username,
           email:user.email,
        }

        //Create Token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1h"});
        const response = NextResponse.json({
            message:"Login Successfull!",
            success:true,
        })
        response.cookies.set("token",token,{httpOnly:true})
        return response;
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
import { connect } from "@/dbconfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody)

        //Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already Exists" }, { status: 400 })
        }

        //hash Password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
        })
        const savedUser = await newUser.save();
        console.log(savedUser)

        return NextResponse.json({ 
            message:"User Created Successfully",
            success:true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
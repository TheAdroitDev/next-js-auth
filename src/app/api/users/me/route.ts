import { connect } from "@/dbconfig/dbConfig";
import { getDataFromTokens } from "@/helpers/getDataFromTokens";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request:NextResponse) {
    try {
        const userId = await getDataFromTokens(request);
        const user = await User.findOne({_id:userId}).select("-password");
        return NextResponse.json({
            message:"User Found",
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}

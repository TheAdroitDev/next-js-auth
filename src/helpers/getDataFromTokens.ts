import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromTokens = (request:NextResponse) => {
    try {
        const token = request.cookies.get("token")?.value ||  "";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error:any) {
        throw new Error(error.message);
    }


}

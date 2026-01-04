import { NextResponse } from "next/server";
import { login } from "../../../../controller/authController";
import {generateToken} from "../../../../lib/genratetoken";
import connectDB from "../../../../lib/db";

export async function POST(req,res) {
    console.log("login route hit");
    try {
        await connectDB();
        const data = await req.json();
        const user = await login(data);
        const token = generateToken(user);
        const response = NextResponse.json({
            message : "User Loggedin successfully",
            user : user
        },{status : 200});

        response.cookies.set("token", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            path : "/",
            maxAge : 7 * 24 * 60 * 60 // 7 days in seconds
        });
        return response;
    } catch (error) {
        return NextResponse.json({
            message : error.meesage,
            error : error
        },{ status : 500})
    }
}
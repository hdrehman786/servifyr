import { NextResponse } from "next/server";
import { register } from "../../../../controller/authController";
import connectDB from "../../../../lib/db";

export async function POST(req, res) {
    console.log("Register route hit");
    try {
        await connectDB();
        const data = await req.json();
        const user = await register(data);
        return NextResponse.json({
            message: "User registered successfully",
            user: user
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            error: error
        }, { status: 500
        })
    }
}
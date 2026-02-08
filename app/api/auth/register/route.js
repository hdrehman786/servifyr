import { NextResponse } from "next/server";
import { register } from "../../../../controller/authController";
import connectDB from "../../../../lib/db";

export async function POST(req, res) {
    try {
        await connectDB();
        const data = await req.json();
        const user = await register(data);
        if (!user.success) {
            return NextResponse.json(
                { message: user.message },
                { status: user.status }
            );
        }
        return NextResponse.json({
            message: user.message,
            user: user.user,
            success : user.success
        }, { status: user.status, })
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            error: error
        }, {
            status: 500
        })
    }
}
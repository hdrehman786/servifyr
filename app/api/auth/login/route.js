import { NextResponse } from "next/server";
import { login } from "../../../../controller/authController";
import { generateToken } from "../../../../lib/genratetoken";
import connectDB from "../../../../lib/db";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        const result = await login(data);

        if (!result.success) {
            return NextResponse.json(
                { message: result.message },
                { status: result.status }
            );
        }

        const token = await generateToken(result.user);

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 7 * 24 * 60 * 60
        });

        return NextResponse.json(
            {
                message: "Logged in successfully",
                user: result.user,
                success: true
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

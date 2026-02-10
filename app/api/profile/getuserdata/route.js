import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { getUserData } from "../../../../lib/genratetoken";
import User from "../../../../models/User";
import connectDB from "../../../../lib/db";
export async function GET(req) {
    try {
        await connectDB();
        const res = await getUserData(req);
        if (!res) {
            return NextResponse.json({
                message: "Please login for access",
                status: 401,
                success: false,
            })
        };
        const user = await User.findById(res).populate("favorites enrolledPrograms");
        if (!user) {
            return NextResponse.json({
                message: "User not found againts this id"
            })
        }
        return NextResponse.json({
            data: user
        })
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            error: error
        })
    }
}
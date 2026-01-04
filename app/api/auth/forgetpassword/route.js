import { NextResponse } from "next/server";
import { forgetPassword } from "../../../../controller/authController";



export async function POST(req, res) {
    try {
        const data = await req.json();
        const res = await forgetPassword(data);
        console.log(res);
        return NextResponse.json({
            res
        })
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            error: error
        })
    }
}
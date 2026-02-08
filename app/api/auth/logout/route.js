import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST (req) {
    try {
        const brwoserCookies = await cookies();
        brwoserCookies.delete("token")
        return NextResponse.json({
            message : "User logout successfully"
        })
    } catch (error) {
        return NextResponse.json({
            message : error.message,
            error : error
        })
    }
}
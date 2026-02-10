import { NextResponse } from "next/server";
import { updateProfile } from "../../../../controller/authController";
import { getUserData } from "../../../../lib/genratetoken";


export async function PUT(req) {
    try {
        const data = await req.json();
        const id = await getUserData(req);
        if (!data) {
            return NextResponse.json({
                message: "No data provided",
                status: 400,
                success: false
            });
        };
        const res = await updateProfile(id, data);
        if(!res){
            return NextResponse.json({
                message: "Profile update failed",
                status: 500,
                success: false
            });
        };
        return NextResponse.json({
            message: res.message,
            success: res.success,
            status: res.status,
            user: res.user
        })
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            error: error
        })
    }
}
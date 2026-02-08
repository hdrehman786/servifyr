import { NextResponse } from "next/server";
import { updateProfile } from "../../../../controller/authController";


export async function PUT (req){
    try {
        const data = await req.json();
        const id =await req.id;
        const res = updateProfile(data,id);
        return NextResponse({
            message : "Profile has updated successfuly",
            user : res
        })
    } catch (error) {
        return NextResponse.json({
            message : error.message,
            error : error
        })
    }
}
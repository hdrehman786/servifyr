import { getUserData } from "../../../../lib/genratetoken";
import User from "../../../../models/User";
import { NextResponse } from "next/server";


export async function PUT(req) {
    try {
        const { id } = await req.json();
        const userid = await getUserData(req);
        if (!id || !userid) {
            return NextResponse.json({
                message: "The id,s are missing",
                success: false
            }, { status: 400 })
        };
        const user = await User.findByIdAndUpdate(userid,
            { $pull: { favorites: id } },
            { new: true }
        );
        
        if (user) {
            return NextResponse.json({
                message: "Product has been deleted from your cart",
                success: true,
                user : user
            }, { status: 200 })
        }

    } catch (error) {
        return NextResponse.json({
            message: "Remove from cart successfully",
            success: false
        })
    }
}
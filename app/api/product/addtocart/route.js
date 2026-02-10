import { NextResponse } from "next/server";
import { getUserData } from "../../../../lib/genratetoken";
import User from "../../../../models/User";
import connectDB from "../../../../lib/db";

export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { id } = body;
        const userData = await getUserData(req);

        if (!id || !userData) {
            return NextResponse.json({
                message: "Required IDs are missing",
                success: false
            }, { status: 400 });
        };
        console.log("datatat",userData);
        const currentUser = await User.findById(userData);

        if (currentUser.favorites.includes(id)) {
            return NextResponse.json({
                message: "This product is already in your favorites",
                success: false
            }, { status: 400 });
        }

        const user = await User.findByIdAndUpdate(
            userData,
            { $addToSet: { favorites: id } },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Product added to favorites successfully",
            success: true,
            user: user
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 });
    }
}
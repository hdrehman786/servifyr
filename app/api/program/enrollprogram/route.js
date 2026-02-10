import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import User from "../../../../models/User";
import { getUserData } from "../../../../lib/genratetoken";

export async function PUT(req) {
    try {

        await connectDB();

        const { programId } = await req.json();

        const  id  = await getUserData(req);
        const existingPrg = await User.findById(id);
        if (existingPrg.enrolledPrograms.length >= 2) {
            return NextResponse.json({
                message: "You have enrolled maximum programs",
                success: false,
                status: 400
            })
        }
        const user = await User.findByIdAndUpdate(
            id,
            { $addToSet: { enrolledPrograms: programId } },
            { new: true }
        );

        return NextResponse.json({
            message: "Successfully enrolled",
            user: user,
            success: true
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 });
    }
}
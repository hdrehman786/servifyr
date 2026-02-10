import { NextResponse } from "next/server";
import { getUserData } from "../../../lib/genratetoken";
import User from "../../../models/User";
export async function PUT(req) {
    try {
        const { name } = await req.json();
        const  id  = await getUserData(req);
        const existSubscription = await User.findById(id);
        if (existSubscription.subscription.isActive) {
            return NextResponse.json({
                message: 'You have already enrolled a plan',
                success: false,
                status: 400
            })
        }
        const daysToAdd = name === "Full-Month" ? 30 : 15;
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + daysToAdd);

        const user = await User.findByIdAndUpdate(id, {
            $set: {
                "subscription.plan": name,
                "subscription.startDate": startDate,
                "subscription.endDate": endDate,
                "subscription.isActive": true,
            },
        },
            { new: true }
        )
        return NextResponse.json({
            message: "Congratulations Subscription Got Successfully",
            success: true,
            user: user.subscription
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false,
        }, { status: 500 })
    }
}
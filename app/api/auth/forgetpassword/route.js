import { NextResponse } from "next/server";
import { sendEmail } from "../../../../lib/sendmails";

export async function POST(req) {
    try {
        await connectDB();

        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.resetPasswordToken = otp;
        user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

        await user.save();

        await sendEmail({
            email: user.email,
            subject: "Password Reset OTP",
            otp: otp,
        });

        return NextResponse.json({
            message: "OTP has been sent to your email successfully",
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

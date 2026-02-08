import bcrypt from 'bcryptjs';
import User from '../models/User';
import { sendEmail } from '../lib/sendmails';



export const register = async (data) => {
    const { name, email, password, phoneNumber } = data;

    if (!name || !email || !password || !phoneNumber) {
        return {
            success: false,
            status: 400,
            message: "All fields are required to fill"
        }
    };
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return {
            success: false,
            status: 400,
            message: "User already have an account."
        }
    };
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber
    });
    return {
        success: true,
        status: 201,
        user: user,
        message: "User created successully"
    }
};





export const login = async ({ email, password }) => {
    if (!email || !password) {
        return {
            success: false,
            status: 400,
            message: "Email and password are required"
        };
    }

    const user = await User.findOne({ email });
    if (!user) {
        return {
            success: false,
            status: 404,
            message: "User not found"
        };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return {
            success: false,
            status: 401,
            message: "Password is not correct for this email"
        };
    }

    return {
        success: true,
        status: 200,
        user
    };
};
;


export const forgetPassword = async (data) => {
    const { email } = data;

    if (!email) {
        throw new Error("Please provide the email");
    }


    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found with this email.");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = Date.now() + 5 * 60 * 1000;

    user.resetPasswordToken = otp;
    user.resetPasswordExpire = expiryTime;

    await user.save();

    try {
        await sendEmail({
            email: user.email,
            otp: otp,
            subject: "Forget Password OTP"
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        throw new Error("Email sending failed. Please try again later.");

    }

    return { message: "OTP sent successfully to your email." };
};



export const updateProfile = async (id,data) => {
    const user = await User.findByIdAndUpdate(id, data);
    if (!user) {
        return {
            success: false,
            status: 404,
            message: "User not found"
        }
    };
    return {
        success: true,
        status: 200,
        message: "Profile updated successfully",
        user: user
    };
}
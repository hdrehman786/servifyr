import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";


export const generateToken = async (user) => {
    if (!user) return;
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};


export async function getUserData(req) {
    try {
        const nextAuthToken = await getToken({
            req,
            secret: process.env.JWT_SECRET,
            cookieName: "token",
        });

        if (nextAuthToken && nextAuthToken.id) {
            return nextAuthToken.id;
        }
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log("Success: Found Manual ID:", decoded.id);
                return decoded.id;
            } catch (err) {
                console.error("Manual Token Verification Failed:", err.message);
                return null;
            }
        }

        return null;
    } catch (error) {
        console.error("Global Auth Utility Error:", error);
        return null;
    }
}
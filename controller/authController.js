import bcrypt from 'bcryptjs';
import User from '../models/User';



export const register = async (data) => {
    const { name, email, password, number } = data;

    if (!name || !email || !password || !number) {
        throw new Error("Please provide all required fields.");
    };
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists with this email.");
    };
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        number
    });
    return user;
};



export const login = async (data) => {
    const { email, password } = data;
    if (!email || !password) {
        throw new Error("Please provide all fields.");
    };
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("user not found against this email.");
    };
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Password is incorrect.")
    };
    return user;
};


export const forgetPassword = async (data) => {
    const { email } = data;
    if (!email) {
        throw new Error("Please provide the email")
    };
    const user = await User.findOne(({ email }));
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = Date.now() + 5 * 60 * 1000
    user.resetPasswordToken = otp;
    user.resetPasswordExpire= expiryTime;
    await user.save();
    return user
}
import mongoose from 'mongoose';
import Program from './Program';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "" },
    role: {
        type: String,
        enum: ["user", "trainer", "admin"],
        default: "user"
    },
    subscription: {
        plan: { type: String, enum: ["None", "Half-Month", "Full-Month"], default: "None" },
        startDate: { type: Date },
        endDate: { type: Date },
        isActive: { type: Boolean, default: false }
    },
    category: { type: String, default: "Beginner" },
    phoneNumber: { type: String },
    description: { type: String },
    isApproved: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },


    enrolledPrograms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;

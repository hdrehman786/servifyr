import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "worker"],
        default: 'user'
    },
    category: {
        type: String,
        enum: ["plumber", "electrician", "carpenter", "painter", "cleaner"],
        default: null
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0
    },
    number: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
        default : 0
    },
    resetPasswordExpire: {
        type: Date,
        default : 0
    },
    isApproved: {
        type: Boolean,
        default: false
    },

},{ timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
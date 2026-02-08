import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    image: { type: String, required: true },
    duration: { type: String },
    difficulty: {
        type: String,
        enum: ["Beginner", "Moderate", "Advanced", "Weight Loss"]
    },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    workouts: [{
        day: Number,
        exercises: [{
            name: String,
            sets: Number,
            reps: String,
            videoUrl: String
        }]
    }]
});

const Program = mongoose.models.Program || mongoose.model("Program", ProgramSchema);
export default Program;
import mongoose, { connection } from "mongoose";


const connections = {};

export default async function connectDB() {
    try {
        if(connection.isConnected) return;
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        connections.isConnected = conn.connections[0].readyState;
        console.log("MongoDB connected");
    }catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

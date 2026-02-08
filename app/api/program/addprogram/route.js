import { NextResponse } from "next/server";
import { AddPrograms } from "../../../../controller/programsController";
import connectDB from "../../../../lib/db";

export async function POST(request) {
    try {
        const data = await request.json();
        await connectDB();
        const response = await AddPrograms(data);
        return NextResponse.json({
            success: response.success,
            status: response.status,
            message: response.message,
            program: response.program
        }, { status: response.status });
    }catch (error) {
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}
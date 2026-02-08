import { NextResponse } from "next/server"
import connectDB from "../../../../lib/db";
import Program from "../../../../models/Program";


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit')) || 5;
        const programs = await Program.find().limit(limit);
        if (!programs) {
            return NextResponse.json({
                success: false,
                status: 404,
                message: "Programs nt found due some techinal issue"
            });
        };
        return NextResponse.json({
            message :"Programs fetched successfully",
            success: true,
            programsLength : programs.length,
            programs: programs
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 500 })
    }
}
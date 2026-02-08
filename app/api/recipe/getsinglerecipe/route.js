import { NextResponse } from "next/server";
import Recipe from "../../../../models/Recipe";



export async function GET(req) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({
                message: "The has not find",
                success: false
            }, { status: 400 })
        }
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return NextResponse.json({
                message: "The recipe not found againts this id",
                success: false
            }, { status: 404 })
        };
        return NextResponse.json({
            message: "Recipe has found successfully",
            success: true
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 })
    }
}
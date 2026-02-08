import { NextResponse } from "next/server";
import Recipe from "../../../../models/Recipe";



export async function GET() {
    try {
        const recipes = await Recipe.find();
        if (!recipes) {
            return NextResponse.json({
                message: "Recipes dont get properly",
                success : false
            },{ status : 400})
        };
        return NextResponse.json({
            message : "Recipes get successfully",
            success : true,
            recipes : recipes
        },{ status : 200})
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        },{status : 500})
    }
};
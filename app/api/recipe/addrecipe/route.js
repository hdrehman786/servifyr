import { NextResponse } from "next/server";
import Recipe from "../../../../models/Recipe";


export async function POST(req) {
    try {
        const  data  = await req.json();
        const recipe = await Recipe.insertMany(data);
        if (!recipe) {
            return NextResponse.json({
                message: "data is not working properly",
                success: false
            })
        };
        return NextResponse.json({
            message: "Recipes has been uploaded successfully",
            success: true,
            data : recipe
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        })
    }
}
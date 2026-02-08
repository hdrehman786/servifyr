import { NextResponse } from "next/server";
import Product from "../../../../models/Products";
import connectDB from "../../../../lib/db";


export  async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        if (data.lenght < 1) {
            return NextResponse.json({
                message: "data is not available for upload",
                success: false
            }, { status: 400 })
        }
        const products = await Product.insertMany(data);

        return NextResponse.json({
            message: "Produts has uploaded successfully",
            success: false,
            products: products
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false,
        }, { status: true })
    }
}
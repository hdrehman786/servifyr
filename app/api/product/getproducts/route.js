import { NextRequest, NextResponse } from "next/server";
import Product from "../../../../models/Products";


export async function GET(req) {
    try {
        const products = await Product.find();

        if (products.length < 1) {
            return NextResponse.json({
                message: "Products are not avaialable",
                success: false
            }, { status: 400 })
        };

        return NextResponse.json({
            message: "get products successfully",
            success: true,
            products: products
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 })
    }
}
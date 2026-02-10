import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";



export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { message: "No file provided" },
                { status: 400 }
            );
        };

        const buffer = Buffer.from(await file.arrayBuffer());
        const uploaderResult = await new Promise((resolve,reject)=>{
            cloudinary.uploader.upload_stream(
                { folder : "Goldgym" },
                (error,result)=>{
                    if(error) reject(error);
                    resolve(result);
                }
            ).end(buffer);
        });
        return NextResponse.json({
            file: uploaderResult
        })
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({
            error: error.message
        })
    }
}

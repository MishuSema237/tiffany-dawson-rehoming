import dbConnect from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    try {
        const testimonials = await Testimonial.find({}).sort({ date: -1 });
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const testimonial = await Testimonial.create(body);
        return NextResponse.json(testimonial, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to create testimonial" }, { status: 400 });
    }
}

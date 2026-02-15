import dbConnect from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
    await dbConnect();
    const { id } = await params;
    try {
        const body = await request.json();
        const testimonial = await Testimonial.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!testimonial) {
            return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
        }
        return NextResponse.json(testimonial);
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ success: false, error: "Failed to update testimonial" }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    await dbConnect();
    const { id } = await params;
    try {
        const deleted = await Testimonial.deleteOne({ _id: id });
        if (!deleted) {
            return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete testimonial" }, { status: 400 });
    }
}

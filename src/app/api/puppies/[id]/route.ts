import dbConnect from "@/lib/db";
import Puppy from "@/models/Puppy";
import { NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
    await dbConnect();
    const { id } = await params;
    try {
        const puppy = await Puppy.findById(id);
        if (!puppy) {
            return NextResponse.json({ success: false, error: "Puppy not found" }, { status: 404 });
        }
        return NextResponse.json(puppy);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch puppy" }, { status: 400 });
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    await dbConnect();
    const { id } = await params;
    try {
        const body = await request.json();
        const puppy = await Puppy.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!puppy) {
            return NextResponse.json({ success: false, error: "Puppy not found" }, { status: 404 });
        }
        return NextResponse.json(puppy);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update puppy" }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    await dbConnect();
    const { id } = await params;
    try {
        const deletedPuppy = await Puppy.deleteOne({ _id: id });
        if (!deletedPuppy) {
            return NextResponse.json({ success: false, error: "Puppy not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete puppy" }, { status: 400 });
    }
}

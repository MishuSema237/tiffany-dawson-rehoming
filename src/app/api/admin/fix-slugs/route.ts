import dbConnect from "@/lib/db";
import Puppy from "@/models/Puppy";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    try {
        const puppies = await Puppy.find({ slug: { $exists: false } });
        let updatedCount = 0;

        for (const puppy of puppies) {
            puppy.slug = puppy.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Math.random().toString(36).substring(2, 7);
            await puppy.save();
            updatedCount++;
        }

        const nullPuppies = await Puppy.find({ slug: null });
        for (const puppy of nullPuppies) {
            puppy.slug = puppy.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Math.random().toString(36).substring(2, 7);
            await puppy.save();
            updatedCount++;
        }

        return NextResponse.json({ success: true, updatedCount });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

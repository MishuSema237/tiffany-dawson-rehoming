import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Puppy from "@/models/Puppy";

export async function GET() {
    await dbConnect();

    const initialPuppies = [
        {
            name: "Sienna",
            breed: "Cavalier King Charles Spaniel",
            age: "1 year 2 months",
            gender: "Female",
            image: "https://placehold.co/800x600/f8f9fa/333?text=Sienna",
            status: "available",
            fee: "$600",
            description: "Sienna is 1 year 2 months old and has a very wonderful temperament. She is very playful, kid friendly and also gets along with other pets quite easily. She is up to date with shots and vaccines and has no health issues. She will come with her vet records and paperwork. She has been potty trained as well crate trained too. To help Sienna adjust to her new home, she will come with her favorite toys. With her playful personality and affectionate nature, she’s sure to bring joy and companionship to any loving family. She is a full-blooded Cavalier King Charles Spaniel.",
            story: "These pups don’t come from breeders or rescue. I am an intermediary person and group owner helping families interested in adopting or rehoming. The reason why they are giving up this cutie for adoption is sadly because the owners have been battling with unexpected health conditions lately and their hospital bills are getting out of hand, so keeping up with some current expenditures won’t help so they will rather give up this cutie to a home where she can be shown the love they vowed to give her but later on couldn’t fulfill due to their present condition. 💔, so rather than to sending her to a rescue or shelter they will rather give her up for adoption."
        },
        {
            name: "Max",
            breed: "Cavapoo",
            age: "4 months",
            gender: "Male",
            image: "https://placehold.co/800x600/f8f9fa/333?text=Max",
            status: "available",
            fee: "$750",
            description: "Max is a bundle of joy, loves to cuddle and is very quick to learn new tricks.",
            story: "Rehoming due to owner relocation."
        },
        {
            name: "Luna",
            breed: "Maltipoo",
            age: "3 months",
            gender: "Female",
            image: "https://placehold.co/800x600/f8f9fa/333?text=Luna",
            status: "available",
            fee: "$800",
            description: "Luna is gentle and sweet, perfect for a family looking for a calm companion.",
            story: "Looking for a loving home."
        }
    ];

    try {
        await Puppy.deleteMany({}); // Clear existing
        await Puppy.insertMany(initialPuppies);
        return NextResponse.json({ success: true, message: "Database seeded successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}

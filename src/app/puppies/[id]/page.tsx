import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Puppy from "@/models/Puppy";
import { PuppyDetailsClient } from "@/components/PuppyDetailsClient";

type Props = {
    params: Promise<{ id: string }>
}

export default async function PuppyPage({ params }: Props) {
    const { id } = await params;
    await dbConnect();

    let puppy: any = null;
    let relatedPuppies: any[] = [];

    try {
        const doc = await Puppy.findById(id).lean();
        if (doc) {
            const p = JSON.parse(JSON.stringify(doc));
            puppy = {
                ...p,
                id: p._id,
                gender: p.gender || "Unknown",
                fee: p.fee || "Contact us",
                nannyFee: p.nannyFee || "Contact us",
            };

            // Fetch Related Puppies (Same breed, then others)
            // 1. Try to find same breed
            const relatedRaw = await Puppy.find({
                _id: { $ne: doc._id },
                breed: p.breed,
                status: "available"
            }).limit(3).lean();

            let relatedDocs = JSON.parse(JSON.stringify(relatedRaw));

            // 2. If not enough, fill with other available puppies
            if (relatedDocs.length < 3) {
                const moreRaw = await Puppy.find({
                    _id: { $ne: doc._id, $nin: relatedDocs.map((d: any) => d._id) },
                    status: "available"
                }).limit(3 - relatedDocs.length).lean();
                relatedDocs = [...relatedDocs, ...JSON.parse(JSON.stringify(moreRaw))];
            }

            relatedPuppies = relatedDocs.map((rp: any) => ({
                id: rp._id,
                name: rp.name,
                breed: rp.breed,
                age: rp.age,
                image: rp.image,
                status: rp.status,
                description: rp.description,
            }));
        }
    } catch (e) {
        return notFound();
    }

    if (!puppy) {
        notFound();
    }

    return <PuppyDetailsClient puppy={puppy} relatedPuppies={relatedPuppies} />;
}

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PuppyProps {
    id: string;
    name: string;
    breed: string;
    age: string;
    image: string;
    status: "available" | "adopted" | "pending";
    description: string;
}

export function PuppyCard({ puppy }: { puppy: PuppyProps }) {
    return (
        <Card className="overflow-hidden bg-brand-white-100 shadow-xl hover:shadow-2xl transition-all duration-700 border border-brand-white-400 rounded-[2.5rem] group hover:-translate-y-2 flex flex-col h-full">
            <div className="relative aspect-square w-full overflow-hidden">
                <Image
                    src={puppy.image}
                    alt={puppy.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                />
                {/* Breed Tag */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal-deep-700 shadow-xl border border-white/20">
                    {puppy.breed}
                </div>
                {/* Status Tag */}
                {puppy.status === "available" && (
                    <div className="absolute top-6 left-6 bg-brand-red-700 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 shadow-2xl border border-brand-red-600">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        Available
                    </div>
                )}
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-brand-teal-deep-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <CardContent className="p-4 sm:p-8 flex-grow">
                <div className="flex justify-between items-end mb-2 sm:mb-4">
                    <div>
                        <p className="text-[8px] sm:text-[10px] font-black text-brand-red-700 uppercase tracking-widest mb-0.5 sm:mb-1">Meet our</p>
                        <h3 className="text-xl sm:text-3xl font-black text-brand-teal-deep-800 tracking-tighter uppercase leading-none">{puppy.name}</h3>
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-black text-brand-teal-muted-700 bg-brand-teal-muted-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-brand-teal-muted-200 uppercase tracking-widest">{puppy.age}</span>
                </div>
                <p className="text-brand-white-900 text-xs sm:text-base font-medium leading-relaxed italic line-clamp-2">
                    "{puppy.description}"
                </p>
            </CardContent>

            <CardFooter className="p-4 sm:p-8 pt-0">
                <Link
                    href={`/puppies/${puppy.id}`}
                    className="w-full"
                >
                    <button className="w-full h-10 sm:h-14 bg-brand-teal-deep-700 text-white rounded-full text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-brand-teal-deep-800 transition-colors flex items-center justify-center group/btn shadow-lg">
                        Learn More
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </CardFooter>
        </Card>
    );
}

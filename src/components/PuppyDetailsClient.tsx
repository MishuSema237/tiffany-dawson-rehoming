"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ArrowLeft, ArrowRight, Heart, ChevronLeft, ChevronRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdoptionForm } from "@/components/AdoptionForm";
import { Modal } from "@/components/ui/Modal";
import { PuppyCard } from "@/components/PuppyCard";
import { motion, AnimatePresence } from "framer-motion";

interface PuppyDetailsClientProps {
    puppy: {
        id: string;
        name: string;
        breed: string;
        age: string;
        gender: string;
        image: string;
        images: string[];
        status: string;
        fee: string;
        nannyFee: string;
        description: string;
        story: string;
    };
    relatedPuppies: any[];
}

export function PuppyDetailsClient({ puppy, relatedPuppies }: PuppyDetailsClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const gallery = [puppy.image, ...(puppy.images || [])].filter(Boolean);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    };

    return (
        <div className="bg-brand-white-200 min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link href="/puppies" className="inline-flex items-center text-sm font-bold text-brand-teal-muted-700 hover:text-brand-teal-deep-700 mb-8 transition-all hover:gap-2 group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Available Puppies
                </Link>

                {/* Hero / Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10 sm:mb-16">
                    {/* Image Carousel Column */}
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-white-300 group ring-1 ring-brand-white-400">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImageIndex}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={gallery[currentImageIndex]}
                                        alt={`${puppy.name} - image ${currentImageIndex + 1}`}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {gallery.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm text-brand-teal-deep-700 shadow-lg hover:bg-brand-teal-deep-700 hover:text-white transition-all z-10"
                                    >
                                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm text-brand-teal-deep-700 shadow-lg hover:bg-brand-teal-deep-700 hover:text-white transition-all z-10"
                                    >
                                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                    {/* Pagination indicator */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-brand-teal-deep-900/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest z-10">
                                        {currentImageIndex + 1} / {gallery.length}
                                    </div>
                                </>
                            )}

                            {puppy.status === "available" && (
                                <div className="absolute top-6 left-6 bg-brand-white-100/95 backdrop-blur-md text-brand-teal-deep-700 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 shadow-xl ring-1 ring-brand-white-400 z-10 uppercase tracking-tight">
                                    <BadgeCheck className="w-4 h-4 text-brand-red-700" />
                                    Available
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {gallery.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto py-2 no-scrollbar px-1">
                                {gallery.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${currentImageIndex === index ? "border-brand-red-700 scale-105 shadow-md" : "border-brand-white-400 opacity-60"
                                            }`}
                                    >
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Column */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-2 text-brand-red-700 font-extrabold uppercase tracking-widest text-[10px] flex items-center gap-2">
                            <span className="w-6 h-px bg-brand-red-700/30" />
                            {puppy.breed}
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-brand-teal-deep-800 sm:text-6xl mb-4 sm:mb-6 uppercase leading-none">
                            {puppy.name}
                        </h1>
                        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
                            <span className="bg-brand-teal-deep-100 text-brand-teal-deep-700 px-4 py-1.5 rounded-full font-bold text-xs border border-brand-teal-deep-200">{puppy.age}</span>
                            <span className="bg-brand-teal-muted-100 text-brand-teal-muted-700 px-4 py-1.5 rounded-full font-bold text-xs border border-brand-teal-muted-200">{puppy.gender}</span>
                            {puppy.status === "available" && <span className="bg-brand-red-100 text-brand-red-700 px-4 py-1.5 rounded-full font-bold text-xs border border-brand-red-200">Fee: {puppy.fee}</span>}
                        </div>
                        {puppy.status === "available" && (
                            <div className="mb-8 text-[10px] font-black text-brand-white-900 uppercase tracking-widest flex items-center gap-2 bg-brand-white-300 p-3 rounded-2xl border border-brand-white-400">
                                <Truck className="w-4 h-4 text-brand-teal-deep-700" />
                                Note: Final delivery fee depends on your location.
                            </div>
                        )}

                        <div className="prose prose-brand mb-8 sm:mb-10">
                            <h3 className="text-xl sm:text-2xl font-bold text-brand-teal-deep-700 mb-3 sm:mb-4 flex items-center gap-3">
                                <span className="w-1.5 h-6 sm:w-2 sm:h-8 bg-brand-teal-deep-700 rounded-full" />
                                About {puppy.name}
                            </h3>
                            <p className="text-brand-teal-deep-900 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-medium italic break-words whitespace-pre-line">{puppy.description}</p>

                            <h3 className="text-xl sm:text-2xl font-bold text-brand-red-700 mb-3 sm:mb-4 flex items-center gap-3">
                                <span className="w-1.5 h-6 sm:w-2 sm:h-8 bg-brand-red-700 rounded-full" />
                                Why Rehoming?
                            </h3>
                            <div className="bg-brand-red-100/50 p-5 sm:p-8 rounded-[2rem] sm:rounded-3xl border border-brand-red-200 italic text-brand-teal-deep-900 leading-relaxed text-base sm:text-lg relative group shadow-sm break-words whitespace-pre-line">
                                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-brand-red-700 absolute -top-2.5 -left-2.5 bg-white rounded-full p-1 border border-brand-red-200 shadow-md" />
                                "{puppy.story}"
                            </div>
                        </div>

                        {/* CTA / Modal Trigger */}
                        {puppy.status === "available" ? (
                            <div className="bg-brand-white-100 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-brand-white-300 relative overflow-hidden">
                                <h4 className="text-xl sm:text-2xl font-black text-brand-teal-deep-700 mb-2 sm:mb-3 uppercase tracking-tight">Meet {puppy.name}</h4>
                                <p className="text-brand-teal-deep-900 text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed font-medium">Start the journey by filling out our premium adoption application.</p>
                                <Button onClick={() => setIsModalOpen(true)} className="w-full rounded-full h-14 sm:h-16 text-lg sm:text-xl font-black shadow-lg hover:-translate-y-1 transition-all uppercase tracking-widest" size="lg">
                                    Apply to Adopt
                                </Button>
                            </div>
                        ) : (
                            <div className="bg-brand-white-300 rounded-[2rem] p-6 sm:p-8 text-center border border-brand-white-400">
                                <p className="text-lg sm:text-xl font-bold text-brand-white-900">Found a forever home.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Puppies Section */}
                {relatedPuppies && relatedPuppies.length > 0 && (
                    <div className="mt-20 sm:mt-32 border-t border-brand-white-400 pt-16 sm:pt-20">
                        <div className="flex items-end justify-between mb-8 sm:mb-12 px-4 lg:px-0">
                            <div>
                                <h2 className="text-2xl sm:text-4xl font-black text-brand-teal-deep-700 tracking-tight uppercase">You Might Also Like</h2>
                                <p className="text-brand-white-900 mt-1 sm:mt-3 text-sm sm:text-lg italic font-medium">Wait for their forever homes</p>
                            </div>
                            <Link href="/puppies" className="text-[10px] sm:text-sm font-black text-brand-red-700 hover:text-brand-red-600 transition-all flex items-center gap-1.5 sm:gap-2 group mb-1 uppercase tracking-widest">
                                View all
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 px-4 lg:px-0 snap-x snap-mandatory no-scrollbar">
                            {relatedPuppies.map((relatedPuppy) => (
                                <div key={relatedPuppy.id} className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] snap-center">
                                    <PuppyCard puppy={relatedPuppy} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Modal for Adoption Form */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Adoption Application for ${puppy.name}`}>
                    <AdoptionForm puppyName={puppy.name} onSuccess={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </div>
    );
}

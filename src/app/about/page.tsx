import Link from "next/link";
import Image from "next/image";
import { Heart, Truck, ShieldCheck, PawPrint, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Static Image Imports
import tiffanyAlone from "../../../public/assets/tiffanyFamily/tiffanyalonecarryingdog.jpg";
import tiffanyAndHusband from "../../../public/assets/tiffanyFamily/tiffanyandhusbandcarryingdog.jpg";
import tiffanySelfie from "../../../public/assets/tiffanyFamily/tiffanyandhusbandselfiecarryingdog.jpg";
import tiffanyDaughter from "../../../public/assets/tiffanyFamily/tiffanydaughtercarryingdog.jpg";
import tiffanyFamily from "../../../public/assets/tiffanyFamily/tiffanyhusbandanddaugtherfamilypic.jpg";

// Breed Images
import cavapooBg from "../../../public/assets/poos/cavapoo.webp";
import maltipooBg from "../../../public/assets/poos/maltipoos.jpeg";
import poochonBg from "../../../public/assets/poos/poochon.jpg";

export default function AboutPage() {
    return (
        <div className="bg-brand-white-200 min-h-screen">
            {/* Hero */}
            <section className="relative py-32 bg-brand-teal-deep-800 text-brand-white-100 overflow-hidden">
                <div className="absolute inset-0 bg-brand-red-700/5 -z-10" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-3xl font-black tracking-tighter text-white sm:text-7xl mb-8 uppercase">
                        More Than Just <span className="text-brand-red-500">Rehoming</span>
                    </h1>
                    <p className="text-lg leading-relaxed text-brand-white-900 max-w-3xl mx-auto font-medium md:text-xl">
                        We are a bridge of love, connecting compassionate families with puppies who need a second chance at happiness. This isn't a business; it's a calling rooted in a lifetime of devotion to animals.
                    </p>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red-700/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-teal-deep-500/10 rounded-full -ml-48 -mb-48 blur-3xl" />
            </section>

            {/* Meet Tiffany - Expanded */}
            <section className="py-24 relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-brand-teal-deep-100/50 rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
                            <div className="relative h-[650px] rounded-[2.5rem] overflow-hidden bg-brand-white-300 shadow-2xl border border-brand-white-400">
                                <Image
                                    src={tiffanyAlone}
                                    alt="Tiffany Dawson with a puppy"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="w-16 h-1.5 bg-brand-red-700 rounded-full mb-8" />
                            <h2 className="text-2xl font-black tracking-tight text-brand-teal-deep-800 sm:text-5xl mb-8 uppercase">Hello, I'm Tiffany Dawson</h2>
                            <div className="space-y-8 text-brand-teal-deep-900 text-lg leading-relaxed font-medium">
                                <p>
                                    I am a mother, a wife, and a lifelong dog lover. But most importantly, I am an <strong className="text-brand-red-700 font-black px-1">intermediary</strong>, not a breeder or a large shelter.
                                </p>
                                <p>
                                    Years ago, I realized that many families face heartbreaking situations—job relocations, sudden allergies, or financial hardships—that force them to give up their beloved pets. These aren't "unwanted" dogs; they are cherished family members who suddenly need a new home.
                                </p>
                                <p className="p-8 bg-brand-teal-deep-50 rounded-[2rem] border-l-8 border-brand-teal-deep-700 italic font-serif text-2xl">
                                    "I founded this service to provide a dignified, safe, and loving alternative to shelters. My priority is the puppy's peace of mind."
                                </p>
                                <p>
                                    Every puppy I list comes from a home where they were loved. My job is to ensure their next home loves them just as much. I personally vet every applicant, coordinate health checks, and even handle the travel arrangements myself.
                                </p>
                            </div>
                            <div className="mt-12 flex gap-6">
                                <div className="flex-1 bg-brand-white-100 p-8 rounded-[2rem] text-center border border-brand-white-400 shadow-xl group hover:-translate-y-1 transition-all">
                                    <h3 className="text-4xl font-black text-brand-teal-deep-700 group-hover:text-brand-red-700">10+</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-white-900 mt-2">Years Experience</p>
                                </div>
                                <div className="flex-1 bg-brand-white-100 p-8 rounded-[2rem] text-center border border-brand-white-400 shadow-xl group hover:-translate-y-1 transition-all">
                                    <h3 className="text-4xl font-black text-brand-teal-deep-700 group-hover:text-brand-red-700">500+</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-white-900 mt-2">Puppies Rehomed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Family Photos - Life with the Pack */}
            <section className="py-24 bg-brand-white-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-2xl font-black tracking-tight text-brand-teal-deep-800 uppercase sm:text-4xl">Life with Our Pack</h2>
                        <div className="w-24 h-1 bg-brand-red-700 mx-auto mt-4 rounded-full" />
                        <p className="mt-6 text-brand-white-900 text-lg font-medium italic">The joy, the chaos, and the love that fuels our mission every single day.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                src: tiffanyAndHusband,
                                alt: "Tiffany and her husband with a puppy"
                            },
                            {
                                src: tiffanySelfie,
                                alt: "Tiffany and husband selfie"
                            },
                            {
                                src: tiffanyDaughter,
                                alt: "Tiffany's daughter with a puppy"
                            },
                            {
                                src: tiffanyFamily,
                                alt: "Tiffany's family picture"
                            }
                        ].map((photo, i) => (
                            <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-brand-white-300 shadow-xl group border-2 border-brand-white-400">
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-teal-deep-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values / Process */}
            <section className="py-32 bg-brand-teal-deep-900 text-brand-white-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-red-700 to-transparent" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <div className="mx-auto max-w-3xl text-center mb-20">
                        <h2 className="text-2xl font-black tracking-tight sm:text-6xl uppercase">The Tiffany Standard</h2>
                        <p className="mt-6 text-xl text-brand-white-900 font-medium">
                            We take rehoming seriously. Our process is designed to protect the puppy above all else, ensuring their physical and emotional well-being.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "Rigorous Vetting",
                                content: "We don't just sell puppies. We interview families. We check vet references. We ensure that you have the time, space, and heart to care for a new family member.",
                                color: "text-brand-teal-deep-400"
                            },
                            {
                                icon: Heart,
                                title: "Health & Wellness",
                                content: "Every puppy undergoes a full health check before rehoming. We ensure they are up-to-date on vaccinations and free from any major health concerns.",
                                color: "text-brand-red-500"
                            },
                            {
                                icon: Truck,
                                title: "Safe Travels",
                                content: "We utilize a trusted Pet Nanny service. Whether by car or plane, your puppy is escorted by a professional who ensures they are fed, walked, and loved every mile.",
                                color: "text-brand-teal-deep-400"
                            }
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="bg-white/5 backdrop-blur-sm p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all group shadow-2xl">
                                    <Icon className={cn("h-14 w-14 mb-8 transition-transform group-hover:scale-110", item.color)} />
                                    <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">{item.title}</h3>
                                    <p className="text-brand-white-900 leading-relaxed font-medium">
                                        {item.content}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Meet the Breeds Section - NEW */}
            <section className="py-24 bg-brand-teal-deep-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-red-700/5 -z-10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-4 sm:mb-6">The Breeds We Love</h2>
                        <p className="text-base sm:text-lg text-brand-white-100/80 font-medium italic">
                            We specialize in smaller, family-friendly doodles that are known for their health, temperament, and hypoallergenic qualities.
                        </p>
                    </div>

                    <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto sm:overflow-x-visible pb-12 sm:pb-0 snap-x snap-mandatory no-scrollbar px-4 sm:px-0">
                        {/* Cavapoos */}
                        <div className="min-w-[85%] sm:min-w-0 snap-center group relative h-[450px] sm:h-[550px] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src={cavapooBg}
                                alt="Cavapoos"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[2s] brightness-[0.7] group-hover:brightness-[0.4]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-teal-deep-900/90 via-brand-teal-deep-900/20 to-transparent" />
                            <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-red-500 mb-2">Gentle & Affectionate</span>
                                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter mb-4">Cavapoos</h3>
                                <p className="text-sm sm:text-base text-white/90 font-medium italic leading-relaxed">
                                    A mix of Cavalier King Charles Spaniel and Poodle. Known for their gentle, affectionate nature and teddy-bear looks.
                                </p>
                            </div>
                        </div>

                        {/* Maltipoos */}
                        <div className="min-w-[85%] sm:min-w-0 snap-center group relative h-[450px] sm:h-[550px] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src={maltipooBg}
                                alt="Maltipoos"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[2s] brightness-[0.7] group-hover:brightness-[0.4]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-teal-deep-900/90 via-brand-teal-deep-900/20 to-transparent" />
                            <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-red-500 mb-2">Smart & Fun-Loving</span>
                                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter mb-4">Maltipoos</h3>
                                <p className="text-sm sm:text-base text-white/90 font-medium italic leading-relaxed">
                                    A cross between a Maltese and a Poodle. These smart, fun-loving dogs are great for apartment living and allergy sufferers.
                                </p>
                            </div>
                        </div>

                        {/* Poochons */}
                        <div className="min-w-[85%] sm:min-w-0 snap-center group relative h-[450px] sm:h-[550px] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src={poochonBg}
                                alt="Poochons"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[2s] brightness-[0.7] group-hover:brightness-[0.4]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-teal-deep-900/90 via-brand-teal-deep-900/20 to-transparent" />
                            <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-red-500 mb-2">Spirited & Fluffy</span>
                                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter mb-4">Poochons</h3>
                                <p className="text-sm sm:text-base text-white/90 font-medium italic leading-relaxed">
                                    Bichon Frise meets Poodle. Spirited, fluffy, and full of character, they are intelligent, eager to please, and highly social.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 bg-brand-white-100 border-t border-brand-white-400 relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-2xl font-black tracking-tight text-brand-teal-deep-800 mb-10 font-serif italic uppercase sm:text-6xl">Ready to Find Your New Best Friend?</h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/puppies" className="w-full sm:w-auto">
                            <Button variant="default" size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-black shadow-2xl sm:h-16 sm:px-12 sm:text-xl">
                                Browse Available Puppies
                            </Button>
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-black shadow-2xl border-2 sm:h-16 sm:px-12 sm:text-xl">
                                Contact Tiffany Now
                            </Button>
                        </Link>
                    </div>
                </div>
                <Heart className="absolute -bottom-12 -left-12 w-64 h-64 text-brand-red-700/5 rotate-12" />
                <PawPrint className="absolute -top-12 -right-12 w-64 h-64 text-brand-teal-deep-700/5 -rotate-12" />
            </section>
        </div>
    );
}

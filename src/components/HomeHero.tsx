"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/TiffanyDawsonRehomingLogo.png";

export function HomeHero() {
    return (
        <section className="relative bg-brand-teal-deep-50 py-12 sm:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-brand-teal-deep-100/20 -z-10" />
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red-700/5 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-teal-deep-700/5 rounded-full -ml-48 -mb-48 blur-3xl" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-8 sm:gap-16">
                    <div className="flex-1 w-full max-w-2xl px-4 sm:px-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative aspect-square rounded-[2rem] sm:rounded-[4rem] overflow-hidden "
                        >
                            <Image
                                src={logo}
                                alt="Tiffany Dawson Rehoming Logo"
                                fill
                                className="object-contain p-8"
                                priority
                            />
                        </motion.div>
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-3xl font-black tracking-tighter text-brand-teal-deep-900 sm:text-7xl mb-4 sm:mb-8 uppercase leading-[0.9]">
                                Giving New Hope <br />
                                <span className="text-brand-red-700">to Beloved Puppies</span>
                            </h1>
                            <p className="text-base sm:text-xl leading-relaxed text-brand-white-900 mb-8 sm:mb-10 font-medium italic">
                                We specialize in rehoming Cavapoos, Maltipoos, and Poochons, connecting loving families with puppies who need a new forever home.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 px-4 sm:px-0">
                                <Link
                                    href="/puppies"
                                    className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-full text-base sm:text-lg font-black bg-brand-red-700 text-white hover:bg-brand-red-600 px-8 h-12 sm:px-10 sm:h-16 shadow-2xl hover:shadow-brand-red/30 transition-all hover:-translate-y-1 active:translate-y-0 border-none uppercase tracking-widest"
                                >
                                    View Available Puppies
                                </Link>
                                <Link href="/about" className="text-xs sm:text-sm font-black leading-6 text-brand-teal-deep-700 hover:text-brand-red-700 transition-colors flex items-center gap-1 group uppercase tracking-widest">
                                    Read Our Story <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform font-serif text-lg sm:text-xl">→</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

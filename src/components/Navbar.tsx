"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const breeds = [
        { name: "Cavapoos", href: "/puppies?breed=Cavapoo" },
        { name: "Maltipoos", href: "/puppies?breed=Maltipoo" },
        { name: "Poochons", href: "/puppies?breed=Poochon" },
    ];

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-brand-teal-deep-50/95 backdrop-blur-md shadow-sm border-b border-brand-white-400">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-xl font-black text-brand-teal-deep-700 tracking-tighter uppercase">
                            Tiffany <span className="text-brand-red-700">Dawson</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold text-brand-teal-deep-900 hover:text-brand-red-700 transition-colors uppercase tracking-widest"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div
                            className="relative"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-1 text-sm font-bold text-brand-teal-deep-900 hover:text-brand-red-700 transition-colors uppercase tracking-widest outline-none"
                            >
                                Available Puppies
                                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 mt-2 w-56 bg-brand-white-100 rounded-2xl shadow-2xl border border-brand-white-400 overflow-hidden py-3"
                                    >
                                        <div className="px-6 py-2">
                                            <p className="text-[10px] font-extrabold text-brand-white-900 uppercase tracking-widest">Select a Breed</p>
                                        </div>
                                        {breeds.map((breed) => (
                                            <Link
                                                key={breed.name}
                                                href={breed.href}
                                                className="block px-6 py-3 text-sm font-bold text-brand-teal-deep-900 hover:bg-brand-teal-deep-100 hover:text-brand-teal-deep-700 transition-all font-serif italic"
                                            >
                                                {breed.name}
                                            </Link>
                                        ))}
                                        <div className="border-t border-brand-white-400 mt-2 pt-2">
                                            <Link
                                                href="/puppies"
                                                className="block px-6 py-3 text-sm font-black text-brand-red-700 hover:bg-brand-red-50 transition-colors"
                                            >
                                                View All Puppies →
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/puppies">
                            <Button variant="brand" size="sm">
                                Adopt Now
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-brand-teal-deep-700 hover:bg-brand-teal-deep-100 rounded-xl transition-all active:scale-95"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-white border-b border-brand-white-400 overflow-hidden shadow-2xl absolute top-full left-0 right-0 z-40"
                    >
                        <div className="flex flex-col p-6 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-black text-brand-teal-deep-900 hover:text-brand-red-700 transition-colors uppercase tracking-tight flex items-center justify-between group"
                                >
                                    {link.name}
                                    <ArrowRight className="w-4 h-4 text-brand-red-700" />
                                </Link>
                            ))}

                            <div className="h-px bg-brand-white-300" />

                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-brand-white-900 uppercase tracking-widest">Available Breeds</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {breeds.map((breed) => (
                                        <Link
                                            key={breed.name}
                                            href={breed.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-sm font-bold text-brand-teal-deep-700 hover:text-brand-red-700 transition-colors italic font-serif flex items-center gap-2"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-red-700" />
                                            {breed.name}
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href="/puppies"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-block text-sm font-black text-brand-red-700 underline decoration-2 underline-offset-4 mt-2"
                                >
                                    View Library →
                                </Link>
                            </div>

                            <Link href="/puppies" onClick={() => setIsOpen(false)} className="block pt-4">
                                <Button className="w-full h-14 text-sm font-black uppercase tracking-widest shadow-lg shadow-brand-red-100" size="default">
                                    Apply to Adopt
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

import Link from "next/link";
import { Heart, Facebook, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-brand-teal-deep-900 text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-red-700/50 to-transparent" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-red-700/5 rounded-full blur-3xl" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="text-2xl font-black tracking-tighter uppercase">Tiffany <span className="text-brand-red-500">Dawson</span></span>
                        </Link>
                        <p className="text-base text-white leading-relaxed font-medium italic">
                            "A bridge of love, connecting compassionate families with puppies in need of a forever home."
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-red-700 hover:border-brand-red-600 transition-all hover:-translate-y-1">
                                <Facebook className="w-5 h-5 text-white" />
                            </a>
                            <a href="#" className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-red-700 hover:border-brand-red-600 transition-all hover:-translate-y-1">
                                <Instagram className="w-5 h-5 text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-brand-red-500">Navigation</h3>
                        <ul className="space-y-5 text-base font-bold text-white">
                            <li><Link href="/" className="hover:text-brand-red-500 transition-colors flex items-center gap-2 group">Home</Link></li>
                            <li><Link href="/puppies" className="hover:text-brand-red-500 transition-colors flex items-center gap-2 group">Available Puppies</Link></li>
                            <li><Link href="/about" className="hover:text-brand-red-500 transition-colors flex items-center gap-2 group">Our Mission</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-red-500 transition-colors flex items-center gap-2 group">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-brand-red-500">Resources</h3>
                        <ul className="space-y-5 text-base font-bold text-white">
                            <li><Link href="/terms" className="hover:text-brand-red-500 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-brand-red-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/admin" className="hover:text-brand-red-500 transition-colors">Admin Portal</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-brand-red-500">Connect</h3>
                        <ul className="space-y-6 text-base font-bold text-white">
                            <li className="flex items-start gap-4 group">
                                <div className="p-3 bg-white/5 rounded-xl text-brand-red-500 group-hover:bg-brand-red-700 group-hover:text-white transition-all">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span className="mt-2">tiffany@rehoming.com</span>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="p-3 bg-white/5 rounded-xl text-brand-red-500 group-hover:bg-brand-red-700 group-hover:text-white transition-all">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span className="mt-2">(555) 123-4567</span>
                            </li>
                        </ul>
                        <Link href="/puppies">
                            <Button variant="brand" className="mt-10 w-full h-14 uppercase tracking-widest font-black">
                                Adopt Now
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-xs font-black uppercase tracking-widest text-white opacity-40">
                        &copy; {new Date().getFullYear()} Tiffany Dawson's Rehoming. Dedicated to Puppy Welfare.
                    </p>
                    <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-white opacity-40">
                        <Link href="/privacy" className="hover:text-brand-red-500 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-brand-red-500 transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

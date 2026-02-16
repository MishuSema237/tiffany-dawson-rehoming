"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Heart, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
            } else {
                const errorData = await res.json();
                alert(errorData.error || "Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-brand-white-200 min-h-screen">
            {/* Hero Section */}
            <section className="bg-brand-teal-deep-800 py-32 text-brand-white-100 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-red-700/5 -z-10" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl font-black tracking-tighter sm:text-7xl mb-6 uppercase">
                            Contact <span className="text-brand-red-500">Tiffany</span>
                        </h1>
                        <p className="mt-4 text-base text-brand-white-900 max-w-2xl mx-auto leading-relaxed font-medium sm:text-xl">
                            We're here to help you find your perfect match. Reach out with any questions about our puppies or rehoming process.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Info Column */}
                        <div className="space-y-10 lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-brand-white-100 p-10 rounded-[3rem] border border-brand-white-400 shadow-2xl relative group overflow-hidden transition-all hover:shadow-brand-teal-deep/10"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red-100 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                                <h2 className="text-2xl font-black text-brand-teal-deep-800 mb-10 flex items-center gap-4 uppercase tracking-tighter sm:text-3xl">
                                    <span className="w-2 h-8 bg-brand-red-700 rounded-full" />
                                    Get In Touch
                                </h2>
                                <div className="space-y-10">
                                    {[
                                        { icon: Mail, label: "Email Us", val: "tiffany@rehoming.com" },
                                        { icon: Phone, label: "Call/Text", val: "(555) 123-4567" },
                                        { icon: MapPin, label: "Our Location", val: "PA, USA (Nationwide Shipping)" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-5 group/item">
                                            <div className="bg-brand-teal-deep-100 p-4 rounded-2xl text-brand-teal-deep-700 shadow-inner group-hover/item:bg-brand-red-100 group-hover/item:text-brand-red-700 transition-colors">
                                                <item.icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-brand-white-900 uppercase tracking-widest mb-1">{item.label}</p>
                                                <p className="text-lg font-bold text-brand-teal-deep-900">{item.val}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-brand-teal-deep-700 p-10 rounded-[3rem] text-brand-white-100 shadow-2xl border border-brand-teal-deep-800 relative group"
                            >
                                <h3 className="text-2xl font-black mb-4 flex items-center gap-3 uppercase tracking-tighter">
                                    <Heart className="w-8 h-8 text-brand-red-500 fill-brand-red-500" />
                                    Home Environment
                                </h3>
                                <p className="text-brand-white-100 leading-relaxed mb-8 font-medium italic">
                                    Tiffany's Rehoming is operated directly from a private home to ensure the puppies' comfort. We choose a home setting over a store to maintain a low-stress environment for our pups.
                                </p>
                                <div className="h-1.5 w-16 bg-brand-red-500 rounded-full" />
                            </motion.div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-brand-teal-deep-100/30 p-12 lg:p-20 rounded-[3.5rem] border border-brand-teal-deep-300 shadow-xl text-center flex flex-col items-center justify-center min-h-[600px]"
                                    >
                                        <div className="bg-brand-teal-deep-700 w-28 h-28 rounded-full flex items-center justify-center mb-10 shadow-2xl animate-bounce">
                                            <Send className="w-12 h-12 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-black text-brand-teal-deep-800 mb-6 tracking-tighter uppercase sm:text-5xl">Message Sent!</h2>
                                        <p className="text-lg text-brand-white-900 max-w-md leading-relaxed font-medium italic sm:text-xl">
                                            Thank you for reaching out. Tiffany will review your inquiry and get back to you personally within 24 hours.
                                        </p>
                                        <Button
                                            onClick={() => setSubmitted(false)}
                                            variant="outline"
                                            className="mt-12 h-12 px-8 text-base font-black sm:h-16 sm:px-12 sm:text-lg"
                                        >
                                            Send Another Message
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-brand-white-100 p-10 md:p-14 rounded-[3.5rem] border border-brand-white-400 shadow-2xl"
                                    >
                                        <h2 className="text-2xl font-black text-brand-teal-deep-800 mb-10 uppercase tracking-tighter flex items-center gap-4 sm:text-4xl">
                                            <MessageSquare className="w-10 h-10 text-brand-red-700" />
                                            Send a Message
                                        </h2>
                                        <form onSubmit={handleSubmit} className="space-y-10">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <div className="space-y-3">
                                                    <Label htmlFor="name" className="text-[10px] font-black text-brand-teal-deep-700 uppercase tracking-widest ml-1">Your Name</Label>
                                                    <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} className="rounded-2xl border-brand-white-400 focus:ring-brand-teal-deep-300 h-14 shadow-inner bg-brand-white-200/50 text-brand-teal-deep-900 font-bold" required />
                                                </div>
                                                <div className="space-y-3">
                                                    <Label htmlFor="email" className="text-[10px] font-black text-brand-teal-deep-700 uppercase tracking-widest ml-1">Email Address</Label>
                                                    <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className="rounded-2xl border-brand-white-400 focus:ring-brand-teal-deep-300 h-14 shadow-inner bg-brand-white-200/50 text-brand-teal-deep-900 font-bold" required />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="subject" className="text-[10px] font-black text-brand-teal-deep-700 uppercase tracking-widest ml-1">Subject</Label>
                                                <Input id="subject" placeholder="General Inquiry / Adoption Question / Shipping Info" value={formData.subject} onChange={handleChange} className="rounded-2xl border-brand-white-400 focus:ring-brand-teal-deep-300 h-14 shadow-inner bg-brand-white-200/50 text-brand-teal-deep-900 font-bold" required />
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="message" className="text-[10px] font-black text-brand-teal-deep-700 uppercase tracking-widest ml-1">How can we help?</Label>
                                                <Textarea id="message" placeholder="Ask us about a specific puppy or the rehoming process..." value={formData.message} onChange={handleChange} className="rounded-[2rem] border-brand-white-400 focus:ring-brand-teal-deep-300 min-h-[220px] p-8 shadow-inner bg-brand-white-200/50 text-brand-teal-deep-900 font-medium text-lg leading-relaxed" required />
                                            </div>

                                            <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-black uppercase tracking-widest shadow-2xl sm:h-20 sm:text-2xl">
                                                {loading ? (
                                                    <span className="flex items-center gap-3">
                                                        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                                            <Heart className="w-8 h-8 fill-white" />
                                                        </motion.span>
                                                        Sending...
                                                    </span>
                                                ) : "Send Message"}
                                            </Button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-24 bg-brand-white-200 border-t border-brand-white-400 overflow-hidden relative">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <Heart className="w-16 h-16 text-brand-red-700 mx-auto mb-8 opacity-20" />
                        <p className="text-xl font-serif italic text-brand-teal-deep-800 leading-relaxed font-bold sm:text-3xl">
                            "Finding the perfect home for every puppy is not just my job, it's my promise to every family I work with."
                        </p>
                        <p className="mt-6 font-black text-brand-red-700 uppercase tracking-widest text-sm">— Tiffany Dawson</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

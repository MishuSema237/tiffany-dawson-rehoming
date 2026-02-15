"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AdoptionForm({ puppyName, onSuccess }: { puppyName?: string, onSuccess?: () => void }) {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        answers: ["", "", "", "", "", "", "", ""]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const applicationData = {
            applicantName: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            puppyName: puppyName,
            answers: {
                q1: formData.answers[0],
                q2: formData.answers[1],
                q3: formData.answers[2],
                q4: formData.answers[3],
                q5: formData.answers[4],
                q6: formData.answers[5],
                q7: formData.answers[6],
                q8: formData.answers[7],
            }
        };

        try {
            const res = await fetch("/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(applicationData),
            });

            if (res.ok) {
                setSubmitted(true);
                if (onSuccess) {
                    setTimeout(() => onSuccess(), 2000); // Close after 2s so they see the success message
                }
            } else {
                alert("Failed to submit application. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-8 bg-brand-teal-deep-50 rounded-[2.5rem] border border-brand-teal-deep-200 shadow-inner"
            >
                <div className="bg-brand-teal-deep-700 shadow-xl rounded-full p-6 w-24 h-24 mx-auto mb-8 flex items-center justify-center animate-bounce">
                    <Heart className="w-12 h-12 text-white fill-white" />
                </div>
                <h3 className="text-3xl font-extrabold text-brand-teal-deep-700 mb-4">Application Sent!</h3>
                <p className="text-brand-white-900 text-lg leading-relaxed max-w-md mx-auto">
                    Thank you for your interest in <strong>{puppyName || "our puppy"}</strong>. Tiffany will personally review your application and get back to you within 24-48 hours.
                </p>
                <Button
                    className="mt-10 rounded-full border-brand-teal-muted-700 text-brand-teal-deep-700 hover:bg-brand-teal-deep-700 hover:text-white transition-all px-10 h-12 font-bold"
                    variant="outline"
                    onClick={() => window.location.reload()}
                >
                    Submit Another Application
                </Button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] font-extrabold text-brand-teal-deep-700 ml-1 uppercase tracking-widest">Full Name</Label>
                    <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="rounded-2xl border-brand-white-400 focus:ring-brand-teal-deep-300 h-12 bg-white/50" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] font-extrabold text-brand-teal-deep-700 ml-1 uppercase tracking-widest">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required className="rounded-2xl border-brand-white-400 focus:ring-brand-teal-deep-300 h-12 bg-white/50" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[10px] font-extrabold text-brand-teal-deep-700 ml-1 uppercase tracking-widest">Phone Number</Label>
                    <Input id="phone" placeholder="(555) 000-0000" value={formData.phone} onChange={handleChange} required className="rounded-2xl border-brand-white-400 focus:ring-brand-teal-deep-300 h-12 bg-white/50" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location" className="text-[10px] font-extrabold text-brand-teal-deep-700 ml-1 uppercase tracking-widest">Your Location</Label>
                    <Input id="location" placeholder="Austin, TX" value={formData.location} onChange={handleChange} required className="rounded-2xl border-brand-white-400 focus:ring-brand-teal-deep-300 h-12 bg-white/50" />
                </div>
            </div>

            {/* Application Questions */}
            <div className="space-y-10 mt-12 bg-brand-white-300 p-8 md:p-10 rounded-[2.5rem] border border-brand-white-400 shadow-inner">
                <h4 className="text-xl font-extrabold text-brand-teal-deep-700 flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 rounded-full bg-brand-teal-deep-700 text-white flex items-center justify-center text-sm shadow-lg">8</span>
                    Adoption Questions
                </h4>
                <div className="space-y-10">
                    {[
                        "Why are you interested in adopting a puppy at this time?",
                        "Do you have a secure, fenced yard or a safe plan for outdoor time?",
                        "Who will be the primary caregiver for the puppy?",
                        "Are there any other pets in your home? (Please list species and ages)",
                        "Do you have experience with this breed's grooming and exercise needs?",
                        "How many hours a day will the puppy be left alone?",
                        "Are all members of your household in agreement about this adoption?",
                        "Have you ever had to rehome a pet before? If so, please explain."
                    ].map((q, i) => (
                        <div key={i} className="space-y-4 group">
                            <Label className="text-[15px] font-bold text-brand-teal-deep-900 group-focus-within:text-brand-red-700 transition-colors leading-relaxed block">
                                {i + 1}. {q}
                            </Label>
                            <Textarea
                                className="rounded-[1.5rem] border-brand-white-400 focus:ring-brand-teal-deep-300 min-h-[120px] resize-none p-5 bg-white shadow-sm transition-shadow focus:shadow-md"
                                placeholder="Share your details here..."
                                value={formData.answers[i]}
                                onChange={(e) => {
                                    const newAnswers = [...formData.answers];
                                    newAnswers[i] = e.target.value;
                                    setFormData({ ...formData, answers: newAnswers });
                                }}
                                required
                            />
                        </div>
                    ))}
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-brand-red-700 text-white hover:bg-brand-red-600 h-16 text-xl font-extrabold shadow-xl hover:shadow-brand-red/30 transition-all hover:-translate-y-1 active:translate-y-0 border-none mt-8"
            >
                {loading ? (
                    <span className="flex items-center gap-3">
                        <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <Heart className="w-6 h-6 fill-white" />
                        </motion.span>
                        Processing...
                    </span>
                ) : (
                    `Apply to Adopt ${puppyName || 'Now'}`
                )}
            </Button>
            <p className="text-center text-brand-white-900 text-sm mt-6 italic font-bold">
                "Finding the perfect home for every puppy is my top priority." — Tiffany
            </p>
        </form>
    );
}

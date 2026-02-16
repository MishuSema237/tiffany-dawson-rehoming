"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

interface TestimonialFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export function TestimonialForm({ initialData, onSuccess, onCancel }: TestimonialFormProps) {
    const [formData, setFormData] = useState(
        initialData || {
            name: "",
            text: "",
            location: "",
            rating: 5,
        }
    );
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = initialData ? `/api/testimonials/${initialData._id}` : "/api/testimonials";
        const method = initialData ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                toast.success(initialData ? "Testimonial updated!" : "Testimonial added!");
                onSuccess();
            } else {
                toast.error("Failed to save testimonial");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving testimonial");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-500">Client Name</Label>
                    <Input id="name" value={formData.name} onChange={handleChange} required className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="image" className="text-[10px] font-black uppercase tracking-widest text-gray-500">Client Picture URL</Label>
                    <Input id="image" value={formData.image || ""} onChange={handleChange} placeholder="https://..." className="rounded-xl h-11" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="location" className="text-[10px] font-black uppercase tracking-widest text-gray-500">Location</Label>
                    <Input id="location" value={formData.location} onChange={handleChange} placeholder="e.g. Austin, TX" required className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="rating" className="text-[10px] font-black uppercase tracking-widest text-gray-500">Rating (1-5)</Label>
                    <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.5"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                        className="rounded-xl h-11"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="text" className="text-[10px] font-black uppercase tracking-widest text-gray-500">Testimonial Text</Label>
                <Textarea id="text" value={formData.text} onChange={handleChange} required className="rounded-xl min-h-[120px]" />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto rounded-full px-8 h-12 text-sm font-bold border-gray-900 text-gray-900 uppercase tracking-widest">Cancel</Button>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto rounded-full px-10 h-12 text-sm font-black bg-brand-teal-deep-700 text-white hover:bg-brand-teal-deep-800 shadow-xl uppercase tracking-widest">
                    {loading ? "Saving..." : "Save Testimonial"}
                </Button>
            </div>
        </form>
    );
}

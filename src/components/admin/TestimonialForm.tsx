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
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <div>
                <Label htmlFor="name">Client Name</Label>
                <Input id="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <Label htmlFor="image">Client Picture URL</Label>
                <Input id="image" value={formData.image || ""} onChange={handleChange} placeholder="https://..." />
            </div>
            <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={formData.location} onChange={handleChange} placeholder="e.g. Austin, TX" required />
            </div>
            <div>
                <Label htmlFor="rating">Rating (1-5, half stars allowed)</Label>
                <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.5"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="text">Testimonial Text</Label>
                <Textarea id="text" value={formData.text} onChange={handleChange} required />
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Testimonial"}</Button>
            </div>
        </form>
    );
}

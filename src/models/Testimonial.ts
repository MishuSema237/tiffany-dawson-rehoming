import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
    name: string;
    text: string;
    location: string;
    rating: number; // 1-5, supports 0.5 increments
    image?: string; // Client picture
    date: Date;
}

const TestimonialSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        text: { type: String, required: true },
        location: { type: String, required: true },
        rating: { type: Number, default: 5, min: 1, max: 5 },
        image: { type: String },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Testimonial: Model<ITestimonial> =
    mongoose.models.Testimonial ||
    mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;

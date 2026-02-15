import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplication extends Document {
    puppyName: string;
    applicantName: string;
    email: string;
    phone: string;
    location: string;
    answers: {
        q1: string; // Married/Children
        q2: string; // Yard
        q3: string; // Alone time
        q4: string; // Dog experience
        q5: string; // Why best choice
        q6: string; // When bring home
        q7: string; // Pickup/Delivery
        q8: string; // Location
    };
    status: "new" | "reviewed" | "approved" | "rejected";
    createdAt: Date;
}

const ApplicationSchema: Schema = new Schema(
    {
        puppyName: { type: String, required: false },
        applicantName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        location: { type: String, required: true },
        answers: {
            q1: { type: String, required: true },
            q2: { type: String, required: true },
            q3: { type: String, required: true },
            q4: { type: String, required: true },
            q5: { type: String, required: true },
            q6: { type: String, required: true },
            q7: { type: String, required: true },
            q8: { type: String, required: true },
        },
        status: {
            type: String,
            enum: ["new", "reviewed", "approved", "rejected"],
            default: "new",
        },
        adminNotes: { type: String, default: "" },
    },
    { timestamps: true }
);

const Application: Model<IApplication> =
    mongoose.models.Application ||
    mongoose.model<IApplication>("Application", ApplicationSchema);

export default Application;

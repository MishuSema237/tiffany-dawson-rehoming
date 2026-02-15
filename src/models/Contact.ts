import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    status: "new" | "replied" | "archived";
    createdAt: Date;
    updatedAt: Date;
}

const ContactSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        subject: { type: String },
        message: { type: String, required: true },
        status: {
            type: String,
            enum: ["new", "replied", "archived"],
            default: "new",
        },
    },
    { timestamps: true }
);

const Contact: Model<IContact> =
    mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;

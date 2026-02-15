import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
    await dbConnect();
    const { id } = await params;
    try {
        const app = await Application.findById(id);
        if (!app) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

        // Update status
        app.status = "approved";
        await app.save();

        // Send Email using centralized utility
        await sendMail({
            to: app.email,
            subject: "Application Approved - Tiffany Dawson's Rehoming",
            text: `Dear ${app.applicantName},\n\nCongratulations! We have reviewed your application for ${app.puppyName || "a puppy"} and are thrilled to move forward. We believe you would provide a wonderful home.\n\nPlease reply to this email to discuss the next steps, including adoption fees and pickup/shipping arrangements.\n\nWarm regards,\nTiffany Dawson`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <span style="font-size: 50px;">🎉</span>
                    </div>
                    <h2 style="color: #0d9488; text-align: center;">Application Approved!</h2>
                    <p>Dear ${app.applicantName},</p>
                    <p style="line-height: 1.6;">Congratulations! We have reviewed your application for <strong>${app.puppyName || "a puppy"}</strong> and are thrilled to move forward. We believe you would provide a wonderful home.</p>
                    <p style="line-height: 1.6;">Please reply to this email (or contact us directly) to discuss the next steps, including adoption fees and pickup/shipping arrangements.</p>
                    
                    <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #ccfbf1;">
                        <h4 style="margin-top: 0; color: #0f766e;">Next Steps:</h4>
                        <ul style="margin-bottom: 0; color: #134e4a;">
                            <li>Confirm adoption details</li>
                            <li>Discuss travel arrangements (Nanny/Pickup)</li>
                            <li>Formalize adoption agreement</li>
                        </ul>
                    </div>

                    <p>We're so excited for you to meet your new family member!</p>
                    
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;">
                    <p>Warm regards,</p>
                    <p><strong>Tiffany Dawson</strong><br>Tiffany Dawson's Rehoming</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Approval error:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to approve" }, { status: 500 });
    }
}

import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function GET() {
    await dbConnect();
    try {
        const applications = await Application.find({}).sort({ createdAt: -1 });
        return NextResponse.json(applications);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const application = await Application.create(body);

        // Send email notification to admin
        const adminEmail = "vanslili265@gmail.com";
        await sendMail({
            to: adminEmail,
            subject: `New Adoption Application for ${application.puppyName || "a puppy"}`,
            text: `
                New Adoption Application received from ${application.applicantName}.
                
                Applicant Info:
                Email: ${application.email}
                Phone: ${application.phone}
                Location: ${application.location}
                
                Answers:
                1. Status/Children: ${application.answers.q1}
                2. Yard: ${application.answers.q2}
                3. Alone time: ${application.answers.q3}
                4. Experience: ${application.answers.q4}
                5. Best choice: ${application.answers.q5}
                6. Timeline: ${application.answers.q6}
                7. Pickup/Nanny: ${application.answers.q7}
                8. Location/Delivery: ${application.answers.q8}
            `,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #0d9488;">New Adoption Application</h2>
                    <p style="font-size: 16px;">New application received for <strong>${application.puppyName || "a puppy"}</strong></p>
                    
                    <div style="background: #f0fdfa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #0f766e;">Applicant Information</h3>
                        <p><strong>Name:</strong> ${application.applicantName}</p>
                        <p><strong>Email:</strong> ${application.email}</p>
                        <p><strong>Phone:</strong> ${application.phone}</p>
                        <p><strong>Location:</strong> ${application.location}</p>
                    </div>

                    <h3 style="color: #0f766e;">Questionnaire Answers</h3>
                    <div style="line-height: 1.6; color: #4b5563;">
                        <p><strong>1. Married/Children:</strong> ${application.answers.q1}</p>
                        <p><strong>2. Dog Yard/Fence:</strong> ${application.answers.q2}</p>
                        <p><strong>3. Time Alone:</strong> ${application.answers.q3}</p>
                        <p><strong>4. Experience with Breed:</strong> ${application.answers.q4}</p>
                        <p><strong>5. Why are you the best choice?</strong> ${application.answers.q5}</p>
                        <p><strong>6. When do you want to bring the puppy home?</strong> ${application.answers.q6}</p>
                        <p><strong>7. Pickup or Nanny Delivery?</strong> ${application.answers.q7}</p>
                        <p><strong>8. Specific Town/State for Delivery:</strong> ${application.answers.q8}</p>
                    </div>
                    
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;">
                    <p style="font-size: 12px; color: #9ca3af;">You can review and manage this application in the Admin Dashboard.</p>
                </div>
            `,
        });

        return NextResponse.json(application, { status: 201 });
    } catch (error: any) {
        console.error("Application submission error:", error);
        return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 400 });
    }
}

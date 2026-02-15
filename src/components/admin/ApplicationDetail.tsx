"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

interface ApplicationDetailProps {
    application: any;
    onBack: () => void;
    onUpdate: () => void;
}

export function ApplicationDetail({ application, onBack, onUpdate }: ApplicationDetailProps) {
    const [replyMessage, setReplyMessage] = useState("");
    const [sending, setSending] = useState(false);

    const handleApprove = async () => {
        if (!confirm("Approve this application? This will send a congratulatory email.")) return;
        setSending(true);
        try {
            const res = await fetch(`/api/applications/${application._id}/approve`, { method: "POST" });
            if (res.ok) {
                toast.success("Application approved and email sent!");
                onUpdate();
                onBack();
            } else {
                toast.error("Failed to approve");
            }
        } catch (e) {
            toast.error("Error approving");
        } finally {
            setSending(false);
        }
    };

    const handleReply = async () => {
        if (!replyMessage.trim()) return alert("Enter a message");
        setSending(true);
        try {
            const res = await fetch(`/api/applications/${application._id}/reply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: replyMessage }),
            });
            if (res.ok) {
                toast.success("Reply sent!");
                setReplyMessage("");
            } else {
                toast.error("Failed to send reply");
            }
        } catch (e) {
            toast.error("Error sending reply");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{application.applicantName}</h2>
                    <p className="text-gray-500">{application.email}</p>
                </div>
                <Button variant="outline" onClick={onBack}>Back to List</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Questions & Answers</h3>
                    {[
                        { q: "Why are you interested in adopting a puppy at this time?", a: application.answers.q1 },
                        { q: "Do you have a secure, fenced yard or a safe plan for outdoor time?", a: application.answers.q2 },
                        { q: "Who will be the primary caregiver for the puppy?", a: application.answers.q3 },
                        { q: "Are there any other pets in your home?", a: application.answers.q4 },
                        { q: "Experience with breed's grooming and exercise needs?", a: application.answers.q5 },
                        { q: "How many hours a day will the puppy be left alone?", a: application.answers.q6 },
                        { q: "All members of household in agreement?", a: application.answers.q7 },
                        { q: "Ever had to rehome a pet before?", a: application.answers.q8 },
                    ].map((item, i) => (
                        <div key={i} className="mb-4">
                            <span className="text-[10px] font-black uppercase text-brand-teal-deep-700 tracking-widest">{i + 1}. {item.q}</span>
                            <p className="text-sm text-gray-800 bg-brand-white-200/50 p-4 rounded-xl mt-1.5 border border-brand-white-400 italic leading-relaxed font-medium">
                                "{item.a || "No answer provided"}"
                            </p>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-4">Actions</h3>
                        {application.status !== 'approved' && (
                            <Button
                                onClick={handleApprove}
                                className="w-full mb-4 bg-green-600 hover:bg-green-700 text-white"
                                disabled={sending}
                            >
                                {sending ? "Processing..." : "Approve Application"}
                            </Button>
                        )}
                        <div className="border-t pt-4 mt-4">
                            <h4 className="font-medium mb-2">Send Custom Reply</h4>
                            <Textarea
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                placeholder="Type your message here..."
                                className="mb-2"
                            />
                            <Button onClick={handleReply} disabled={sending || !replyMessage} variant="outline" className="w-full">
                                Send Message
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

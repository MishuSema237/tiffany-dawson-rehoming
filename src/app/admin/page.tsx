"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PuppyForm } from "@/components/admin/PuppyForm";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { ApplicationDetail } from "@/components/admin/ApplicationDetail";
import { Plus, Edit, Trash, ChevronDown, Heart, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ContactList } from "@/components/admin/ContactList";

type Tab = "puppies" | "applications" | "testimonials" | "contacts";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>("puppies");
    const [puppies, setPuppies] = useState<any[]>([]);
    const [applications, setApplications] = useState<any[]>([]);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [contacts, setContacts] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPuppy, setCurrentPuppy] = useState<any>(null);
    const [currentTestimonial, setCurrentTestimonial] = useState<any>(null);
    const [currentApplication, setCurrentApplication] = useState<any>(null);

    useEffect(() => {
        fetchPuppies();
        fetchApplications();
        fetchTestimonials();
        fetchContacts();
    }, []);

    const fetchPuppies = async () => {
        const res = await fetch("/api/puppies");
        if (res.ok) setPuppies(await res.json());
    };

    const fetchApplications = async () => {
        const res = await fetch("/api/applications");
        if (res.ok) setApplications(await res.json());
    };

    const fetchTestimonials = async () => {
        const res = await fetch("/api/testimonials");
        if (res.ok) setTestimonials(await res.json());
    };

    const fetchContacts = async () => {
        const res = await fetch("/api/contacts");
        if (res.ok) setContacts(await res.json());
    };

    const handleDeletePuppy = async (id: string) => {
        if (confirm("Are you sure?")) {
            await fetch(`/api/puppies/${id}`, { method: "DELETE" });
            fetchPuppies();
        }
    };

    const handleDeleteTestimonial = async (id: string) => {
        if (confirm("Are you sure?")) {
            await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
            fetchTestimonials();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar for md+ screens */}
            <aside className="hidden md:flex w-72 bg-brand-teal-deep-800 text-white flex-col h-screen sticky top-0 shadow-2xl z-50">
                <div className="p-8 border-b border-brand-teal-deep-700/50">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="bg-brand-red-700 p-2.5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                            <Heart className="w-6 h-6 fill-white text-white" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-tighter leading-tight">Tiffany Dawson's</h2>
                            <p className="text-[10px] font-bold text-brand-teal-deep-300 uppercase tracking-widest leading-none mt-0.5">Admin Console</p>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {[
                        { id: "puppies", icon: "🐶", label: "Manage Puppies" },
                        { id: "applications", icon: "📄", label: "Applications" },
                        { id: "testimonials", icon: "✨", label: "Testimonials" },
                        { id: "contacts", icon: "📧", label: "Contact Messages" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as Tab)}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all",
                                activeTab === item.id
                                    ? "bg-brand-red-700 text-white shadow-xl translate-x-1"
                                    : "text-brand-teal-deep-100 hover:bg-brand-teal-deep-700 hover:text-white"
                            )}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-brand-teal-deep-700/50">
                    <Link
                        href="/"
                        className="w-full flex items-center justify-center h-14 rounded-2xl border-2 border-brand-red-700/30 text-brand-red-400 text-xs font-black uppercase tracking-widest hover:bg-brand-red-700 hover:text-white transition-all shadow-sm"
                    >
                        Log Out
                    </Link>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-50">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-brand-teal-deep-700">
                            <Heart className="w-5 h-5 fill-current" />
                        </Link>
                        {/* Tab Dropdown for Mobile */}
                        <div className="relative">
                            <select
                                value={activeTab}
                                onChange={(e) => setActiveTab(e.target.value as Tab)}
                                className="appearance-none bg-brand-teal-deep-50 border border-brand-teal-deep-100 text-brand-teal-deep-900 font-bold py-2.5 pl-4 pr-10 rounded-xl focus:outline-none text-[10px] uppercase tracking-widest"
                            >
                                <option value="puppies">🐶 Puppies</option>
                                <option value="applications">📄 Apps</option>
                                <option value="testimonials">✨ Stars</option>
                                <option value="contacts">📧 Mail</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-teal-deep-700">
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="rounded-xl text-[10px] font-black uppercase tracking-widest h-10 px-4 border border-red-100 text-red-500 flex items-center justify-center"
                    >
                        Exit
                    </Link>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8 w-full max-w-full overflow-hidden">
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab} Management</h1>
                        <div className="flex gap-2 w-full sm:w-auto">
                            {activeTab === "puppies" && !isEditing && (
                                <Button className="flex-1 sm:flex-none" onClick={() => { setCurrentPuppy(null); setIsEditing(true); }}>
                                    <Plus className="w-4 h-4 mr-2" /> Add Puppy
                                </Button>
                            )}
                            {activeTab === "testimonials" && !isEditing && (
                                <Button className="flex-1 sm:flex-none" onClick={() => { setCurrentTestimonial(null); setIsEditing(true); }}>
                                    <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                                </Button>
                            )}
                        </div>
                    </div>

                    {activeTab === "puppies" && (
                        isEditing ? (
                            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold mb-4">{currentPuppy ? "Edit Puppy" : "Add New Puppy"}</h3>
                                <PuppyForm
                                    initialData={currentPuppy}
                                    onSuccess={() => { setIsEditing(false); fetchPuppies(); }}
                                    onCancel={() => setIsEditing(false)}
                                />
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[600px]">
                                        <thead className="bg-gray-50 border-b border-gray-100">
                                            <tr>
                                                <th className="p-4 font-medium text-gray-500">Name</th>
                                                <th className="p-4 font-medium text-gray-500">Breed</th>
                                                <th className="p-4 font-medium text-gray-500">Status</th>
                                                <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {puppies.map((puppy) => (
                                                <tr key={puppy._id} className="hover:bg-gray-50">
                                                    <td className="p-4 font-medium">{puppy.name}</td>
                                                    <td className="p-4 text-gray-600">{puppy.breed}</td>
                                                    <td className="p-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${puppy.status === 'available' ? 'bg-green-100 text-green-800' :
                                                            puppy.status === 'adopted' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {puppy.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right space-x-2">
                                                        <Button size="sm" variant="outline" onClick={() => { setCurrentPuppy(puppy); setIsEditing(true); }}>
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="sm" variant="destructive" onClick={() => handleDeletePuppy(puppy._id)}>
                                                            <Trash className="w-4 h-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {puppies.length === 0 && (
                                                <tr>
                                                    <td colSpan={4} className="p-8 text-center text-gray-500">No puppies found. Add one to get started.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    )}

                    {activeTab === "testimonials" && (
                        isEditing ? (
                            <div className="max-w-2xl bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold mb-4">{currentTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</h3>
                                <TestimonialForm
                                    initialData={currentTestimonial}
                                    onSuccess={() => { setIsEditing(false); fetchTestimonials(); }}
                                    onCancel={() => setIsEditing(false)}
                                />
                            </div>
                        ) : (
                            <div className="grid gap-4 bg-white rounded-xl shadow-sm p-4 md:p-6">
                                {testimonials.map((t) => (
                                    <div key={t._id} className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{t.name} <span className="text-gray-500 font-normal text-sm">({t.location})</span></h4>
                                            <p className="text-gray-600 text-sm mt-1">"{t.text}"</p>
                                            <div className="mt-1 text-xs text-yellow-500">{"★".repeat(t.rating)}</div>
                                        </div>
                                        <div className="flex space-x-2 w-full sm:w-auto justify-end">
                                            <Button size="sm" variant="outline" onClick={() => { setCurrentTestimonial(t); setIsEditing(true); }}>
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleDeleteTestimonial(t._id)}>
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {testimonials.length === 0 && <p className="text-center text-gray-500">No testimonials yet.</p>}
                            </div>
                        )
                    )}

                    {activeTab === "applications" && (
                        currentApplication ? (
                            <ApplicationDetail
                                application={currentApplication}
                                onBack={() => setCurrentApplication(null)}
                                onUpdate={fetchApplications}
                            />
                        ) : (
                            <div className="grid gap-4">
                                {applications.map((app) => (
                                    <div key={app._id} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="text-lg font-bold text-gray-900">{app.applicantName}</h3>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    app.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {app.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 break-all">{app.email}</p>
                                            <div className="text-xs text-gray-400 mt-1">For: {app.puppyName || "General Inquiry"} • {new Date(app.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        <Button variant="outline" className="w-full sm:w-auto" onClick={() => setCurrentApplication(app)}>View Details</Button>
                                    </div>
                                ))}
                                {applications.length === 0 && (
                                    <div className="p-8 text-center text-gray-500 bg-white rounded-xl">No applications yet.</div>
                                )}
                            </div>
                        )
                    )}

                    {activeTab === "contacts" && (
                        <ContactList contacts={contacts} onUpdate={fetchContacts} />
                    )}
                </main>
            </div>
        </div>
    );
}

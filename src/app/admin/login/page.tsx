"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "admin@tiffanydawson.com" && password === "admin123") { // Hardcoded for MVP
            // Set cookie
            document.cookie = "admin_token=secret_token; path=/; max-age=86400; SameSite=Strict";
            router.push("/admin");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="flex bg-gray-50 min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900">Admin Login</h1>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-black text-white rounded-full">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

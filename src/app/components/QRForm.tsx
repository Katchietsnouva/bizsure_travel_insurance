// components/QRForm.tsx
"use client";

import { useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const painPoints = [
    "Slow quotations",
    "Renewals leakage",
    "Finance errors",
    "Claims delays",
    "Hard-to-use system",
    "Poor support",
    "No mobile app",
    "Other"
];

export default function QRForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            fullName: formData.get("fullName"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            agencyName: formData.get("agencyName"),
            currentSystem: formData.get("currentSystem") || null,
            usingSystem: formData.get("usingSystem"),
            whichSystem: formData.get("whichSystem") || null,
            painPoints: formData.getAll("painPoints"),
            otherPain: formData.get("otherPain") || null,
            submittedAt: serverTimestamp(),
            source: "QR Code Conference"
        };

        addDoc(collection(db, "demo_requests"), data)
            .then(() => {
                setSuccess(true);
                setLoading(false);
            })
            .catch(() => {
                alert("Error submitting. Try again.");
                setLoading(false);
            });
    } ;

    if (success) {
        return (
            <div className="text-center py-12">
                <h2 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h2>
                <p className="text-xl">We will contact you within 24 hours ⚡</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-black">
            <input required name="fullName" placeholder="Full Name" className="w-full px-4 py-3 border rounded-lg" />
            <input required name="phone" type="tel" placeholder="Phone (WhatsApp)" className="w-full px-4 py-3 border rounded-lg" />
            <input required name="email" type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
            <input required name="agencyName" placeholder="Agency Name" className="w-full px-4 py-3 border rounded-lg" />

            <div>
                <label className="block text-sm font-medium mb-2">Are you currently using a system?</label>
                <div className="grid grid-cols-3 gap-3">
                    {["Yes", "No", "Not sure"].map((opt) => (
                        <label key={opt} className="flex items-center">
                            <input required type="radio" name="usingSystem" value={opt} className="mr-2" />
                            <span>{opt}</span>
                        </label>
                    ))}
                </div>
                <input name="whichSystem" placeholder="Which one? (optional)" className="w-full mt-3 px-4 py-3 border rounded-lg" />
            </div>

            <div>
                <p className="text-sm font-medium mb-3">What is your biggest pain point? (check all that apply)</p>
                <div className="space-y-2">
                    {painPoints.map((pain) => (
                        <label key={pain} className="flex items-center">
                            <input type="checkbox" name="painPoints" value={pain} className="mr-3 h-5 w-5 text-blue-600" />
                            <span>{pain}</span>
                        </label>
                    ))}
                </div>
                <input name="otherPain" placeholder="Other (please specify)" className="w-full mt-3 px-4 py-3 border rounded-lg" />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-lg text-xl hover:opacity-90 disabled:opacity-70"
            >
                {loading ? "Submitting..." : "Book My Demo Now →"}
            </button>
        </form>
    );
}
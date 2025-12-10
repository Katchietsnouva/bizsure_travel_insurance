"use client";
import { useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ShortForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      painPoints: formData.getAll("painPoint"), // checkbox array
      otherPainPoint: formData.get("otherPainPoint") || null,
      createdAt: serverTimestamp(),
      source: "qr-code",
    };

    try {
      await addDoc(collection(db, "book_your_insurance_cloud_demo"), data);
      // addDoc(collection(db, "book_your_insurance_cloud_demo", "book_your_insurance_cloud_demo"), data);
      router.push("/success?step=short");
    } catch (err) {
      alert("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input required name="fullName" placeholder="Full Name" className="w-full p-4 rounded-lg text-black" />
      <input required type="tel" name="phone" placeholder="Phone (WhatsApp)" className="w-full p-4 rounded-lg text-black" />
      <input required type="email" name="email" placeholder="Email" className="w-full p-4 rounded-lg text-black" />
      <input required name="agencyName" placeholder="Agency Name" className="w-full p-4 rounded-lg text-black" />

      <input name="currentSystem" placeholder="Current System (Optional)" className="w-full p-4 rounded-lg text-black" />

      <div className="space-y-2">
        <p className="text-sm opacity-80">Biggest pain point(s)? (check all that apply)</p>
        {[
          "Slow quotations",
          "Renewals leakage",
          "Finance errors",
          "Claims delays",
          "Hard-to-use system",
          "Poor support",
          "No mobile app",
        ].map((pain) => (
          <label key={pain} className="flex items-center gap-3">
            <input type="checkbox" name="painPoint" value={pain} className="w-5 h-5" />
            <span>{pain}</span>
          </label>
        ))}
        <input name="otherPainPoint" placeholder="Other (optional)" className="w-full p-3 rounded text-black text-sm" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-5 rounded-xl text-xl"
      >
        {loading ? "Submitting..." : "YES! Book My Demo →"}
      </button>
    </form>
  );
}
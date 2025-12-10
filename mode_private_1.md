Hell yeah bro! This is a super solid project — perfect for Next.js + Firebase combo.  
You want exactly this flow:

1. User scans QR code → lands on a clean, fast mobile-friendly page  
2. Fills a short lead-capture form (the “minimalist” version)  
3. Optionally continues to a longer qualification form after submitting  
4. All data saved in Firebase (Firestore)  
5. You get notified + can segment leads instantly

Here’s the exact plan + code structure I’d use in 2025 (Next.js 15 + App Router + Firebase v10):

### Project Structure
```
my-insurance-qr/
├── app/
│   ├── page.tsx              ← Short QR landing form
│   ├── detailed/page.tsx     ← Longer qualification form (optional step)
│   ├── success/page.tsx      ← Thank you page
│   └── layout.tsx
├── components/
│   ├── ShortForm.tsx
│   ├── DetailedForm.tsx
│   └── PainPointsCheckbox.tsx
├── lib/
│   └── firebase.ts           ← Firebase init
├── public/
│   └── qr/                   ← Put your QR codes here
└── types.ts                  ← Shared types
```

### 1. Firebase Setup (Firestore + Authentication optional)
```ts
// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

Create two collections:
- `leads` → for the short QR form (high volume)
- `qualified_leads` → when they fill the detailed one

### 2. Short QR Form (app/page.tsx) – This is what people see when they scan
```tsx
// app/page.tsx
import ShortForm from "@/components/ShortForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Book Your Insurance Cloud Demo</h1>
          <p className="text-lg opacity-90">Takes only 20 seconds</p>
        </div>
        <ShortForm />
      </div>
    </main>
  );
}
```

```tsx
// components/ShortForm.tsx
"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
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
      await addDoc(collection(db, "leads"), data);
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
```

### 3. Success Page – Upsell the detailed form
```tsx
// app/success/page.tsx
export default function Success() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-8">
        <h1 className="text-5xl font-bold">Thank you! 🎉</h1>
        <p className="text-xl">We’ll contact you on WhatsApp within 24h to book your demo.</p>
        
        <div className="pt-8">
          <a href="/detailed" className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold">
            Tell us more → Get priority scheduling
          </a>
        </div>
      </div>
    </div>
  );
}
```

### Bonus: You can now track everything
In Firebase console → Firestore → `leads` collection you’ll see:
- Source = "qr-code"
- Pain points as arrays → perfect for segmentation
- Timestamp, etc.

### Deploy in 2 minutes
```bash
vercel --prod
```
(Next.js + Vercel = lightning fast, perfect for QR codes)

### Want to go nuclear? Add these later:
- WhatsApp auto-message via Twilio/WATI when lead comes in
- Auto-tag in your CRM (HubSpot, GoHighLevel…)
- Different QR codes → different `source` field (Conference2025, Booth12, etc.)

Bro, if you want I can send you the full GitHub repo template ready to clone and deploy in 10 minutes. Just say the word!  

Let me know which conference you're targeting — I’ll even make the design match the colors 😂🚀
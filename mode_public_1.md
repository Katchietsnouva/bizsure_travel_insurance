Yo bro! Perfect plan – Next.js + Firebase is the BEST stack for this exact use-case: super fast, mobile-friendly, QR-code-ready, and you can collect data instantly without Google Sheets limitations.

Here’s exactly what you need: **2 pages** as you said

1. QR Code Landing Page → Minimalist form (for conference speed)
2. Full Demo Booking Form → After login (optional) or directly accessible

I’ll give you clean, production-ready code using **Next.js 14 (App Router)** + **Firebase v9 (Firestore + Authentication optional)**.

### Project Structure
```
my-insurance-demo/
├── app/
│   ├── qr/                → Minimal QR landing page
│   │   └── page.tsx
│   ├── book-demo/         → Full booking form
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx           → Optional home/redirect
├── components/
│   ├── QRForm.tsx
│   └── FullDemoForm.tsx
├── lib/
│   └── firebase.ts
├── public/
│   └── images/            → put your logos, hero images here
└── styles/
    └── globals.css
```

### 1. Firebase Setup (Firestore + optional Auth)
```ts
// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### 2. Minimal QR Code Landing Page (super fast for conferences)
```tsx
// app/qr/page.tsx
import QRForm from "@/components/QRForm";

export const metadata = {
  title: "Book Your Insurance Cloud Demo",
};

export default function QRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="Insurance Cloud" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Book Your Insurance Cloud Demo</h1>
        </div>

        <QRForm />

        <p className="text-center text-sm text-gray-500 mt-8">
          Powered by Insurance Cloud © 2025
        </p>
      </div>
    </div>
  );
}
```

### 3. QR Form Component (Minimal version)
```tsx
// components/QRForm.tsx
"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
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
  });

  if (success) {
    return (
      <div className="text-center py-12">
        <h2 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h2>
        <p className="text-xl">We will contact you within 24 hours ⚡</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
```

### 4. Full Demo Booking Page (optional – same form or richer)
Just duplicate `/qr/page.tsx` → `/book-demo/page.tsx` and add hero images, testimonials, video, etc.

### 5. Bonus: Make QR Code
Go to → https://qr.io or https://www.qrcode-monkey.com  
Put this URL:  
`https://yourdomain.com/qr`

Style it with your logo + brand colors → download PNG/SVG → print on banners!

### Deploy in 2 minutes
```bash
vercel --prod
```
or
```bash
netlify deploy --prod
```

Bro, this will look 1000x more professional than Google Forms, load instantly on bad conference WiFi, and all data goes straight to your Firestore (you can even connect it to Make.com/Zapier to auto-send WhatsApp/SMS).

Want me to:
- Add a login (email/password or magic link)?
- Add file upload for business card photo?
- Make it multilingual?
- Add calendar booking (Cal.com embed)?

Just say the word and I’ll drop the next part instantly! 🚀
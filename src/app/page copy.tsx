
"use client";

import { useState } from "react";
import Image from "next/image"; // Optimized image handling
import { db } from "@/app/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { 
  FaUser, 
  FaPhone, 
  FaBuilding, 
  FaChartBar, 
  FaTools, 
  FaArrowRight, 
  FaShieldAlt, 
  FaMobileAlt, 
  FaHeadset,
  FaCheckCircle,
  FaQrcode,
  FaEnvelope
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function FullDemoForm() {
  const [loading, setLoading] = useState(false);
  const [currentSystem, setCurrentSystem] = useState("");
  const [showCurrentSystemInput, setShowCurrentSystemInput] = useState(false);
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const router = useRouter();

  const painPoints = [
    { id: "slow", label: "Slow quotations", icon: "⏱️" },
    { id: "renewals", label: "Renewals leakage", icon: "💰" },
    { id: "finance", label: "Finance errors", icon: "📊" },
    { id: "claims", label: "Claims delays", icon: "📄" },
    { id: "hard", label: "Hard-to-use system", icon: "🤯" },
    { id: "support", label: "Poor support", icon: "🎧" },
    { id: "mobile", label: "No mobile app", icon: "📱" },
  ];

  const handlePainPointChange = (pain: string) => {
    setSelectedPainPoints(prev =>
      prev.includes(pain)
        ? prev.filter(p => p !== pain)
        : [...prev, pain]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const data = {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      agencyName: formData.get("agencyName"),
      hasSystem: formData.get("hasSystem"),
      currentSystem: formData.get("currentSystem") || "None",
      painPoints: selectedPainPoints,
      otherPainPoint: formData.get("otherPainPoint") || null,
      additionalNotes: formData.get("additionalNotes") || null,
      preferredTime: formData.get("preferredTime") || null,
      createdAt: serverTimestamp(),
      source: "website-form",
      formVersion: "full",
    };

    try {
      await addDoc(collection(db, "insurance_demo_requests"), data);
      router.push("/success?step=full");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          
          {/* <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Insurance Cloud</span> Demo
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Stop losing renewals and start growing your agency. Join 500+ brokers upgrading their tech stack today.
          </p> */}

          <div className="text-center mb-12 bg-white p-8 rounded-3xl shadow-2xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Accepting New Agencies
          </div>
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-6 shadow-xl">
              <FaShieldAlt className="text-4xl text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Insurance Cloud </span>
              Demo
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Ready to stop the pain? Discover how our cloud platform can modernize your agency, boost efficiency, and maximize renewals.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: THE FORM (Span 8) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
              
              <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-10">
                
                {/* 1. Contact Info */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <FaUser size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">1. Who are you?</h2>
                  </div>
                  

  
<div className="grid md:grid-cols-2 gap-6">
  {/* Full Name */}
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700">Full Name</label>
    <div className="relative">
      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        required
        name="fullName"
        placeholder="John Doe"
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
      />
    </div>
  </div>

  {/* Phone (WhatsApp) */}
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700">Phone (WhatsApp)</label>
    <div className="relative">
      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        required
        type="tel"
        name="phone"
        placeholder="+254 700 000 000"
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
      />
    </div>
  </div>

  {/* Work Email */}
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700">Work Email</label>
    <div className="relative">
      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        required
        type="email"
        name="email"
        placeholder="john@agency.com"
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
      />
    </div>
  </div>

  {/* Agency Name */}
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700">Agency Name</label>
    <div className="relative">
      <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        required
        name="agencyName"
        placeholder="Doe Insurance Brokers"
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
      />
    </div>
  </div>
</div>
                </section>

                {/* 2. Current Status */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                      <FaChartBar size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">2.  Current Setup</h2>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 font-medium">Do you currently use a system?</p>
                    <div className="flex flex-wrap gap-4">
                      {["Yes", "No", "Not sure"].map((option) => (
                        <label key={option} className="relative group cursor-pointer">
                          <input 
                            type="radio" 
                            name="hasSystem" 
                            value={option}
                            className="peer sr-only"
                            onClick={() => {
                              if (option === "Yes") setShowCurrentSystemInput(true);
                              else { setShowCurrentSystemInput(false); setCurrentSystem(""); }
                            }}
                          />
                          <div className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 group-hover:border-blue-300">
                            {option}
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className={`transition-all duration-300 overflow-hidden ${showCurrentSystemInput ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <input 
                        name="currentSystem"
                        value={currentSystem}
                        onChange={(e) => setCurrentSystem(e.target.value)}
                        placeholder="Which system? (e.g. Turnkey, Legacy, Excel)"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
                      />
                    </div>
                  </div>
                </section>

                {/* 3. Pain Points */}
                <section className="space-y-6">
                  {/* <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                      <FaTools size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">What's holding you back?</h2>
                  </div> */}

                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6 flex items-center gap-3">
                      <FaTools className="text-rose-600 " />
                      3. Biggest Pain Point(s)
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Select all the challenges that apply to your current system/workflow or tha hold you back:
                    </p>


                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {painPoints.map((pain) => (
                      <div 
                        key={pain.id}
                        onClick={() => handlePainPointChange(pain.label)}
                        className={`cursor-pointer relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center gap-2 group
                          ${selectedPainPoints.includes(pain.label) 
                            ? "border-rose-500 bg-rose-50 text-rose-900 shadow-sm" 
                            : "border-slate-100 bg-slate-50 text-slate-600 hover:border-rose-200 hover:bg-white"}`}
                      >
                        <div className="text-2xl mb-1">{pain.icon}</div>
                        <span className="text-sm font-bold leading-tight">{pain.label}</span>
                        {selectedPainPoints.includes(pain.label) && (
                          <div className="absolute top-2 right-2 text-rose-500">
                            <FaCheckCircle />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <input name="otherPainPoint" placeholder="Any other issues? (Optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm" />
                </section>

                {/* 4. Details */}
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6 flex items-center gap-3">
                      <FaEnvelope className="text-blue-600" />
                      4. Demo Preference
                    </h2>
                  
                <section className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Preferred Time</label>
                    <select name="preferredTime" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-blue-500 outline-none">
                      <option value="">Select a time slot...</option>
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                      <option value="evening">Evening (5 PM - 7 PM)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Extra Notes</label>
                    <textarea name="additionalNotes" rows={1} placeholder="Anything else?" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none resize-none" />
                  </div>
                </section>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative overflow-hidden bg-slate-900 text-white font-bold py-5 rounded-2xl text-xl transition-all hover:scale-[1.01] hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    {loading ? "Booking..." : (
                      <>
                        {/* <span>Secure My Demo Slot</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" /> */}
                        <FaShieldAlt className="text-2xl" />
                        YES! Secure My Demo Slot Now
                        <FaArrowRight />

                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: BENEFITS & QR CODE (Span 4) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
            
            {/* 1. Benefits Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
              <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                <FaShieldAlt className="text-blue-500" />
                Why Agencies Switch
              </h3>
              <ul className="space-y-4">
                {[
                  { icon: "⚡", text: "90% Faster Quotations", sub: "Generate quotes in seconds" },
                  { icon: "📱", text: "Mobile App Included", sub: "Work from anywhere" },
                  { icon: "🔒", text: "Bank-Level Security", sub: "Your data is safe" },
                  { icon: "👥", text: "24/7 Local Support", sub: "We are here when you need us" },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-lg">{item.icon}</span>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{item.text}</p>
                      <p className="text-xs text-slate-500">{item.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. QR CODE CARD (Requested) */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm">
                  <FaQrcode className="text-2xl text-cyan-400" />
                </div>
                
                <h3 className="text-xl font-bold">On the go?</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Scan this code to open the short version of this form on your mobile phone.
                </p>

                {/* QR Image Container */}
                <div className="p-3 bg-white rounded-xl shadow-lg mt-2">
                  <div className="relative w-40 h-40">
                     {/* Ensure public/qr_code.png exists in your project */}
                    <Image 
                      src="/qr_code.png" 
                      alt="Scan to book demo" 
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <a 
                  href="https://book-your-insurance-cloud-demo.vercel.app/" 
                  target="_blank"
                  className="text-xs text-cyan-400 hover:text-cyan-300 underline mt-2 break-all"
                >
                  book-your-insurance-cloud-demo.vercel.app
                </a>
              </div>
            </div>

            {/* 3. Trust Badge */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-center gap-4">
               <FaHeadset className="text-3xl text-blue-600" />
               <div>
                 <p className="font-bold text-slate-800 text-sm">Have Questions?</p>
                 <p className="text-xs text-slate-600">Call our sales team directly at <span className="font-semibold">+2547 1891 7211</span></p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
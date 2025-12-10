// app/qr/page.tsx
'use client';

import { FaQrcode, FaExternalLinkAlt, FaCopy, FaShareAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function QRPage() {
    const [copied, setCopied] = useState(false);

    const url = 'https://book-your-insurance-cloud-demo.vercel.app';

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareLink = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Insurance Cloud Demo',
                    url: url,
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        } else {
            copyToClipboard();
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 md:p-8 lg:p-12">
            {/* Responsive container */}
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl  ">
                <div className="bg-gradient-to-br from-zinc-900 via-slate-800 to-zinc-900 rounded-3xl p-8 md:p-12 lg:p-16 text-white shadow-2xl border border-zinc-800">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8 lg:mb-12">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <FaQrcode className="text-2xl md:text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">Scan to View This UI</h3>
                            <p className="text-base md:text-lg opacity-80 mt-1">Share our demo booking form</p>
                        </div>
                    </div>

                    {/* QR Code – scales beautifully */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl mb-8 flex justify-center">
                        <div className="relative">
                            <img
                                src="/qr_code.png"
                                alt="QR Code for Insurance Cloud Demo"
                                className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] rounded-xl shadow-2xl"
                            />
                            {/* Neon corner dots – also scale */}
                            <div className="absolute -top-3 -left-3 w-6 h-6 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/70"></div>
                            <div className="absolute -top-3 -right-3 w-6 h-6 bg-teal-500 rounded-full shadow-lg shadow-teal-500/70"></div>
                            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-teal-500 rounded-full shadow-lg shadow-teal-500/70"></div>
                            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/70"></div>
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="space-y-5">
                        <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-sm md:text-base">
                            <span className="truncate flex-1 mr-3 font-mono">
                                {url}
                            </span>
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg transition backdrop-blur-sm whitespace-nowrap"
                            >
                                <FaExternalLinkAlt className="text-sm" />
                                Visit
                            </a>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={copyToClipboard}
                                className="flex-1 flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 py-4 rounded-xl transition backdrop-blur-sm border border-white/10 text-base md:text-lg font-medium"
                            >
                                <FaCopy className="text-lg" />
                                {copied ? "Copied!" : "Copy Link"}
                            </button>
                            <button
                                onClick={shareLink}
                                className="flex-1 flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 py-4 rounded-xl transition backdrop-blur-sm border border-white/10 text-base md:text-lg font-medium"
                            >
                                <FaShareAlt className="text-lg" />
                                Share
                            </button>
                        </div>

                        <div className="text-center text-sm md:text-base opacity-70 pt-4">
                            Scan with your phone camera or QR scanner app
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
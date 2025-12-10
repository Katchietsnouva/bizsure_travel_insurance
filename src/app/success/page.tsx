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
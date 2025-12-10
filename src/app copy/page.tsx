import ShortForm from "@/app/components/ShortForm";

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
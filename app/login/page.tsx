"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Vet App Login</h1>
      <button
        onClick={() => router.push("/search")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next →
      </button>
    </div>
  );
}

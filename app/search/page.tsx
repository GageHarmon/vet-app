"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/animal?name=${searchTerm}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Search for an Animal</h1>
      <input
        type="text"
        placeholder="Enter animal name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-64 mb-4"
      />
      <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">
        Search 🔍
      </button>

      {/* ✅ Add Button to Go to Add Dog Page */}
      <button onClick={() => router.push("/add")} className="px-4 py-2 bg-green-500 text-white rounded mt-4">
        + Add a New Dog 🐶
      </button>
    </div>
  );
}

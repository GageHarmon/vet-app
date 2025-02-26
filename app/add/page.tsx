"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddDogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    owner_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/animals/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        species: formData.species,
        age: parseInt(formData.age),
        owner_name: formData.owner_name,
      }),
    });

    if (response.ok) {
      router.push("/search"); // ✅ Redirect to search page after adding
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add a New Dog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Dog's Name" onChange={handleChange} className="border p-2 rounded w-full" required />
        <input type="text" name="species" placeholder="Species" onChange={handleChange} className="border p-2 rounded w-full" required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} className="border p-2 rounded w-full" required />
        <input type="text" name="owner_name" placeholder="Owner's Name" onChange={handleChange} className="border p-2 rounded w-full" required />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded w-full">
          Add Dog 🐶
        </button>
      </form>

      {/* Back Button */}
      <button onClick={() => router.push("/search")} className="px-4 py-2 bg-gray-500 text-white rounded w-full mt-4">
        ← Back to Search
      </button>
    </div>
  );
}

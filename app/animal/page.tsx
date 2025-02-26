"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Animal = {
  id: number;
  name: string;
  species: string;
  age: number;
  owner_name: string;
  photo?: string;
};

export default function AnimalPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const animalName = searchParams.get("name");
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  // ✅ Fetch animal details
  const fetchAnimalDetails = () => {
    if (animalName) {
      fetch("http://127.0.0.1:8000/animals/")
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched Animals:", data);  // ✅ Debugging log
          const foundAnimal = data.find((a: Animal) => a.name.toLowerCase() === animalName.toLowerCase());

          if (foundAnimal) {
            setAnimal({
              ...foundAnimal,
              photo: foundAnimal.photo || "https://via.placeholder.com/150", // ✅ Prevents missing images
            });
          } else {
            console.warn("Animal not found:", animalName);
            setAnimal(null);
          }

          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch Error:", err);  // ✅ Logs fetch errors
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchAnimalDetails();
  }, [animalName]);

  // ✅ Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // ✅ Handle file upload & refresh the data
  const handleUpload = async () => {
    if (!file || !animal) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`http://127.0.0.1:8000/animals/${animal.id}/upload-photo/`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setAnimal({ ...animal, photo: data.photo_url }); // ✅ Update photo without full page refresh
      setFile(null);
      fetchAnimalDetails(); // ✅ Ensure latest data is loaded
    }
  };

  if (loading) return <p>Loading animal...</p>;
  if (!animal) return <p>Animal not found.</p>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{animal.name}'s Details</h1>

      {/* ✅ Display Animal Photo */}
      <div className="mb-4">
        <img
          src={animal.photo}
          alt={animal.name}
          className="w-32 h-32 object-cover rounded-full mx-auto"
        />
      </div>

      {/* ✅ Show Animal Details */}
      <p><strong>Species:</strong> {animal.species}</p>
      <p><strong>Age:</strong> {animal.age}</p>
      <p><strong>Owner:</strong> {animal.owner_name}</p>

      {/* ✅ Upload Image */}
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded">
        Upload Photo 📷
      </button>

      {/* ✅ Back to Search Button */}
      <button
        onClick={() => router.push("/search")}
        className="px-4 py-2 bg-gray-500 text-white rounded w-full mt-4"
      >
        ← Back to Search
      </button>
    </div>
  );
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Redirects to login page
  }, []);

  return <p>Redirecting...</p>;
}

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/products");
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}
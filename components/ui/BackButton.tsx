"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/products");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="
        fixed
        left-8
        top-28
        z-40
        inline-flex
        cursor-pointer
        items-center
        gap-2
        rounded-full
        border
        border-zinc-200
        bg-white/90
        px-5
        py-3
        text-sm
        font-medium
        text-zinc-700
        shadow-lg
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-x-1
        hover:border-zinc-900
        hover:bg-zinc-900
        hover:text-white
      "
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
}
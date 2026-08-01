"use client";

import { useRouter } from "next/navigation";

export function useSmartBack() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return handleBack;
}

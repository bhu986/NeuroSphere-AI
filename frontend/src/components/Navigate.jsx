"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Navigate({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [to, router]);

  return null;
}

export default Navigate;

"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}
function CustomImage({ alt, src, className }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={400}
      className={cn(
        "object-cover duration-700 ease-in-out transition-all scale-100 blur-0 grayscale-0",
        loading && "scale-105 blur-2xl grayscale",
        className
      )}
      onLoad={() => setLoading(false)}
      style={{ clipPath: "inset(0 0 30px 0)" }}
    />
  );
}

export default CustomImage;

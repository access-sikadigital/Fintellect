"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * The hero footage, filling whatever container it is given.
 *
 * The footage is cut to the house mask's own 125:130 ratio, so `object-cover`
 * has nothing left to crop and the framing is exactly what was intended.
 *
 * Renders the poster still until a video is actually present, so a missing
 * file degrades to a photograph rather than a black rectangle. Once
 * `/brand/video/hero.mp4` exists it plays automatically, muted and looping.
 * Visitors who ask for reduced motion never get the video at all.
 */
export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    fetch("/brand/video/hero.mp4", { method: "HEAD" })
      .then((r) => {
        if (!cancelled && r.ok) setShowVideo(true);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !showVideo) return;
    v.play().catch(() => setShowVideo(false));
  }, [showVideo]);

  return (
    <>
      <Image
        src="/brand/photography/hero-poster.webp"
        alt="Parents forming a roof shape with their arms over their child"
        fill
        priority
        sizes="(min-width:1024px) 30rem, 100vw"
        className="object-cover"
      />

      {showVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/brand/video/hero.webm" type="video/webm" />
          <source src="/brand/video/hero.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}

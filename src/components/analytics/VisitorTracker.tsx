"use client";
import { useEffect } from "react";

const EXCLUDED_PATHS = ["/admin", "/for/docs"];

export function VisitorTracker() {
  useEffect(() => {
    const { pathname } = window.location;
    if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return;

    const payload = JSON.stringify({
      pathname,
      referrer: document.referrer || "",
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  }, []);

  return null;
}

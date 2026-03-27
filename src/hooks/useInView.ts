import { useState, useEffect, type RefObject } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView(ref: RefObject<Element | null>, options: UseInViewOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = false } = options;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return inView;
}

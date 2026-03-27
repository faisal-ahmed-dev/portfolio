import { useState, useEffect } from "react";

interface Options {
  duration?: number;
  decimals?: number;
}

export function useAnimatedCounter(target: number, options: Options = {}) {
  const { duration = 1500, decimals = 0 } = options;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) { setCount(0); return; }

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(parseFloat((startValue + (target - startValue) * eased).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, decimals]);

  return decimals > 0 ? count.toFixed(decimals) : Math.round(count);
}

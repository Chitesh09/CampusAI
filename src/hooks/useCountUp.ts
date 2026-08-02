import { useState, useEffect } from 'react';

export function useCountUp(endValue: number, duration: number = 1000, startDelay: number = 400): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out quad calculation
        const easeOutProgress = 1 - (1 - progress) * (1 - progress);
        setCount(Math.floor(easeOutProgress * endValue));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, startDelay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [endValue, duration, startDelay]);

  return count;
}

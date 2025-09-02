import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import React from "react";
export const Counter = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true });

  useEffect(() => {
    const target = Number(end); // ✅ make sure it's a number
    if (isInView && !isNaN(target)) {
      let start = 0;
      const increment = target / (duration * 60); // 60 frames/sec
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.round(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={counterRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

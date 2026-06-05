'use client';

import { useEffect, useRef, useState } from 'react';

interface ImpactCounterProps {
  number: number;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
}

export function ImpactCounter({
  number,
  label,
  suffix = '',
  icon,
}: ImpactCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let currentCount = 0;
    const increment = Math.ceil(number / 50);
    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= number) {
        setCount(number);
        clearInterval(interval);
      } else {
        setCount(currentCount);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible, number]);

  return (
    <div ref={ref} className="text-left font-heading">
      {icon && <div className="mb-4 text-4xl text-cinnamon">{icon}</div>}
      <div className="text-5xl sm:text-6xl font-black text-espresso tracking-tighter tabular-nums">
        {count.toLocaleString()}
        <span className="text-cinnamon ml-1">{suffix}</span>
      </div>
      {label && <p className="text-xs font-bold uppercase tracking-[0.2em] text-espresso/40 mt-2">{label}</p>}
    </div>
  );
}

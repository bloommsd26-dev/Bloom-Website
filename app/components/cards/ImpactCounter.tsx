'use client';

import { useEffect, useRef, useState } from 'react';

interface ImpactCounterProps {
  number: number;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
}

export function ImpactCounter({ number, label, suffix = '', icon }: ImpactCounterProps) {
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
    <div ref={ref} className="text-center">
      {icon && <div className="mb-4 text-4xl flex justify-center">{icon}</div>}
      <div className="font-heading text-4xl sm:text-5xl font-bold text-primary-600 mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-neutral-600 font-medium">{label}</p>
    </div>
  );
}

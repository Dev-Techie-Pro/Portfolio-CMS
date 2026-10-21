'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap/client';
import { motionDuration } from '@/lib/motion/duration';

type Fmt = 'int' | 'compact' | 'pct1';

const formatters: Record<Fmt, (n: number) => string> = {
  int: (n) => Math.round(n).toLocaleString(),
  compact: (n) =>
    new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n),
  pct1: (n) => `${(n * 100).toFixed(1)}%`,
};

type CountUpProps = {
  value: number;
  fmt?: Fmt;
  fromZero?: boolean;
  delay?: number;
  className?: string;
};

export function CountUp({
  value,
  fmt = 'int',
  fromZero = true,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const proxy = { n: fromZero ? 0 : value };
    const tween = gsap.to(proxy, {
      n: value,
      duration: motionDuration(1.4),
      delay: motionDuration(delay),
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = formatters[fmt](proxy.n);
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, fmt, fromZero, delay]);

  return (
    <span
      ref={ref}
      className={`num ${className ?? ''}`.trim()}
      data-count={value}
      data-fmt={fmt}
    />
  );
}

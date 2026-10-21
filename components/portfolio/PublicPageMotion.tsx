'use client';

import gsap from 'gsap';
import { fadeSlide, fadeUp } from '@/lib/motion/presets';
import { isNarrowViewport, motionDuration } from '@/lib/motion/duration';
import { usePageEnter } from '@/components/motion/usePageEnter';

type PublicPageMotionProps = {
  children: React.ReactNode;
  routeKey: string;
};

/**
 * Route-level enter motion for public portfolio pages.
 * Scoped to `[data-portfolio-page]` content; does not replace scroll-reveal scripts.
 */
export function PublicPageMotion({ children, routeKey }: PublicPageMotionProps) {
  const rootRef = usePageEnter(
    (root) => {
      const tl = gsap.timeline();
      const narrow = isNarrowViewport(900);
      const nav = root.querySelector('.navbar');
      if (nav) {
        tl.add(
          fadeSlide(nav.querySelectorAll('.nav-link, .nav-cta, .nav-logo'), {
            y: narrow ? 6 : 12,
            stagger: narrow ? 0.02 : 0.04,
            duration: 0.5,
          }),
          0,
        );
      }

      const sections = root.querySelectorAll('main section, .hero-v2, .page-hero, .ch-hero');
      tl.add(
        fadeUp(sections, {
          y: narrow ? 20 : 34,
          stagger: narrow ? 0.04 : 0.07,
        }),
        0.06,
      );

      const cards = root.querySelectorAll(
        '.project-card, .blog-card, .skill-card, .exp-card, .testimonial-card, .pg-card',
      );
      if (cards.length) {
        tl.add(fadeUp(cards, { stagger: 0.05, delay: 0.12 }), 0.12);
      }

      const meters = root.querySelectorAll<HTMLElement>('.skill-bar-fill, .meter__fill[data-fill]');
      meters.forEach((el, i) => {
        const target = Number(el.dataset.fill ?? el.style.getPropertyValue('--fill')) || 1;
        gsap.set(el, { transformOrigin: '0 50%', scaleX: 0 });
        tl.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: target,
            duration: motionDuration(0.75),
            ease: 'power3.out',
            clearProps: 'transform',
          },
          0.35 + i * 0.05,
        );
      });

      return tl;
    },
    [routeKey],
  );

  return (
    <div className="view app" ref={rootRef}>
      {children}
    </div>
  );
}

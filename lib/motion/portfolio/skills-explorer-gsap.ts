import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const RING_LEN = 263.9;

export type SkillsExplorerGsapApi = {
  root: HTMLElement;
  pinEl: HTMLElement;
  railwrap: HTMLElement;
  tabs: HTMLButtonElement[];
  panel: HTMLElement;
  title: HTMLElement;
  desc: HTMLElement;
  arc: SVGCircleElement;
  num: HTMLElement;
  ring: HTMLElement;
  chips: HTMLElement;
  count: HTMLElement;
  step: HTMLElement;
  categoryCount: number;
  prefersReduced: () => boolean;
  show: (index: number) => void;
  paintRing: (pct: number) => void;
  splitTitle: (el: HTMLElement, text: string) => void;
};

type Driver = {
  kill: () => void;
  goTo: (index: number) => void;
};

const drivers = new WeakMap<HTMLElement, Driver>();

export function teardownSkillsExplorerGsap(root: HTMLElement | null | undefined) {
  if (!root) return;
  drivers.get(root)?.kill();
  drivers.delete(root);
}

export function mountSkillsExplorerGsap(api: SkillsExplorerGsapApi): Driver | null {
  teardownSkillsExplorerGsap(api.root);

  const N = api.categoryCount;
  if (!N) return null;

  const triggers: ScrollTrigger[] = [];
  const kill = () => {
    triggers.forEach((t) => t.kill());
    triggers.length = 0;
    gsap.killTweensOf(api.arc);
    gsap.killTweensOf(api.num);
    gsap.killTweensOf(api.tabs.map((t) => t.querySelector('.skills-explorer__tab-bar i')));
  };

  let cur = -1;
  let tl: gsap.core.Timeline | null = null;
  let ready = false;
  let jump: number | null = null;
  let st: ScrollTrigger | null = null;
  const gauge = { v: 0 };

  const paint = () => {
    api.paintRing(gauge.v);
    api.num.textContent = `${Math.round(gauge.v)}%`;
  };

  const show = (i: number) => {
    if (i === cur || i < 0 || i >= N) return;
    const dir = i > cur ? 1 : -1;
    const first = cur < 0;
    cur = i;
    api.show(i);

    api.tabs.forEach((t, j) => {
      t.setAttribute('aria-selected', j === i ? 'true' : 'false');
      t.tabIndex = j === i ? 0 : -1;
    });
    api.panel.setAttribute('aria-labelledby', api.tabs[i]?.id || '');
    api.tabs[i]?.scrollIntoView?.({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });

    const pct = Number(api.tabs[i]?.dataset.pct || 0);
    api.ring.setAttribute('aria-label', `${pct} percent proficiency`);
    gsap.to(gauge, {
      v: pct,
      duration: 1.2,
      ease: 'power3.out',
      overwrite: true,
      onUpdate: paint,
    });
    const bar = api.tabs[i]?.querySelector('.skills-explorer__tab-bar i');
    if (bar) {
      gsap.fromTo(bar, { width: 0 }, { width: `${pct}%`, duration: 0.9, ease: 'power3.out' });
    }

    tl?.kill();
    const render = () => {
      const catLabel = api.title.dataset.plainTitle || '';
      api.splitTitle(api.title, catLabel);
      gsap.set([api.title, api.desc], { autoAlpha: 1, y: 0 });
      tl = gsap.timeline();
      tl.fromTo(
        api.title.querySelectorAll('.skills-explorer__w > span'),
        { yPercent: 115 * dir },
        { yPercent: 0, duration: 0.65, stagger: 0.08, ease: 'power4.out' },
      )
        .fromTo(
          api.desc,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          0.1,
        )
        .fromTo(
          api.chips.children,
          { autoAlpha: 0, y: 30 * dir, scale: 0.9 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.05,
            ease: 'back.out(1.5)',
            clearProps: 'all',
          },
          0.15,
        );
    };

    if (first) {
      render();
      return;
    }
    tl = gsap.to([api.title, api.desc, ...api.chips.children], {
      autoAlpha: 0,
      y: -16 * dir,
      duration: 0.2,
      stagger: 0.012,
      ease: 'power2.in',
      onComplete: render,
    });
  };

  const goTo = (i: number) => {
    if (api.prefersReduced() || !st) {
      show(i);
      return;
    }
    jump = i;
    show(i);
    gsap.to(window, {
      scrollTo: {
        y: st.start + ((i + 0.5) / N) * (st.end - st.start),
        autoKill: true,
      },
      duration: 0.9,
      ease: 'power2.inOut',
      overwrite: true,
      onComplete: () => {
        jump = null;
      },
      onInterrupt: () => {
        jump = null;
      },
    });
  };

  api.tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => goTo(i));
    tab.addEventListener('keydown', (e) => {
      const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (k === undefined) return;
      e.preventDefault();
      const j = (i + k + N) % N;
      goTo(j);
      api.tabs[j]?.focus();
    });
  });

  const hover = (y: number) => (e: MouseEvent) => {
    const c = (e.target as HTMLElement | null)?.closest('.skills-explorer__chip');
    if (c && !c.contains(e.relatedTarget as Node | null)) {
      gsap.to(c, { y, duration: 0.25, overwrite: 'auto' });
    }
  };
  api.chips.addEventListener('mouseover', hover(-3));
  api.chips.addEventListener('mouseout', hover(0));

  if (api.prefersReduced()) {
    ready = true;
    show(0);
    const driver: Driver = { kill, goTo };
    drivers.set(api.root, driver);
    return driver;
  }

  const end = () => `+=${Math.round(window.innerHeight * N * (window.innerWidth < 821 ? 0.7 : 0.85))}`;

  st = ScrollTrigger.create({
    trigger: api.pinEl,
    start: 'top top',
    end,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      if (!ready || jump !== null) return;
      show(Math.min(N - 1, Math.floor(self.progress * N)));
    },
  });
  triggers.push(st);

  const railTween = gsap.to(api.railwrap, {
    '--p': 1,
    ease: 'none',
    scrollTrigger: {
      trigger: api.pinEl,
      start: 'top top',
      end,
      scrub: 0.4,
      invalidateOnRefresh: true,
    },
  });
  if (railTween.scrollTrigger) triggers.push(railTween.scrollTrigger);

  gsap.set(api.tabs, { autoAlpha: 0, x: -24 });
  gsap.set(api.panel, { autoAlpha: 0 });

  const intro = gsap.timeline({
    scrollTrigger: { trigger: api.pinEl, start: 'top 75%', once: true },
  });
  if (intro.scrollTrigger) triggers.push(intro.scrollTrigger);
  intro
    .to(api.tabs, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' })
    .fromTo(
      api.panel,
      { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' },
      {
        autoAlpha: 1,
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'clipPath',
      },
      '-=0.4',
    )
    .add(() => {
      ready = true;
      show(0);
    }, '-=0.5');

  const driver: Driver = { kill, goTo };
  drivers.set(api.root, driver);
  return driver;
}

export function paintSkillsExplorerRing(arc: SVGCircleElement, pct: number) {
  arc.style.strokeDasharray = String(RING_LEN);
  arc.style.strokeDashoffset = String(RING_LEN * (1 - pct / 100));
}

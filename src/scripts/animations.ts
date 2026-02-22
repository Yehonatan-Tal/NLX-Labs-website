import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHeroParallax } from "./hero-parallax";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

export function initAnimations(): void {
  if (prefersReducedMotion) {
    gsap.set(
      "[data-animate], [data-hero-headline], [data-hero-subheadline], [data-hero-ctas], [data-animate='stagger-cards'] > *",
      { opacity: 1, y: 0, x: 0 }
    );
    return;
  }

  initHeroEntrance();
  initHeroParallax();
  initSectionHeadings();
  initCardGrids();
  initFadeParagraphs();
  initNavScroll();
}

function initHeroEntrance(): void {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    "[data-hero-headline]",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 }
  )
    .fromTo(
      "[data-hero-subheadline]",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.3"
    )
    .fromTo(
      "[data-hero-ctas]",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.25"
    );
}

function initSectionHeadings(): void {
  gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      }
    );
  });
}

function initCardGrids(): void {
  gsap.utils
    .toArray<HTMLElement>('[data-animate="stagger-cards"]')
    .forEach((container) => {
      const cards = container.children;
      gsap.fromTo(
        cards,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
}

function initFadeParagraphs(): void {
  gsap.utils
    .toArray<HTMLElement>('[data-animate="fade-in"]')
    .forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
}

function initNavScroll(): void {
  const nav = document.getElementById("site-nav");
  if (!nav) return;

  ScrollTrigger.create({
    start: "top -50",
    onUpdate: (self) => {
      if (self.direction === 1 && self.scroll() > 50) {
        nav.classList.add("nav-scrolled");
      }
      if (self.scroll() <= 50) {
        nav.classList.remove("nav-scrolled");
      }
    },
  });
}

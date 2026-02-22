/**
 * Mouse-driven parallax depth effect for the hero section.
 * Two layers move at different speeds to create a 3D illusion:
 * - Back: ambient glow (slow)
 * - Mid: background image with 3D tilt (medium)
 */

const LERP_FACTOR = 0.06;
const TRANSLATE_BACK = 8;
const TRANSLATE_MID = 15;
const TILT_DEG = 2.5;

let animFrameId: number | null = null;
let currentX = 0.5;
let currentY = 0.5;
let targetX = 0.5;
let targetY = 0.5;
let isActive = false;

let glowEl: HTMLElement | null = null;
let bgEl: HTMLElement | null = null;

function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}

function applyTransforms(): void {
  const dx = currentX - 0.5;
  const dy = currentY - 0.5;

  if (glowEl) {
    glowEl.style.transform = `translate(${dx * TRANSLATE_BACK * 2}px, ${dy * TRANSLATE_BACK * 2}px)`;
  }

  if (bgEl) {
    const rotateY = dx * TILT_DEG * 2;
    const rotateX = -dy * TILT_DEG * 2;
    bgEl.style.transform = `perspective(1200px) translate(${dx * TRANSLATE_MID * 2}px, ${dy * TRANSLATE_MID * 2}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  }
}

function tick(): void {
  currentX = lerp(currentX, targetX, LERP_FACTOR);
  currentY = lerp(currentY, targetY, LERP_FACTOR);

  applyTransforms();

  // Stop the loop once converged (within sub-pixel threshold)
  const settled =
    Math.abs(currentX - targetX) < 0.0001 &&
    Math.abs(currentY - targetY) < 0.0001;

  if (settled && !isActive) {
    currentX = targetX;
    currentY = targetY;
    applyTransforms();
    animFrameId = null;
    return;
  }

  animFrameId = requestAnimationFrame(tick);
}

function startLoop(): void {
  if (animFrameId === null) {
    animFrameId = requestAnimationFrame(tick);
  }
}

function onMouseMove(e: MouseEvent): void {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const rect = hero.getBoundingClientRect();
  targetX = (e.clientX - rect.left) / rect.width;
  targetY = (e.clientY - rect.top) / rect.height;

  // Clamp to 0–1
  targetX = Math.max(0, Math.min(1, targetX));
  targetY = Math.max(0, Math.min(1, targetY));

  isActive = true;
  startLoop();
}

function onMouseLeave(): void {
  targetX = 0.5;
  targetY = 0.5;
  isActive = false;
  startLoop();
}

export function initHeroParallax(): void {
  const hero = document.getElementById("hero");
  glowEl = document.getElementById("hero-parallax-glow");
  bgEl = document.getElementById("hero-parallax-bg");

  if (!hero || !bgEl) return;

  hero.addEventListener("mousemove", onMouseMove);
  hero.addEventListener("mouseleave", onMouseLeave);
}

export function destroyHeroParallax(): void {
  const hero = document.getElementById("hero");
  if (hero) {
    hero.removeEventListener("mousemove", onMouseMove);
    hero.removeEventListener("mouseleave", onMouseLeave);
  }

  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }

  // Reset transforms
  if (glowEl) glowEl.style.transform = "";
  if (bgEl) bgEl.style.transform = "";

  glowEl = null;
  bgEl = null;
  currentX = 0.5;
  currentY = 0.5;
  targetX = 0.5;
  targetY = 0.5;
  isActive = false;
}

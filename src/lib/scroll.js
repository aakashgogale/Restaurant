import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const reduceMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// easeOutQuint, the CSS cubic-bezier(0.22, 1, 0.36, 1) used across the site
export const EASE = "power4.out";

let lenis = null;

// One Lenis instance, driven by GSAP's ticker so ScrollTrigger and smooth scroll share a frame.
export function initScroll() {
  if (reduceMotion || lenis) return lenis;
  lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 5) });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function scrollToId(id) {
  const el = id === "top" ? 0 : document.getElementById(id);
  if (el === null) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.4 });
  else if (el === 0) window.scrollTo({ top: 0 });
  else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function refreshTriggers() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/**
 * Scroll-driven reveals, declared in markup:
 *   [data-reveal]       fade + rise
 *   [data-lines]        each .line-inner slides up from its mask
 *   [data-mask]         image wipes in using transforms only (inner up, counter down)
 *   [data-parallax="6"] yPercent drift while the parent crosses the viewport
 * Everything animates once.
 */
export function setupReveals(root) {
  const mm = gsap.matchMedia(root);
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.utils.toArray("[data-lines]", root).forEach((el) => {
      gsap.from(el.querySelectorAll(".line-inner"), {
        yPercent: 110,
        duration: 1.1,
        ease: EASE,
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray("[data-reveal]", root).forEach((el) => {
      // opacity (not autoAlpha) so unrevealed controls stay keyboard-focusable
      gsap.from(el, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: EASE,
        delay: Number(el.dataset.reveal) || 0,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    gsap.utils.toArray("[data-mask]", root).forEach((el) => {
      const inner = el.querySelector("[data-mask-inner]");
      const counter = el.querySelector("[data-mask-counter]");
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } })
        .from(inner, { yPercent: 100, duration: 1.3, ease: "power4.inOut" })
        .from(counter, { yPercent: -100, scale: 1.12, duration: 1.3, ease: "power4.inOut" }, 0);
    });

    gsap.utils.toArray("[data-parallax]", root).forEach((el) => {
      const amount = Number(el.dataset.parallax) || 6;
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
  });
  return mm;
}

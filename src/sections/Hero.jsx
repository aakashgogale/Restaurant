import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { EASE, reduceMotion } from "../lib/scroll";
import { IMG, CONTACT } from "../data/content";
import { Img, Stars } from "../components/ui";

export default function Hero({ ready }) {
  const { t } = useI18n();
  const root = useRef(null);

  // Hide hero pieces before first paint so the intro can play once the loader lifts.
  useLayoutEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-h-line]", { yPercent: 110 });
      gsap.set("[data-h-fade]", { opacity: 0, y: 16 });
      gsap.set("[data-h-img]", { scale: 1.08 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!ready || reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: EASE } })
        .to("[data-h-img]", { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
        .to("[data-h-line]", { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.1)
        .to("[data-h-fade]", { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.45);

      // Gentle drift as the hero scrolls away (max 10%).
      gsap.to("[data-h-media]", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.kill();
  }, [ready]);

  const lines = t("hero.lines");

  return (
    <section id="top" ref={root} className="sec-dark relative flex min-h-[640px] h-svh overflow-hidden">
      <div data-h-media className="absolute inset-0">
        <div data-h-img className="absolute inset-0">
          <Img id={IMG.hero} alt={t("hero.alt")} priority />
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/60" />

      <div className="container-x relative flex w-full flex-col justify-end pb-10 pt-32 md:pb-12">
        <p data-h-fade className="t-label mb-6 text-brass md:mb-8">
          {t("hero.place")}
        </p>

        <h1 className="t-display max-w-[13ch]">
          {lines.map((line, i) => (
            <span key={i} className="line">
              <span data-h-line className="line-inner">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <p data-h-fade className="t-body max-w-md text-muted">
            {t("hero.sub")}
          </p>
          <div data-h-fade className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#reserve" className="btn btn-solid">
              {t("hero.reserve")}
              <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
            </a>
            <a href="#menu" className="link link-under t-label py-3">
              {t("hero.menu")}
            </a>
          </div>
        </div>

        <div data-h-fade className="mt-12 flex items-center justify-between border-t border-hair pt-6 md:mt-16">
          <a
            href={CONTACT.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm"
          >
            <span className="font-serif text-2xl leading-none">4.7</span>
            <Stars value={4.7} className="text-brass" />
            <span className="text-muted transition-colors duration-500 group-hover:text-ivory">
              {t("hero.rating")} · {t("hero.reviews")}
            </span>
          </a>
          <span className="t-label hidden items-center gap-3 text-muted md:flex">
            {t("hero.scroll")}
            <span aria-hidden="true" className="block h-8 w-px bg-brass/60" />
          </span>
        </div>
      </div>
    </section>
  );
}

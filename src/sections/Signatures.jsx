import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { SIGNATURES } from "../data/content";
import { Figure, Label, Lines } from "../components/ui";

export default function Signatures() {
  const { t } = useI18n();
  const track = useRef(null);
  const bar = useRef(null);

  // Progress hairline + mouse drag-to-scroll (touch uses native scrolling).
  useEffect(() => {
    const el = track.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? Math.abs(el.scrollLeft) / max : 0;
      bar.current.style.transform = `scaleX(${0.12 + p * 0.88})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    let moved = false;
    const down = (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const move = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 4) {
        moved = true;
        el.style.scrollSnapType = "none";
        el.style.cursor = "grabbing";
      }
      if (moved) el.scrollLeft = startLeft - dx;
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      el.style.cursor = "";
      el.style.scrollSnapType = "";
    };
    // Swallow the click that ends a drag so cards don't activate.
    const click = (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("click", click, true);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("click", click, true);
    };
  }, []);

  const step = (dir) => {
    const el = track.current;
    const card = el.querySelector("li");
    const rtl = getComputedStyle(el).direction === "rtl";
    const amount = (card?.offsetWidth ?? 320) + 24;
    el.scrollBy({ left: dir * amount * (rtl ? -1 : 1), behavior: "smooth" });
  };

  return (
    <section id="signatures" aria-labelledby="sig-title" className="sec-light section overflow-hidden">
      <div className="container-x flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Label>{t("sig.label")}</Label>
          <Lines id="sig-title" lines={t("sig.lines")} className="t-h2 mt-8" />
        </div>
        <div data-reveal className="flex items-center gap-6">
          <span className="t-label hidden text-muted md:inline">{t("sig.hint")}</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => step(-1)} className="btn btn-icon" aria-label={t("sig.prev")}>
              <ArrowLeft size={18} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
            </button>
            <button type="button" onClick={() => step(1)} className="btn btn-icon" aria-label={t("sig.next")}>
              <ArrowRight size={18} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={track}
        data-lenis-prevent-horizontal
        className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto track-edge md:cursor-grab"
      >
        {SIGNATURES.map((dish, n) => (
          <li key={dish.name} data-reveal={(n % 4) * 0.08} className="w-[78vw] flex-none snap-start sm:w-[44vw] lg:w-[360px]">
            <article className="zoom">
              <Figure id={dish.img} alt={dish.name} sizes="(min-width: 1024px) 360px, (min-width: 640px) 44vw, 78vw" />
              <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-hair pb-4">
                <span className="t-label text-accent">{String(n + 1).padStart(2, "0")}</span>
                <span className="tabular-nums text-sm text-muted">AED {dish.price}</span>
              </div>
              <h3 className="t-h3 mt-4">{dish.name}</h3>
              <p className="mt-2 text-sm text-muted">{dish.desc}</p>
            </article>
          </li>
        ))}
      </ul>

      <div className="container-x mt-12">
        <div className="h-px w-full bg-hair">
          <div ref={bar} className="h-px origin-left bg-current transition-transform duration-300 rtl:origin-right" style={{ transform: "scaleX(0.12)" }} />
        </div>
      </div>
    </section>
  );
}

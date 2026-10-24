import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { lockScroll } from "../lib/scroll";
import { GALLERY } from "../data/content";
import { Img, Label, Lines } from "../components/ui";

const full = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=max&w=1920&q=75`;

export default function Gallery() {
  const { t } = useI18n();
  const [index, setIndex] = useState(null);
  const opener = useRef(null);
  const closeBtn = useRef(null);
  const open = index !== null;

  const go = useCallback((dir) => setIndex((i) => (i + dir + GALLERY.length) % GALLERY.length), []);
  const close = useCallback(() => setIndex(null), []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    closeBtn.current?.focus();
    const rtl = document.documentElement.dir === "rtl";
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
      if (e.key === "Tab") {
        // Keep focus inside the three lightbox controls.
        const items = [...document.querySelectorAll("#lightbox button")];
        const at = items.indexOf(document.activeElement);
        e.preventDefault();
        items[(at + (e.shiftKey ? -1 : 1) + items.length) % items.length]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const trigger = opener.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      trigger?.focus();
    };
  }, [open, close, go]);

  const current = open ? GALLERY[index] : null;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="sec-light section">
      <div className="container-x">
        <Label>{t("gallery.label")}</Label>
        <Lines id="gallery-title" lines={t("gallery.lines")} className="t-h2 mt-8" />

        <ul className="mt-16 columns-2 gap-4 md:mt-20 md:columns-3 md:gap-6">
          {GALLERY.map((item, n) => (
            <li key={item.id} data-reveal={(n % 3) * 0.08} className="mb-4 break-inside-avoid md:mb-6">
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setIndex(n);
                }}
                className="zoom block w-full cursor-zoom-in"
                aria-label={`${t("gallery.open")}: ${item.alt}`}
              >
                <span className={`relative block overflow-hidden ${item.ratio}`}>
                  <Img id={item.id} alt={item.alt} sizes="(min-width: 768px) 33vw, 50vw" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        id="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={current?.alt ?? ""}
        inert={!open}
        onClick={(e) => e.target === e.currentTarget && close()}
        className={`sec-dark fixed inset-0 z-[70] flex items-center justify-center bg-navy/95 px-4 py-20 transition-opacity duration-500 ease-[var(--ease)] md:px-24 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {current && (
          <figure key={current.id} className="fade-up m-0 flex max-h-full flex-col items-center">
            <img src={full(current.id)} alt={current.alt} className="max-h-[78svh] w-auto max-w-full object-contain [filter:saturate(.8)_contrast(1.03)_sepia(.08)]" />
            <figcaption className="mt-4 flex w-full justify-between gap-6 text-sm text-ivory/70">
              <span>{current.alt}</span>
              <span className="tabular-nums" dir="ltr">
                {String(index + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        )}
        <button ref={closeBtn} type="button" onClick={close} className="btn btn-icon absolute end-4 top-4 bg-transparent md:end-8 md:top-8" aria-label={t("gallery.close")}>
          <X size={20} strokeWidth={1.25} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(-1)} className="btn btn-icon absolute bottom-4 start-4 bg-transparent md:bottom-auto md:start-8" aria-label={t("gallery.prev")}>
          <ArrowLeft size={20} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
        </button>
        <button type="button" onClick={() => go(1)} className="btn btn-icon absolute bottom-4 end-4 bg-transparent md:bottom-auto md:end-8" aria-label={t("gallery.next")}>
          <ArrowRight size={20} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
        </button>
      </div>
    </section>
  );
}

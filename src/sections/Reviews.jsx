import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { CONTACT, REVIEWS } from "../data/content";
import { Label, Lines, Stars } from "../components/ui";

export default function Reviews() {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  const go = (dir) => setI((n) => (n + dir + REVIEWS.length) % REVIEWS.length);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="sec-dark section">
      <div className="container-x grid gap-y-16 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-4">
          <Label>{t("reviews.label")}</Label>
          <Lines id="reviews-title" lines={t("reviews.lines")} className="t-h2 mt-8" />

          <a
            data-reveal
            href={CONTACT.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 inline-flex items-end gap-5 border-t border-hair pt-8"
          >
            <span className="t-num">4.7</span>
            <span className="pb-1">
              <Stars value={4.7} className="text-brass" />
              <span className="mt-2 block text-sm text-muted transition-colors duration-500 group-hover:text-ivory">
                {t("reviews.total")}
              </span>
            </span>
          </a>
        </div>

        <div className="md:col-span-7 md:col-start-6 md:pt-24">
          <figure data-reveal className="m-0">
            <span aria-hidden="true" className="block font-serif text-7xl leading-none text-brass">
              “
            </span>
            <blockquote className="mt-2 min-h-[7.5em] md:min-h-[5.5em]" lang="en" aria-live="polite">
              <p key={i} className="t-quote fade-up">
                {REVIEWS[i]}
              </p>
            </blockquote>
            <figcaption className="t-label mt-8 text-muted">{t("reviews.caption")}</figcaption>
          </figure>

          <div data-reveal className="mt-12 flex items-center justify-between border-t border-hair pt-6">
            <span className="tabular-nums text-sm text-muted" dir="ltr">
              {String(i + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} className="btn btn-icon" aria-label={t("reviews.prev")}>
                <ArrowLeft size={18} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
              </button>
              <button type="button" onClick={() => go(1)} className="btn btn-icon" aria-label={t("reviews.next")}>
                <ArrowRight size={18} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

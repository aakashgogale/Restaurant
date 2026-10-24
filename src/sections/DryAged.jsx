import { ArrowRight } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { IMG } from "../data/content";
import { Figure, Label, Lines } from "../components/ui";

const BY_WEIGHT = [
  ["Salmon", 60],
  ["Branzino", 65],
  ["Hamachi", 70],
];

export default function DryAged({ onOpenMenu }) {
  const { t } = useI18n();
  const steps = t("dry.steps");

  return (
    <section id="dry-aged" aria-labelledby="dry-title" className="sec-dark section overflow-x-clip">
      <div className="container-x grid gap-y-16 md:grid-cols-12 md:gap-x-8">
        <div className="md:sticky md:top-[calc(var(--nav-h)+48px)] md:col-span-5 md:self-start">
          <Figure id={IMG.dryAged} alt={t("dry.alt")} mask parallax={6} sizes="(min-width: 768px) 42vw, 100vw" />
          <p data-reveal className="t-label mt-5 text-muted">
            Branzino · Salmon · Hamachi
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Label>{t("dry.label")}</Label>
          <Lines id="dry-title" lines={t("dry.lines")} className="t-h2 mt-8" />
          <p data-reveal className="t-body mt-10 max-w-[48ch] text-muted">
            {t("dry.intro")}
          </p>

          <ol className="mt-14 border-t border-hair">
            {steps.map(([title, text], n) => (
              <li key={title} data-reveal={n * 0.08} className="grid grid-cols-[56px_1fr] gap-4 border-b border-hair py-8 md:grid-cols-[96px_1fr]">
                <span className="font-serif text-[2.5rem] font-light leading-none text-brass">{String(n + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-h3">{title}</h3>
                  <p className="mt-2 max-w-[42ch] text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div data-reveal className="mt-14">
            <div className="flex items-baseline justify-between gap-4">
              <p className="t-label text-brass">{t("dry.weight")}</p>
              <p className="t-label text-muted" dir="ltr">
                {t("dry.per")}
              </p>
            </div>
            <ul className="mt-4">
              {BY_WEIGHT.map(([fish, price]) => (
                <li key={fish} className="flex items-baseline gap-3 py-2">
                  <span className="font-serif text-2xl font-light">{fish}</span>
                  <span aria-hidden="true" className="leader" />
                  <span className="tabular-nums">{price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">{t("dry.note")}</p>
          </div>

          <button type="button" data-reveal onClick={() => onOpenMenu("dry")} className="btn mt-12">
            {t("dry.cta")}
            <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </section>
  );
}

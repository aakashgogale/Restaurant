import { ArrowRight } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { IMG } from "../data/content";
import { Figure, Label, Lines } from "../components/ui";

export default function Offers() {
  const { t } = useI18n();

  return (
    <section id="lunch" aria-labelledby="offers-title" className="sec-light section overflow-hidden">
      <div className="container-x grid items-center gap-y-16 md:grid-cols-12 md:gap-x-8">
        <div className="order-2 md:order-1 md:col-span-5">
          <Figure id={IMG.offers} alt={t("offers.alt")} mask parallax={6} sizes="(min-width: 768px) 42vw, 100vw" />
        </div>

        <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
          <Label>{t("offers.label")}</Label>
          <Lines id="offers-title" lines={t("offers.lines")} className="t-h2 mt-8" />

          <div className="mt-14 border-t border-hair">
            <div data-reveal className="grid grid-cols-[8.5rem_1fr] items-end gap-x-6 md:grid-cols-[13rem_1fr] md:gap-x-8 border-b border-hair py-10">
              <p className="t-num" dir="ltr">
                20<span className="text-[0.5em]">%</span>
              </p>
              <div className="pb-1">
                <p className="t-h3">{t("offers.off")}</p>
                <p className="t-label mt-2 text-muted">{t("offers.when")}</p>
              </div>
            </div>
            <div data-reveal="0.1" className="grid grid-cols-[8.5rem_1fr] items-end gap-x-6 md:grid-cols-[13rem_1fr] md:gap-x-8 border-b border-hair py-10">
              <p className="t-num" dir="ltr">
                <span className="t-label me-2 align-top text-muted">AED</span>150
              </p>
              <div className="pb-1">
                <p className="t-h3">{t("offers.lunch")}</p>
                <p className="t-label mt-2 text-muted">{t("offers.when")}</p>
              </div>
            </div>
          </div>

          <a data-reveal href="#reserve" className="btn btn-solid mt-12">
            {t("offers.cta")}
            <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
          </a>
        </div>
      </div>
    </section>
  );
}

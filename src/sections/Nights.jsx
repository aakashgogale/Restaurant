import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { CONTACT, IMG } from "../data/content";
import { Img, Label, Lines } from "../components/ui";

export default function Nights() {
  const { t } = useI18n();
  const rows = t("nights.rows");

  return (
    <section id="nights" aria-labelledby="nights-title" className="sec-dark overflow-hidden">
      {/* Full-bleed band with parallax */}
      <div className="relative flex min-h-[640px] items-end overflow-hidden md:min-h-[82svh]">
        <div data-parallax="8" className="absolute inset-x-0 -top-[10%] h-[120%]">
          <Img id={IMG.nights} alt={t("nights.alt")} />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/30 to-transparent rtl:bg-gradient-to-l" />
        <div className="container-x relative pb-16 pt-40 md:pb-24">
          <Label>{t("nights.label")}</Label>
          <Lines id="nights-title" lines={t("nights.lines")} className="t-display mt-8" />
          <p data-reveal className="t-body mt-10 max-w-[52ch] text-muted">
            {t("nights.intro")}
          </p>
        </div>
      </div>

      <div className="container-x pb-28 pt-20 md:pb-40 md:pt-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <h3 data-reveal className="t-label text-brass">
            {t("nights.upcoming")}
          </h3>
          <p data-reveal className="max-w-md text-sm text-muted md:text-end">
            {t("nights.note")}
          </p>
        </div>

        <ul className="mt-8 border-t border-hair">
          {rows.map(([when, title, detail], n) => (
            <li
              key={title + when}
              data-reveal={n * 0.06}
              className="grid gap-4 border-b border-hair py-8 md:grid-cols-[200px_1fr_auto] md:items-center md:gap-10"
            >
              <p className="t-label text-brass">{when}</p>
              <div>
                <p className="t-h3">{title}</p>
                <p className="mt-1 text-sm text-muted">{detail}</p>
              </div>
              <a
                href={CONTACT.sevenrooms}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm justify-self-start md:justify-self-end"
              >
                {t("nights.book")}
                <ArrowUpRight size={14} strokeWidth={1.25} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

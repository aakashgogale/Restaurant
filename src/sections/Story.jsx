import { useI18n } from "../lib/i18n";
import { IMG } from "../data/content";
import { Figure, Label, Lines } from "../components/ui";

export default function Story() {
  const { t } = useI18n();
  const stats = t("story.stats");

  return (
    <section id="story" aria-labelledby="story-title" className="sec-light section overflow-hidden">
      <div className="container-x">
        <div className="grid gap-y-20 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-5 md:pt-16">
            <Label>{t("story.label")}</Label>
            <Lines id="story-title" lines={t("story.lines")} className="t-h2 mt-8" />
            <p data-reveal className="t-body mt-10 max-w-[46ch] text-muted">
              {t("story.p1")}
            </p>
            <p data-reveal className="t-body mt-6 max-w-[46ch] text-muted">
              {t("story.p2")}
            </p>
          </div>

          {/* Large image with a smaller detail overlapping its lower edge */}
          <div className="relative md:col-span-6 md:col-start-7">
            <Figure id={IMG.storyMain} alt="A plated dish on a set table in the dining room" mask parallax={6} sizes="(min-width: 768px) 50vw, 100vw" />
            <div className="absolute -bottom-12 start-[-8px] w-[46%] border-[8px] border-ivory md:-bottom-16 md:start-[-96px] md:w-[44%]">
              <Figure id={IMG.storyDetail} alt="Fresh loaves of bread" ratio="aspect-square" mask sizes="(min-width: 768px) 22vw, 46vw" />
            </div>
          </div>
        </div>

        <dl className="mt-32 grid border-t border-hair sm:grid-cols-3 md:mt-40">
          {stats.map(([value, label], n) => (
            <div
              key={label}
              data-reveal={n * 0.1}
              className={`flex flex-col-reverse border-b border-hair py-8 sm:border-b-0 sm:py-10 ${n > 0 ? "sm:border-s sm:ps-8" : ""}`}
            >
              <dt className="t-label mt-4 text-muted">{label}</dt>
              <dd className="t-num m-0">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

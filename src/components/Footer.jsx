import { useI18n } from "../lib/i18n";
import { CONTACT, HOURS, SOCIALS } from "../data/content";
import { Ornament } from "./ui";
import { Wordmark } from "./Nav";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="sec-deep pb-28 pt-24 md:pb-12">
      <div className="container-x">
        <div className="grid gap-12 border-b border-hair pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-6 max-w-xs text-sm text-muted">
              Modern Uzbek cuisine &amp; dry-aged seafood, above Dubai Marina.
            </p>
            <Ornament className="mt-8" />
          </div>

          <div className="text-sm md:col-span-3">
            <p className="t-label mb-4 text-brass">{t("visit.address")}</p>
            <p className="text-muted">{CONTACT.address}</p>
          </div>

          <div className="text-sm md:col-span-2">
            <p className="t-label mb-4 text-brass">{t("visit.hours")}</p>
            <p className="text-muted">
              {t("visit.weekdays")} <span dir="ltr">{HOURS.weekdays}</span>
              <br />
              {t("visit.weekend")} <span dir="ltr">{HOURS.weekend}</span>
            </p>
          </div>

          <div className="text-sm md:col-span-2">
            <p className="t-label mb-4 text-brass">{t("visit.follow")}</p>
            <ul className="space-y-1.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link text-muted hover:text-ivory">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} OSH Del Mar · {t("footer.concept")}</p>
          <a href="#top" className="link self-start md:self-auto">
            {t("footer.top")}
          </a>
        </div>
      </div>
    </footer>
  );
}

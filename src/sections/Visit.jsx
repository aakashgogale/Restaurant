import { ArrowUpRight, Phone } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { CONTACT, HOURS, SOCIALS } from "../data/content";
import { Label, Lines } from "../components/ui";

function Row({ label, children }) {
  return (
    <div data-reveal className="grid gap-2 border-b border-hair py-6 sm:grid-cols-[160px_1fr] sm:gap-8">
      <dt className="t-label pt-1 text-brass">{label}</dt>
      <dd className="m-0">{children}</dd>
    </div>
  );
}

export default function Visit() {
  const { t } = useI18n();

  return (
    <section id="visit" aria-labelledby="visit-title" className="sec-dark section">
      <div className="container-x grid gap-y-16 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-6">
          <Label>{t("visit.label")}</Label>
          <Lines id="visit-title" lines={t("visit.lines")} className="t-h2 mt-8" />

          <dl className="mt-12 border-t border-hair">
            <Row label={t("visit.address")}>
              <address className="not-italic">{CONTACT.address}</address>
            </Row>
            <Row label={t("visit.hours")}>
              <p className="flex justify-between gap-6 sm:justify-start">
                <span className="sm:w-32">{t("visit.weekdays")}</span>
                <span dir="ltr">{HOURS.weekdays}</span>
              </p>
              <p className="flex justify-between gap-6 sm:justify-start">
                <span className="sm:w-32">{t("visit.weekend")}</span>
                <span dir="ltr">{HOURS.weekend}</span>
              </p>
            </Row>
            <Row label={t("visit.contact")}>
              <a href={CONTACT.phoneHref} className="link" dir="ltr">
                {CONTACT.phoneDisplay}
              </a>
            </Row>
            <Row label={t("visit.email")}>
              <a href={`mailto:${CONTACT.emailInfo}`} className="link">
                {CONTACT.emailInfo}
              </a>
              <br />
              <a href={`mailto:${CONTACT.emailReservations}`} className="link">
                {CONTACT.emailReservations}
              </a>
            </Row>
            <Row label={t("visit.follow")}>
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Row>
          </dl>

          <div data-reveal className="mt-10 flex flex-wrap gap-4">
            <a href={CONTACT.directions} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              {t("visit.directions")}
              <ArrowUpRight size={16} strokeWidth={1.25} aria-hidden="true" />
            </a>
            <a href={CONTACT.phoneHref} className="btn">
              <Phone size={16} strokeWidth={1.25} aria-hidden="true" />
              {t("visit.call")}
            </a>
          </div>
        </div>

        <div data-reveal className="relative min-h-[420px] border border-hair md:col-span-5 md:col-start-8">
          <iframe
            title={t("visit.mapTitle")}
            src={CONTACT.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(.55)_sepia(.18)_contrast(.95)]"
          />
        </div>
      </div>
    </section>
  );
}

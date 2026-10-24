import { useMemo, useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { refreshTriggers } from "../lib/scroll";
import { CONTACT } from "../data/content";
import { Label, Lines } from "../components/ui";

const pad = (n) => String(n).padStart(2, "0");
const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Half-hour slots inside opening hours: 13:00 until 30 min before close
// (01:00 Sun–Thu, 03:00 Fri–Sat).
function slotsFor(dateISO) {
  if (!dateISO) return [];
  const day = new Date(`${dateISO}T12:00:00`).getDay();
  const closeHour = day === 5 || day === 6 ? 27 : 25;
  const slots = [];
  for (let m = 13 * 60; m <= closeHour * 60 - 30; m += 30) {
    slots.push(`${pad(Math.floor(m / 60) % 24)}:${pad(m % 60)}`);
  }
  return slots;
}

const EMPTY = { name: "", phone: "", date: "", time: "", guests: "2", note: "" };

function Field({ id, label, error, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="t-label block text-muted">
        {label}
      </label>
      {children}
      <p id={`${id}-error`} role={error ? "alert" : undefined} className="mt-2 min-h-5 text-sm text-terracotta-ink">
        {error}
      </p>
    </div>
  );
}

const inputCls =
  "mt-3 block min-h-12 w-full rounded-none border-0 border-b border-hair bg-transparent px-0 py-2 text-[17px] outline-none transition-colors duration-500 placeholder:text-navy/40 focus:border-navy focus-visible:outline-none aria-[invalid=true]:border-terracotta-ink";

export default function Reserve() {
  const { t, lang } = useI18n();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [ready, setReady] = useState(false);
  const slots = useMemo(() => slotsFor(form.date), [form.date]);

  const set = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value, ...(key === "date" ? { time: "" } : {}) }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = t("reserve.errors.name");
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) er.phone = t("reserve.errors.phone");
    if (!form.date || form.date < todayISO()) er.date = t("reserve.errors.date");
    if (!form.time) er.time = t("reserve.errors.time");
    return er;
  };

  const message = useMemo(() => {
    const dateLabel = form.date
      ? new Date(`${form.date}T12:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
      : "";
    const details = [
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Date: ${dateLabel}`,
      `Time: ${form.time}`,
      `Guests: ${form.guests}`,
    ];
    if (form.note.trim()) details.push(`Note: ${form.note.trim()}`);
    return `Hello OSH Del Mar, I would like to request a table.\n\n${details.join("\n")}`;
  }, [form]);

  const onSubmit = (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    const firstBad = Object.keys(er)[0];
    if (firstBad) {
      document.getElementById(`r-${firstBad}`)?.focus();
      return;
    }
    setReady(true);
    refreshTriggers();
  };

  const edit = () => {
    setReady(false);
    refreshTriggers();
  };

  const err = (k) => ({ "aria-invalid": Boolean(errors[k]), "aria-describedby": `r-${k}-error` });

  return (
    <section id="reserve" aria-labelledby="reserve-title" className="sec-light section">
      <div className="container-x grid gap-y-16 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-5">
          <Label>{t("reserve.label")}</Label>
          <Lines id="reserve-title" lines={t("reserve.lines")} className="t-h2 mt-8" />
          <p data-reveal className="t-body mt-10 max-w-[42ch] text-muted">
            {t("reserve.intro")}
          </p>
          <div data-reveal className="mt-10 flex flex-col items-start gap-6">
            <a href={CONTACT.sevenrooms} target="_blank" rel="noopener noreferrer" className="btn">
              {t("reserve.sevenrooms")}
              <ArrowUpRight size={16} strokeWidth={1.25} aria-hidden="true" />
            </a>
            <p className="text-sm text-muted">
              {t("reserve.call")}{" "}
              <a href={CONTACT.phoneHref} className="link link-under text-navy" dir="ltr">
                {CONTACT.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {ready ? (
            <div className="fade-up border-t border-navy pt-10" aria-live="polite">
              <h3 className="t-h3">{t("reserve.readyTitle")}</h3>
              <p className="mt-2 text-muted">{t("reserve.readyText")}</p>
              <pre lang="en" dir="ltr" className="mt-8 whitespace-pre-wrap border border-hair p-6 font-sans text-sm leading-relaxed">
                {message}
              </pre>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid"
                >
                  <MessageCircle size={16} strokeWidth={1.25} aria-hidden="true" />
                  {t("reserve.send")}
                </a>
                <button type="button" onClick={edit} className="btn">
                  {t("reserve.edit")}
                </button>
              </div>
            </div>
          ) : (
            <form data-reveal noValidate onSubmit={onSubmit} className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <Field id="r-name" label={t("reserve.name")} error={errors.name}>
                <input id="r-name" autoComplete="name" value={form.name} onChange={set("name")} className={inputCls} {...err("name")} />
              </Field>
              <Field id="r-phone" label={t("reserve.phone")} error={errors.phone}>
                <input
                  id="r-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  placeholder="+971"
                  value={form.phone}
                  onChange={set("phone")}
                  className={`${inputCls} rtl:text-right`}
                  {...err("phone")}
                />
              </Field>
              <Field id="r-date" label={t("reserve.date")} error={errors.date}>
                <input id="r-date" type="date" min={todayISO()} value={form.date} onChange={set("date")} className={inputCls} {...err("date")} />
              </Field>
              <Field id="r-time" label={t("reserve.time")} error={errors.time}>
                <select id="r-time" value={form.time} onChange={set("time")} disabled={!form.date} className={`${inputCls} disabled:opacity-50`} {...err("time")}>
                  <option value="">{form.date ? t("reserve.choose") : t("reserve.pickDate")}</option>
                  {slots.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="r-guests" label={t("reserve.guests")} className="sm:col-span-2">
                <select id="r-guests" value={form.guests} onChange={set("guests")} className={inputCls}>
                  {Array.from({ length: 12 }, (_, n) => (
                    <option key={n + 1} value={String(n + 1)}>
                      {(n + 1).toLocaleString(lang === "ar" ? "ar-AE" : "en")}
                    </option>
                  ))}
                  <option value="13+">{t("reserve.large")}</option>
                </select>
              </Field>
              <Field id="r-note" label={t("reserve.note")} className="sm:col-span-2">
                <textarea
                  id="r-note"
                  rows={2}
                  value={form.note}
                  onChange={set("note")}
                  placeholder={t("reserve.notePh")}
                  className={`${inputCls} resize-none`}
                />
              </Field>
              <div className="pt-4 sm:col-span-2">
                <button type="submit" className="btn btn-solid w-full sm:w-auto">
                  {t("reserve.submit")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

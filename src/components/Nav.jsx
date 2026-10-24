import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, X, Phone, MessageCircle } from "lucide-react";
import { LANGS, useI18n } from "../lib/i18n";
import { lockScroll } from "../lib/scroll";
import { CONTACT } from "../data/content";

const LINKS = [
  ["story", "nav.story"],
  ["dry-aged", "nav.dry"],
  ["menu", "nav.menu"],
  ["nights", "nav.nights"],
  ["gallery", "nav.gallery"],
  ["visit", "nav.visit"],
];

export function Wordmark({ className = "" }) {
  return (
    <span className={`inline-flex items-baseline gap-2.5 ${className}`} dir="ltr">
      <span className="font-serif text-[28px] font-light leading-none tracking-[-0.02em]">OSH</span>
      <span className="t-label text-brass">Del Mar</span>
    </span>
  );
}

function LangSwitch({ className = "" }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t("nav.language")} className={`flex items-center gap-1 ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          lang={l.code}
          className={`min-h-11 min-w-11 px-2 text-[12px] font-semibold tracking-[0.12em] transition-colors duration-500 ${
            lang === l.code ? "text-brass" : "text-ivory/60 hover:text-ivory"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const { t } = useI18n();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, trap focus, close on Escape, restore focus on close.
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const panel = panelRef.current;
    const focusables = () => panel.querySelectorAll("a[href], button:not([disabled])");
    focusables()[0]?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-ivory transition-[background-color,border-color] duration-700 ease-[var(--ease)] border-b ${
          solid ? "bg-navy border-brass/25" : "bg-transparent border-transparent"
        }`}
      >
        <div className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
          <a href="#top" aria-label="OSH Del Mar, back to top">
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {LINKS.map(([id, key]) => (
                <li key={id}>
                  <a href={`#${id}`} className="link text-[13px] font-medium tracking-[0.04em] text-ivory/85 hover:text-ivory">
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LangSwitch className="hidden md:flex" />
            <a href="#reserve" className="btn btn-solid btn-sm hidden sm:inline-flex">
              {t("nav.reserve")}
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex min-h-11 items-center gap-2 px-1 lg:hidden"
            >
              <span className="t-label">{t("nav.open")}</span>
              <MenuIcon size={20} strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.open")}
        inert={!open}
        className={`sec-dark fixed inset-0 z-[60] flex flex-col transition-[opacity,transform] duration-700 ease-[var(--ease)] lg:hidden ${
          open ? "opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="container-x flex h-[var(--nav-h)] items-center justify-between">
          <Wordmark />
          <button type="button" onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-2 px-1">
            <span className="t-label">{t("nav.close")}</span>
            <X size={20} strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto pt-8">
          <ol className="border-t border-hair">
            {LINKS.map(([id, key], n) => (
              <li key={id} className="border-b border-hair">
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-5 py-4 font-serif text-[2rem] font-light leading-tight"
                >
                  <span className="t-label w-6 text-brass">{String(n + 1).padStart(2, "0")}</span>
                  {t(key)}
                </a>
              </li>
            ))}
          </ol>
          <LangSwitch className="-ms-2 mt-6" />
        </nav>

        <div className="container-x grid grid-cols-[1fr_auto_auto] gap-3 pb-[max(24px,env(safe-area-inset-bottom))] pt-6">
          <a href="#reserve" onClick={() => setOpen(false)} className="btn btn-solid">
            {t("hero.reserve")}
          </a>
          <a href={CONTACT.phoneHref} className="btn btn-icon" aria-label={`${t("visit.call")} ${CONTACT.phoneDisplay}`}>
            <Phone size={18} strokeWidth={1.25} aria-hidden="true" />
          </a>
          <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-icon" aria-label="WhatsApp">
            <MessageCircle size={18} strokeWidth={1.25} aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  );
}

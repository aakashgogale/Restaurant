import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { refreshTriggers, scrollToId } from "../lib/scroll";
import { MENU } from "../data/menu";
import { PDF_LINKS } from "../data/content";
import { Label, Ornament } from "../components/ui";

function Price({ value }) {
  if (!value) return null;
  const numeric = /^\d/.test(value);
  return <span className={`flex-none tabular-nums ${numeric ? "" : "text-sm text-muted"}`}>{value}</span>;
}

export default function Menu({ active, setActive }) {
  const { t } = useI18n();
  const tabRefs = useRef({});
  const section = useRef(null);
  const tablist = useRef(null);
  const prevActive = useRef(active);
  const current = MENU.find((c) => c.id === active) ?? MENU[0];

  // On tab change: centre the tab within the strip (horizontal only, never the page),
  // bring the list back into view if the reader was deep in a long section, re-measure triggers.
  useEffect(() => {
    if (prevActive.current === active) return;
    prevActive.current = active;
    const tab = tabRefs.current[active];
    const strip = tablist.current;
    if (tab && strip) {
      const offset = tab.getBoundingClientRect().left - strip.getBoundingClientRect().left;
      strip.scrollBy({ left: offset - strip.clientWidth / 2 + tab.offsetWidth / 2, behavior: "smooth" });
    }
    if (section.current.getBoundingClientRect().top < -200) scrollToId("menu");
    refreshTriggers();
  }, [active]);

  const onKeyDown = (e) => {
    const i = MENU.findIndex((c) => c.id === active);
    const rtl = document.documentElement.dir === "rtl";
    const nextKey = rtl ? "ArrowLeft" : "ArrowRight";
    const prevKey = rtl ? "ArrowRight" : "ArrowLeft";
    let next = null;
    if (e.key === nextKey) next = MENU[(i + 1) % MENU.length];
    if (e.key === prevKey) next = MENU[(i - 1 + MENU.length) % MENU.length];
    if (e.key === "Home") next = MENU[0];
    if (e.key === "End") next = MENU[MENU.length - 1];
    if (!next) return;
    e.preventDefault();
    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <section id="menu" ref={section} aria-labelledby="menu-title" className="sec-dark section">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Label>{t("menu.label")}</Label>
            <h2 id="menu-title" data-lines className="t-h2 mt-8">
              <span className="line">
                <span className="line-inner">{t("menu.title")}</span>
              </span>
            </h2>
          </div>
          <div data-reveal className="md:text-end">
            <p className="t-label text-muted">{t("menu.more")}</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              {[
                ["wine", "menu.wine"],
                ["bar", "menu.bar"],
                ["cocktails", "menu.cocktails"],
              ].map(([k, key]) => (
                <li key={k}>
                  <a href={PDF_LINKS[k]} className="link inline-flex items-center gap-1.5 py-2 text-sm">
                    {t(key)}
                    <ArrowUpRight size={14} strokeWidth={1.25} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sticky, horizontally scrollable tab bar */}
      <div className="sticky top-[var(--nav-h)] z-20 mt-16 border-y border-hair bg-navy">
        <div className="container-x">
          <div
            ref={tablist}
            role="tablist"
            aria-label={t("menu.tabs")}
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-[var(--gutter)] flex gap-8 overflow-x-auto px-[var(--gutter)]"
          >
            {MENU.map((c) => {
              const selected = c.id === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => (tabRefs.current[c.id] = el)}
                  role="tab"
                  type="button"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(c.id)}
                  className={`t-label relative flex min-h-14 flex-none items-center transition-colors duration-500 ${
                    selected ? "text-brass" : "text-ivory/60 hover:text-ivory"
                  }`}
                >
                  {c.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-px bg-brass transition-transform duration-700 ease-[var(--ease)] ${
                      selected ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-x">
        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} key={current.id} className="fade-up pt-14">
          {current.groups.map((group, g) => (
            <div key={g} className={g > 0 ? "mt-16" : ""}>
              {group.title && (
                <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                  <h3 className="t-label text-brass">{group.title}</h3>
                  {group.note && <p className="text-sm text-muted">{group.note}</p>}
                </div>
              )}
              {!group.title && group.note && <p className="mb-6 text-sm text-muted">{group.note}</p>}
              <ul className="grid gap-x-16 lg:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item.name} className="py-4" lang="en">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-[1.375rem] font-normal leading-snug">{item.name}</span>
                      {item.price && <span aria-hidden="true" className="leader" />}
                      <Price value={item.price} />
                    </div>
                    {item.desc && <p className="mt-1 max-w-[52ch] text-sm leading-relaxed text-muted">{item.desc}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-16 flex items-center gap-6 text-muted">
            <Ornament />
            <span className="t-label">{t("menu.note")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

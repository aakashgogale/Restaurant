import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { CONTACT } from "../data/content";

// Thumb-reach booking bar for phones. Appears once the hero has scrolled away.
export default function MobileBar() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), { threshold: 0.15 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={!show}
      className={`sec-dark fixed inset-x-0 bottom-0 z-40 border-t border-hair pb-[env(safe-area-inset-bottom)] transition-transform duration-700 ease-[var(--ease)] md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-[1fr_auto] gap-2 p-2">
        <a href="#reserve" className="btn btn-solid">
          {t("mobile.reserve")}
        </a>
        <a
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-icon min-h-[52px] w-[52px]"
          aria-label={t("mobile.whatsapp")}
        >
          <MessageCircle size={20} strokeWidth={1.25} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

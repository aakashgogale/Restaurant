import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { I18nProvider, useI18n } from "./lib/i18n";
import { initScroll, refreshTriggers, scrollToId, setupReveals } from "./lib/scroll";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import MobileBar from "./components/MobileBar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Story from "./sections/Story";
import DryAged from "./sections/DryAged";
import Signatures from "./sections/Signatures";
import Menu from "./sections/Menu";
import Offers from "./sections/Offers";
import Nights from "./sections/Nights";
import Gallery from "./sections/Gallery";
import Reviews from "./sections/Reviews";
import Reserve from "./sections/Reserve";
import Visit from "./sections/Visit";

function Site() {
  const { t, lang } = useI18n();
  const [ready, setReady] = useState(false);
  const [menuTab, setMenuTab] = useState("cold");
  const main = useRef(null);

  const onLoaded = useCallback(() => setReady(true), []);

  useEffect(() => {
    // The hero intro plays on load, so a reload should start at the top.
    history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo(0, 0);
    initScroll();

    // Route every in-page anchor through the smooth scroller.
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) return;
      const id = a.getAttribute("href").slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
      history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
    };
    document.addEventListener("click", onClick);

    // Late font/image metrics can shift trigger positions.
    document.fonts?.ready.then(refreshTriggers);
    window.addEventListener("load", refreshTriggers);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refreshTriggers);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const mm = setupReveals(main.current);
    return () => mm.revert();
  }, [ready]);

  // Copy length changes between languages; re-measure.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [lang]);

  const openMenu = useCallback((tab) => {
    setMenuTab(tab);
    scrollToId("menu");
  }, []);

  return (
    <>
      <a href="#main" className="skip-link btn btn-solid sec-dark">
        {t("skip")}
      </a>
      <Loader onDone={onLoaded} />
      <Nav />
      <main id="main" ref={main}>
        <Hero ready={ready} />
        <Story />
        <DryAged onOpenMenu={openMenu} />
        <Signatures />
        <Menu active={menuTab} setActive={setMenuTab} />
        <Offers />
        <Nights />
        <Gallery />
        <Reviews />
        <Reserve />
        <Visit />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Site />
    </I18nProvider>
  );
}

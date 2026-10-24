import { useEffect, useState } from "react";
import { reduceMotion } from "../lib/scroll";

// Wordmark fades in, then the curtain lifts. Whole sequence is under 1.2s.
export default function Loader({ onDone }) {
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const hold = reduceMotion ? 0 : 800;
    const t1 = setTimeout(() => {
      setPhase("out");
      onDone();
    }, hold);
    const t2 = setTimeout(() => setPhase("gone"), hold + 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy text-ivory transition-opacity duration-[400ms] ease-[var(--ease)]"
      style={{ opacity: phase === "out" ? 0 : 1 }}
    >
      <div className="fade-up flex flex-col items-center gap-3">
        <span className="font-serif text-5xl font-light tracking-[-0.02em]">OSH</span>
        <span className="t-label text-brass">Del Mar</span>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

const unsplash = (id, w, q = 70) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
const WIDTHS = [480, 768, 1080, 1440, 1920];

/** Responsive, graded image that fills its positioned parent, with a blurred placeholder. */
export function Img({ id, alt, sizes = "100vw", priority = false }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true);
  }, []);

  return (
    <span className="img-frame">
      <img src={unsplash(id, 32, 30)} alt="" aria-hidden="true" className="img-ph" />
      <img
        ref={ref}
        src={unsplash(id, 1080)}
        srcSet={WIDTHS.map((w) => `${unsplash(id, w)} ${w}w`).join(", ")}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        draggable="false"
        onLoad={() => setLoaded(true)}
        className={`img-main${loaded ? " is-loaded" : ""}`}
      />
    </span>
  );
}

/** Fixed-ratio figure. `mask` wipes the image in, `parallax` (percent) drifts it on scroll. */
export function Figure({ id, alt, sizes, ratio = "aspect-[4/5]", mask = false, parallax = 0, zoom = false, className = "" }) {
  const media = parallax ? (
    <span data-parallax={parallax} className="absolute inset-x-0 -top-[8%] block h-[116%]">
      <Img id={id} alt={alt} sizes={sizes} />
    </span>
  ) : (
    <Img id={id} alt={alt} sizes={sizes} />
  );

  return (
    <figure data-mask={mask ? "" : undefined} className={`relative m-0 overflow-hidden ${ratio} ${zoom ? "zoom" : ""} ${className}`}>
      {mask ? (
        <span data-mask-inner className="absolute inset-0 block overflow-hidden">
          <span data-mask-counter className="absolute inset-0 block">
            {media}
          </span>
        </span>
      ) : (
        media
      )}
    </figure>
  );
}

/** Heading whose lines slide up from behind a mask. */
export function Lines({ lines, as: Tag = "h2", className = "t-h2", id }) {
  return (
    <Tag id={id} className={className} data-lines>
      {lines.map((line, i) => (
        <span key={i} className="line">
          <span className="line-inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Small uppercase section label with a brass hairline. */
export function Label({ children, className = "" }) {
  return (
    <p data-reveal className={`t-label text-accent flex items-center gap-4 ${className}`}>
      <span aria-hidden="true" className="block h-px w-10 bg-current opacity-60" />
      {children}
    </p>
  );
}

/** Fine ikat-inspired lozenge ornament, used sparingly. */
export function Ornament({ className = "" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 160 14" className={`h-3.5 w-40 text-accent ${className}`} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 7h56M104 7h56" />
      <path d="M80 1l6 6-6 6-6-6z" />
      <path d="M80 4.5l2.5 2.5L80 9.5 77.5 7z" />
      <path d="M66 7l3-3 3 3-3 3zM88 7l3-3 3 3-3 3z" />
      <path d="M58 7l2-2 2 2-2 2zM98 7l2-2 2 2-2 2z" />
    </svg>
  );
}

/** Stars filled to a fractional rating. */
export function Stars({ value = 4.7, className = "" }) {
  const star = (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-none" aria-hidden="true">
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
    </svg>
  );
  return (
    <span className={`relative inline-flex ${className}`} role="img" aria-label={`${value} out of 5`}>
      <span className="flex gap-1 fill-none stroke-current opacity-50">{Array.from({ length: 5 }, (_, i) => <span key={i}>{star}</span>)}</span>
      <span className="absolute inset-y-0 start-0 flex gap-1 overflow-hidden fill-current" style={{ width: `${(value / 5) * 100}%` }}>
        {Array.from({ length: 5 }, (_, i) => <span key={i}>{star}</span>)}
      </span>
    </span>
  );
}

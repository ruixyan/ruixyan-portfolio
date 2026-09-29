import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import "../styles/showreel.css";

const INTERVAL = 3000; // ms each slide stays up

const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src || "");

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function SlideMedia({ src, active, eager }) {
  const ref = useRef(null);

  // Only the visible video plays; it restarts each time it comes back.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  if (!src) return <span className="showreel-placeholder" aria-hidden="true" />;
  if (isVideo(src)) {
    return <video ref={ref} src={src} muted loop playsInline preload="metadata" />;
  }
  return <img src={src} alt="" loading={eager ? "eager" : "lazy"} decoding="async" />;
}

export default function Showreel({ onSlideChange }) {
  const slides = projects.filter((p) => p.featured);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const reduced = usePrefersReducedMotion();

  const playing = !stopped && !reduced && slides.length > 1;

  useEffect(() => {
    if (!playing || hovered) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearTimeout(id);
  }, [index, playing, hovered, slides.length]);
    // Tell the page which project is showing (used for the header title)
    const current = slides[index];
    useEffect(() => {
      if (current) onSlideChange?.(current);
    }, [current?.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  if (slides.length === 0) return null;

  const go = (i) => setIndex((i + slides.length) % slides.length);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };

  return (
    <section
      className="showreel"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={onKeyDown}
    >
      {slides.map((p, i) => {
        const active = i === index;
        return (
          <Link
            key={p.slug}
            to={`/work/${p.slug}`}
            className={`showreel-slide${active ? " is-active" : ""}`}
            aria-hidden={!active}
            tabIndex={active ? 0 : -1}
          >
            <SlideMedia src={p.hero || p.cover} active={active} eager={i === 0} />
            <div className="showreel-caption">
              <h2 className="showreel-title">{p.title}</h2>
              <p className="showreel-meta">
                <span>{p.tags.join(", ")}</span>
                <span>{p.year}</span>
              </p>
            </div>
          </Link>
        );
      })}

{slides.length > 1 && (
  <div className="showreel-controls">
    <div className="showreel-dots">
      {slides.map((p, i) => (
        <button
          key={p.slug}
          type="button"
          className="showreel-dot"
          aria-label={`Show ${p.title}`}
          aria-current={i === index}
          onClick={() => go(i)}
        />
      ))}
    </div>

    {!reduced && (
      <button
        type="button"
        className="showreel-toggle"
        aria-label={stopped ? "Play slideshow" : "Pause slideshow"}
        onClick={() => setStopped((s) => !s)}
      >
        {stopped ? (
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <rect x="3.5" y="2.5" width="3" height="11" fill="currentColor" />
            <rect x="9.5" y="2.5" width="3" height="11" fill="currentColor" />
          </svg>
        )}
      </button>
    )}
        </div>
      )}
    </section>
  );
}

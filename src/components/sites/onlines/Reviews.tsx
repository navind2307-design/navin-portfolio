"use client";

import { useEffect, useRef, useState } from "react";

type ReviewItem = {
  n: string;
  r: string;
  s: number;
  t: string;
  now?: boolean;
};

// Sample reviews — placeholder text and names only.
// TODO: replace these with real client reviews before publishing.
const sampleReviews: ReviewItem[] = [
  {
    n: "Priya S.",
    r: "Café owner",
    s: 5,
    t: "Our festival posters went out in two days and the response online was our best yet. Clean, bold and exactly the mood we wanted.",
  },
  {
    n: "Arjun M.",
    r: "YouTube creator",
    s: 5,
    t: "Every thumbnail tells the story in one frame. I get the cover I imagined, usually on the first try.",
  },
  {
    n: "Karthik R.",
    r: "Marketing lead",
    s: 4,
    t: "Great at turning a rough idea into a polished carousel. Quick revisions and easy to work with.",
  },
  {
    n: "Meera N.",
    r: "Founder",
    s: 5,
    t: "The AI ad film felt like a real production. Concept to final cut, all handled smoothly.",
  },
  {
    n: "Sana K.",
    r: "Product manager",
    s: 5,
    t: "The app screens were clear and easy to build from. Thoughtful about the small details.",
  },
  {
    n: "David L.",
    r: "Operations",
    s: 4,
    t: "Explained a complicated process with simple 2D animation. Delivered on time.",
  },
];

const STORAGE_KEY = "navin-reviews-v1";
const VIDEO_SRC = "/videos/review-bg.mp4";
const POSTER_SRC = "/images/review-poster.jpg";
const COLORS = [
  "#0b57e0",
  "#7c3aed",
  "#0f9d8a",
  "#e4572e",
  "#be185d",
  "#b45309",
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (
    (parts[0]?.charAt(0) ?? "?") + (parts[1]?.charAt(0) ?? "")
  ).toUpperCase();
}

function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return COLORS[hash % COLORS.length];
}

function Stars({ count }: { count: number }) {
  return (
    <span
      className="rv-stars"
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <span key={value} className={value <= count ? "is-on" : undefined} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

function ReviewCard({
  review,
  fresh,
}: {
  review: ReviewItem;
  fresh?: boolean;
}) {
  return (
    <article className={`rv-card${fresh ? " is-fresh" : ""}`}>
      <div
        className="rv-avatar"
        style={{ backgroundColor: colorFor(review.n) }}
        aria-hidden="true"
      >
        {initials(review.n)}
      </div>
      <div className="rv-card__body">
        <div className="rv-card__top">
          <b>{review.n}</b>
          <span className="rv-mono">{review.now ? "Just now" : review.r}</span>
        </div>
        <Stars count={review.s} />
        <p>{review.t}</p>
      </div>
    </article>
  );
}

export function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playIntentRef = useRef(false);
  const lastDuration = useRef(0);

  const [mine, setMine] = useState<ReviewItem[]>([]);
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [duration, setDuration] = useState(0);

  const reviews = [...mine, ...sampleReviews];
  const shownRating = hovered || rating;

  useEffect(() => {
    let cancelled = false;

    // Deferred so the server and first client render both start from [].
    queueMicrotask(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored || cancelled) return;
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMine(
            parsed.filter(
              (item): item is ReviewItem =>
                typeof item === "object" &&
                item !== null &&
                typeof (item as ReviewItem).n === "string" &&
                typeof (item as ReviewItem).t === "string" &&
                typeof (item as ReviewItem).s === "number",
            ).slice(0, 20),
          );
        }
      } catch {
        // localStorage can be unavailable (private mode, blocked cookies).
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!message.startsWith("Thanks")) return;
    const timer = window.setTimeout(() => setMessage(""), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);

  // Keep the marquee speed proportional to the amount of review content.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const next = Math.max(26, track.scrollHeight / 2 / 30);
      if (Math.abs(next - lastDuration.current) > 0.1) {
        lastDuration.current = next;
        setDuration(next);
      }
    };

    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [reviews.length]);

  // The background and the scrolling only run while the section is visible.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Track the motion preference. Deferred so the server and first client
  // render both start from false and hydration stays stable.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    const apply = () => {
      if (!cancelled) setReducedMotion(query.matches);
    };
    queueMicrotask(apply);
    query.addEventListener("change", apply);
    return () => {
      cancelled = true;
      query.removeEventListener("change", apply);
    };
  }, []);

  // Play the background video only while the section is on screen. A fresh
  // play() is attempted on canplay and after any unexpected browser pause,
  // and every rejected promise is swallowed (e.g. an autoplay block).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      if (!playIntentRef.current) return;
      const result = video.play();
      if (result) result.catch(() => {});
    };

    const shouldPlay = inView && !reducedMotion && !document.hidden;
    playIntentRef.current = shouldPlay;

    const onCanPlay = () => attemptPlay();
    const onPause = () => {
      // Do not restart when we paused deliberately on scroll-out or because
      // the tab was hidden; only recover from a browser-initiated pause.
      if (playIntentRef.current && !document.hidden && !video.ended) {
        attemptPlay();
      }
    };
    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else if (playIntentRef.current) {
        attemptPlay();
      }
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisibility);

    if (shouldPlay) {
      attemptPlay();
    } else {
      video.pause();
    }

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibility);
      playIntentRef.current = false;
      video.pause();
    };
  }, [inView, reducedMotion]);

  // Nav inversion: light text only while the dark panel is behind the nav.
  // The sentinels cross the nav line, so an IntersectionObserver with a
  // negative top rootMargin is enough to toggle the state in both directions.
  useEffect(() => {
    const section = sectionRef.current;
    const topSentinel = topSentinelRef.current;
    const bottomSentinel = bottomSentinelRef.current;
    const header = document.querySelector<HTMLElement>(".header");
    if (!section || !topSentinel || !bottomSentinel || !header) return;

    const nav = header.querySelector<HTMLElement>(".wp-block-buttons");
    let applied = false;
    let observer: IntersectionObserver | null = null;

    const setDark = (dark: boolean) => {
      if (dark === applied) return;
      applied = dark;
      header.classList.toggle("is-reviews-dark", dark);
    };

    const createObserver = () => {
      observer?.disconnect();
      const navBottom = Math.round(nav?.getBoundingClientRect().bottom ?? 0);
      observer = new IntersectionObserver(
        () => {
          const rect = section.getBoundingClientRect();
          setDark(rect.top <= navBottom && rect.bottom > navBottom);
        },
        { rootMargin: `-${navBottom}px 0px 0px 0px`, threshold: 0 },
      );
      observer.observe(topSentinel);
      observer.observe(bottomSentinel);
    };

    createObserver();
    window.addEventListener("resize", createObserver, { passive: true });

    return () => {
      window.removeEventListener("resize", createObserver);
      observer?.disconnect();
      header.classList.remove("is-reviews-dark");
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = text.trim();
    const author = name.trim() || "Guest";

    if (value.length < 3) {
      setMessage("Please write a few words first.");
      return;
    }

    const next = [
      { n: author, r: "Visitor", s: rating, t: value, now: true },
      ...mine,
    ];
    setMine(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(0, 20)));
    } catch {
      // Ignore storage failures; the review still appears for this visit.
    }
    setText("");
    setMessage("Thanks! Your review was added.");
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className={`rv-section${inView ? " is-active" : ""}`}
      aria-label="Reviews"
    >
      <div ref={topSentinelRef} className="rv-nav-sentinel" aria-hidden="true" />
      <div
        ref={bottomSentinelRef}
        className="rv-nav-sentinel rv-nav-sentinel--bottom"
        aria-hidden="true"
      />

      <div className="rv-bg" aria-hidden="true">
        {reducedMotion ? (
          <img className="rv-media" src={POSTER_SRC} alt="" />
        ) : (
          <video
            ref={videoRef}
            className="rv-media"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            loop
            muted
            playsInline
            preload="metadata"
          />
        )}
        <div className="rv-shade" />
      </div>

      <div className="rv-wrap">
        <div className="rv-left">
          <span className="rv-pill rv-mono">Reviews</span>
          <h2 className="rv-heading">
            Kind words from the people I’ve worked with.
          </h2>
        </div>

        <div className="rv-panel">
          <div className="rv-win" tabIndex={0} aria-label="Reviews, scrolling">
            <div
              className="rv-track"
              ref={trackRef}
              style={duration ? { animationDuration: `${duration}s` } : undefined}
            >
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1 ? true : undefined}>
                  {reviews.map((review, index) => (
                    <ReviewCard
                      key={`${copy}-${index}-${review.n}-${review.t}`}
                      review={review}
                      fresh={copy === 0 && Boolean(review.now)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <form className="rv-compose" onSubmit={handleSubmit}>
            <div className="rv-compose__head">
              <span className="rv-mono">Leave a review</span>
              <div
                className="rv-pick"
                role="radiogroup"
                aria-label="Your rating"
                onMouseLeave={() => setHovered(0)}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} star${value > 1 ? "s" : ""}`}
                    className={value <= shownRating ? "is-on" : undefined}
                    onMouseEnter={() => setHovered(value)}
                    onFocus={() => setHovered(value)}
                    onBlur={() => setHovered(0)}
                    onClick={() => setRating(value)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="rv-bar">
              <label className="rv-sr" htmlFor="rv-name">
                Your name
              </label>
              <input
                id="rv-name"
                className="rv-bar__name"
                maxLength={24}
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <label className="rv-sr" htmlFor="rv-text">
                Your review
              </label>
              <input
                id="rv-text"
                className="rv-bar__text"
                maxLength={240}
                autoComplete="off"
                placeholder="Write a review…"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
              <button className="rv-send" type="submit" aria-label="Post review">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 19V5M6 11l6-6 6 6" />
                </svg>
              </button>
            </div>

            <div className="rv-msg" aria-live="polite">
              {message}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

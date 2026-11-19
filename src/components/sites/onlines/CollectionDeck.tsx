"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type Work = {
  category: string;
  project: string;
  image: string;
  focus: string;
};

const works: Work[] = [
  {
    category: "Brand Posters",
    project: "D’s Kitchen",
    image: "/images/collection/01-brand-posters-ds-kitchen.jpg",
    focus: "50% 40%",
  },
  {
    category: "Thumbnails",
    project: "Travel Verse",
    image: "/images/collection/02-thumbnails-travel-verse.jpg",
    focus: "45% 50%",
  },
  {
    category: "AI Ad Videos",
    project: "D’s Catering",
    image: "/images/collection/03-ai-ad-videos-ds-catering.jpg",
    focus: "62% 50%",
  },
  {
    category: "Carousels",
    project: "Falcon Reality",
    image: "/images/collection/04-carousels-falcon-reality.jpg",
    focus: "50% 30%",
  },
  {
    category: "2D AI Videos",
    project: "Maritime",
    image: "/images/collection/05-2d-ai-videos-maritime.jpg",
    focus: "45% 50%",
  },
  {
    category: "App Design",
    project: "Car-Go",
    image: "/images/collection/06-app-design-car-go.jpg",
    focus: "50% 45%",
  },
  {
    category: "Motion Graphics",
    project: "Thanjavur",
    image: "/images/collection/07-motion-graphics-thanjavur.jpg",
    focus: "50% 50%",
  },
];

const SCALES = [1.5, 0.8, 0.62, 0.48];
const ROTATIONS = [0, 26, 34, 40];
const AUTOPLAY_DELAY = 2800;
const SWIPE_THRESHOLD = 40;

const headingLines = ["A suitcase full of", "my collected works"];
const PIXEL_LETTERS = "nsgae";

function buildHeading() {
  let counter = 0;
  return headingLines.map((line) => {
    const nodes: { char: string; pixel: boolean }[] = [];
    for (const char of line) {
      const pixel =
        PIXEL_LETTERS.includes(char) && counter++ % 2 === 0;
      nodes.push({ char, pixel });
    }
    return nodes;
  });
}

const heading = buildHeading();

// Deterministic "dust" so the server and client markup match.
function seededDust(count: number) {
  let seed = 20261117;
  const next = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: `${next() * 100}%`,
    top: `${25 + next() * 60}%`,
    delay: `${next() * 4}s`,
  }));
}

const dust = seededDust(26);

function pad(value: number) {
  return `0${value}`.slice(-2);
}

export function CollectionDeck() {
  const [current, setCurrent] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previousDistance = useRef<(number | undefined)[]>([]);
  const paused = useRef(false);
  const onScreen = useRef(false);
  const startX = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  const layout = useCallback(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const total = works.length;
    const cardWidth =
      Number.parseFloat(
        getComputedStyle(deck).getPropertyValue("--w"),
      ) || 200;
    const gap = cardWidth * 0.06;

    // Half-width of the centre card, then each successive ring.
    const offsets = [0];
    let outer = (cardWidth * SCALES[0]) / 2;
    for (let ring = 1; ring <= 3; ring += 1) {
      const projected =
        cardWidth * SCALES[ring] * Math.cos((ROTATIONS[ring] * Math.PI) / 180);
      const x = outer + gap + projected / 2;
      offsets[ring] = x;
      outer = x + projected / 2;
    }

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let distance = (((index - current) % total) + total) % total;
      if (distance > total / 2) distance -= total;

      const absolute = Math.abs(distance);
      const ring = Math.min(absolute, 3);
      const sign = distance < 0 ? -1 : 1;
      const previous = previousDistance.current[index];
      const jump =
        previous !== undefined && Math.abs(distance - previous) > 3;

      // Disable the transition only on the frame that wraps around.
      if (jump) card.style.transition = "none";

      card.style.transform = `translate(-50%, -50%) translateX(${
        sign * offsets[ring]
      }px) rotateY(${-sign * ROTATIONS[ring]}deg) scale(${SCALES[ring]})`;
      card.style.zIndex = String(10 - ring);
      card.style.pointerEvents = absolute > 3 ? "none" : "auto";

      card.classList.toggle("is-on", absolute === 0);
      card.classList.toggle("is-left", distance < 0);
      previousDistance.current[index] = distance;

      if (jump) {
        // Force a reflow before restoring the transition.
        void card.offsetWidth;
        card.style.transition = "";
      }
    });
  }, [current]);

  useEffect(() => {
    layout();
  }, [layout]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedMotion.current = media.matches;
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [layout]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting;
      },
      { threshold: 0.15 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (
        paused.current ||
        reducedMotion.current ||
        !onScreen.current ||
        document.hidden
      ) {
        return;
      }
      setCurrent((value) => (value - 1 + works.length) % works.length);
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(id);
  }, []);

  const go = useCallback((index: number) => {
    setCurrent(((index % works.length) + works.length) % works.length);
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      go(current + (delta < 0 ? 1 : -1));
    }
  };

  const handlePointerCancel = () => {
    startX.current = null;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(current + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(current - 1);
    }
  };

  const active = works[current];

  return (
    <div className="collection-page" ref={rootRef}>
      <h1 className="collection-title">
        {heading.map((line, lineIndex) => (
          <span key={lineIndex}>
            {line.map((node, index) =>
              node.pixel ? (
                <span className="collection-title__px" key={`${lineIndex}-${index}`}>
                  {node.char}
                </span>
              ) : (
                <span key={`${lineIndex}-${index}`}>{node.char}</span>
              ),
            )}
            {lineIndex < heading.length - 1 ? <br /> : null}
          </span>
        ))}
      </h1>

      <p className="collection-sub">
        Posters, thumbnails, AI videos, app design and motion, rolling past in
        one place.
      </p>

      <a
        className="collection-cta"
        href="https://www.behance.net/navind5"
        target="_blank"
        rel="noopener noreferrer"
      >
        View all works
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>

      <div
        className="collection-deck"
        ref={deckRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Selected works"
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          paused.current = false;
        }}
        onFocus={() => {
          paused.current = true;
        }}
        onBlur={() => {
          paused.current = false;
        }}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {dust.map((particle) => (
          <i
            className="collection-dust"
            key={particle.id}
            aria-hidden="true"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
            }}
          />
        ))}

        {works.map((work, index) => (
          <div
            className="collection-work"
            key={work.image}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            onClick={() => go(index)}
          >
            <div
              className="collection-work__art"
              style={{
                backgroundImage: `url(${work.image})`,
                backgroundPosition: work.focus,
              }}
            />
            <div className="collection-work__gray">
              <div
                className="collection-work__g2"
                style={{
                  backgroundImage: `url(${work.image})`,
                  backgroundPosition: work.focus,
                }}
              />
            </div>
            <div className="collection-work__line" />
          </div>
        ))}
      </div>

      <div className="collection-cap" aria-live="polite">
        <b>
          {pad(current + 1)} / {pad(works.length)}
        </b>
        {`${active.category}  ·  ${active.project}`}
      </div>

      <section className="collection-feats">
        <div>
          <h3>
            Posters, Thumbnails
            <br />
            &amp; Carousels
          </h3>
          <p>
            Brand posters, scroll-stopping thumbnails and carousels for food
            brands, creators and maritime AI content.
          </p>
        </div>
        <div>
          <h3>
            AI Ad &amp;
            <br />
            2D Videos
          </h3>
          <p>
            AI-generated ad films and 2D animated stories for catering brands
            and the maritime industry.
          </p>
        </div>
        <div>
          <h3>
            App Design &amp;
            <br />
            Motion Graphics
          </h3>
          <p>
            App interfaces and product motion graphics, designed for clarity
            and made to feel smooth.
          </p>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type ProjectCard = {
  index: string;
  title: string;
  category: string;
  description: string;
  poster: string;
  media: { kind: "gif" | "video"; src: string };
  href: string;
};

const assetBase = "/sites/onlines/project-cards/";

const cards: ProjectCard[] = [
  {
    index: "01",
    title: "Gradiance",
    category: "Mobile product",
    description:
      "A mobile color grading concept for filmmakers: cinematic looks, color wheels and scopes in a focused, touch-first interface.",
    poster: `${assetBase}gradiance-poster.jpg`,
    media: { kind: "gif", src: `${assetBase}gradiance.gif` },
    href: "https://www.behance.net/gallery/235333881/Gradiance-Video-Color-Grading-App",
  },
  {
    index: "02",
    title: "Maritime Mentorship",
    category: "2D AI Video",
    description:
      "A 2D AI-generated video series that guides aspiring seafarers through life at sea, with experienced mentors, clear storytelling and animated visuals.",
    poster: `${assetBase}mentorship-poster.jpg`,
    media: { kind: "video", src: `${assetBase}mentorship.mp4` },
    href: "https://imec.helms.in/",
  },
  {
    index: "03",
    title: "BTRM Video",
    category: "AI Realistic Video",
    description:
      "A maritime video showing the real challenges of life aboard a ship, brought to life with AI-generated realistic footage.",
    poster: `${assetBase}btrm-poster.jpg`,
    media: { kind: "video", src: `${assetBase}btrm.mp4` },
    // TODO: replace with the dedicated BTRM project URL once it exists.
    href: "https://www.behance.net/navind5",
  },
];

type PointEvent = { clientX: number; clientY: number } | null | undefined;

export function ProjectCards() {
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initialGrid = gridRef.current;
    if (!initialGrid) return;
    const grid: HTMLElement = initialGrid;

    const cardEls = Array.from(grid.children) as HTMLElement[];
    const DEFAULT_ACTIVE = 1;
    const still = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const controller = new AbortController();
    const timers: number[] = [];
    let observer: IntersectionObserver | undefined;
    let idleId: number | undefined;
    let active = -1;
    let ready = false;

    function origin(card: HTMLElement, event?: PointEvent) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty(
        "--cx",
        `${event ? event.clientX - rect.left : rect.width / 2}px`,
      );
      card.style.setProperty(
        "--cy",
        `${event ? event.clientY - rect.top : rect.height / 2}px`,
      );
    }

    function stopMotion(card: HTMLElement) {
      const motion = card.querySelector<HTMLImageElement | HTMLVideoElement>(
        ".pc-motion",
      );
      if (!motion) return;

      if (motion instanceof HTMLVideoElement) {
        motion.pause();
        try {
          motion.currentTime = 0;
        } catch {
          // Some browsers throw before metadata is available.
        }
        return;
      }

      // A fresh image element restarts the GIF from its first frame.
      const fresh = document.createElement("img");
      fresh.className = "pc-motion";
      fresh.alt = "";
      fresh.setAttribute("aria-hidden", "true");
      motion.replaceWith(fresh);
    }

    function playMotion(card: HTMLElement) {
      if (still) return;

      const video = card.querySelector<HTMLVideoElement>("video.pc-motion");
      if (video) {
        try {
          video.currentTime = 0;
        } catch {
          // Ignored until the video has seekable metadata.
        }
        const playRequest = video.play();
        if (playRequest && playRequest.catch) playRequest.catch(() => {});
        return;
      }

      const motion = card.querySelector<HTMLImageElement>("img.pc-motion");
      const gifSrc = card.getAttribute("data-gif");
      if (!motion || !gifSrc) return;

      const fresh = document.createElement("img");
      fresh.className = "pc-motion";
      fresh.alt = "";
      fresh.setAttribute("aria-hidden", "true");
      fresh.src = gifSrc;
      motion.replaceWith(fresh);
    }

    function activate(index: number, event?: PointEvent, play = false) {
      if (
        index === active &&
        (!play || cardEls[index].classList.contains("pc-playing"))
      ) {
        return;
      }
      if (active > -1 && active !== index) {
        const previous = cardEls[active];
        previous.classList.remove("pc-on", "pc-playing");
        stopMotion(previous);
      }
      const card = cardEls[index];
      if (active !== index) origin(card, event);
      card.classList.add("pc-on");
      active = index;
      if (play) {
        card.classList.add("pc-playing");
        playMotion(card);
      }
    }

    function reset() {
      if (active > -1) {
        const previous = cardEls[active];
        previous.classList.remove("pc-on", "pc-playing");
        stopMotion(previous);
      }
      active = -1;
      if (DEFAULT_ACTIVE > -1) activate(DEFAULT_ACTIVE, null, false);
    }

    function start() {
      grid.classList.add("pc-in");
      const wide = window.matchMedia("(min-width:981px)").matches;
      timers.push(window.setTimeout(reset, wide ? 1750 : 1300));
      timers.push(
        window.setTimeout(() => {
          ready = true;
        }, wide ? 2500 : 1900),
      );
    }

    if (still || !("IntersectionObserver" in window)) {
      grid.classList.add("pc-in");
      ready = true;
      timers.push(window.setTimeout(reset, 0));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer?.disconnect();
            start();
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(grid);
    }

    const preloadGifs = () => {
      cardEls.forEach((card) => {
        const src = card.getAttribute("data-gif");
        if (src) {
          const image = new Image();
          image.src = src;
        }
      });
    };
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(preloadGifs);
    } else {
      idleId = window.setTimeout(preloadGifs, 800);
    }

    cardEls.forEach((card, index) => {
      if (fine) {
        card.addEventListener(
          "pointerenter",
          (event) => {
            if (ready) activate(index, event, true);
          },
          { signal: controller.signal },
        );
      }
      card.addEventListener(
        "focusin",
        (event) => {
          // Only keyboard focus reveals the media. A tap also focuses the
          // link, but that must be handled by the two-tap click logic below.
          if (
            ready &&
            event.target instanceof Element &&
            event.target.matches(":focus-visible")
          ) {
            activate(index, null, true);
          }
        },
        { signal: controller.signal },
      );
      // Touch: the first tap reveals/plays the media, the second opens the link.
      card.addEventListener(
        "click",
        (event) => {
          if (!fine && !card.classList.contains("pc-playing")) {
            event.preventDefault();
            activate(index, event, true);
          }
        },
        { signal: controller.signal },
      );
    });
    grid.addEventListener(
      "pointerleave",
      () => {
        if (fine && ready) reset();
      },
      { signal: controller.signal },
    );
    grid.addEventListener(
      "focusout",
      (event) => {
        if (!grid.contains(event.relatedTarget as Node | null)) reset();
      },
      { signal: controller.signal },
    );

    return () => {
      controller.abort();
      observer?.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      if (idleId !== undefined) {
        if (typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleId);
        } else {
          window.clearTimeout(idleId);
        }
      }
      grid.classList.remove("pc-in");
      cardEls.forEach((card) => {
        card.classList.remove("pc-on", "pc-playing");
        card.style.removeProperty("--cx");
        card.style.removeProperty("--cy");
      });
    };
  }, []);

  return (
    <div id="projects" className="pc-root">
      <section className="pc-grid" ref={gridRef} aria-label="Projects">
        {cards.map((card, index) => (
          <article
            key={card.index}
            className="pc-card"
            style={{ "--i": index } as CSSProperties}
            data-gif={card.media.kind === "gif" ? card.media.src : undefined}
          >
            <div className="pc-media">
              <img className="pc-poster" src={card.poster} alt="" />
              {card.media.kind === "video" ? (
                <video
                  className="pc-motion"
                  src={card.media.src}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                />
              ) : (
                <img
                  className="pc-motion"
                  src={card.media.src}
                  alt=""
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="pc-top">
              <h3>
                <a href={card.href}>
                  <span className="pc-tx">
                    {card.title}
                    <sup className="pc-mono">{card.index}</sup>
                  </span>
                </a>
              </h3>
              <span className="pc-go" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </span>
            </div>
            <div className="pc-bot">
              <span className="pc-mono">{card.category}</span>
              <p>{card.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

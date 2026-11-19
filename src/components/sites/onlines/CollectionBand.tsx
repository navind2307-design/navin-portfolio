"use client";

import { useEffect, useRef } from "react";
import { CollectionDeck } from "./CollectionDeck";

const NAV_DARK_CLASS = "is-collection-dark";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function CollectionBand() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const panel = wrapper.querySelector<HTMLElement>(".collection-band");
    if (!panel) return;

    const fade = wrapper.querySelector<HTMLElement>(".collection-fade");
    const content = wrapper.querySelector<HTMLElement>(".collection-page");
    const nav = document.querySelector<HTMLElement>(
      ".header .wp-block-buttons",
    );
    const root = document.documentElement;
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let reduced = motionQuery.matches;
    let frame = 0;
    let navDark = false;
    let navApplied = false;
    let lastProgress = Number.NaN;
    let lastReveal = Number.NaN;

    const update = () => {
      frame = 0;

      const vh = window.innerHeight || 1;
      const panelTop = panel.getBoundingClientRect().top;

      let progress = 1;
      let reveal = 1;

      if (!reduced) {
        // 0 when the panel is one viewport below the fold, 1 by 20% from
        // the top of the viewport.
        progress = clamp01((vh - panelTop) / (vh * 0.8));

        // Content reveals as it crosses the lower half of the viewport.
        const contentTop = content
          ? content.getBoundingClientRect().top
          : panelTop;
        reveal = clamp01((vh - contentTop) / (vh * 0.5));
      }

      const progressRounded = Math.round(progress * 10000) / 10000;
      const revealRounded = Math.round(reveal * 10000) / 10000;

      if (progressRounded !== lastProgress) {
        lastProgress = progressRounded;
        wrapper.style.setProperty(
          "--coll-progress",
          String(progressRounded),
        );
      }

      if (revealRounded !== lastReveal) {
        lastReveal = revealRounded;
        wrapper.style.setProperty("--coll-reveal", String(revealRounded));
      }

      if (nav) {
        const navBottom = nav.getBoundingClientRect().bottom;
        let ratio = 0;

        if (fade) {
          const fadeRect = fade.getBoundingClientRect();
          if (fadeRect.height > 0) {
            ratio = clamp01((navBottom - fadeRect.top) / fadeRect.height);
          }
        }

        if (panel.getBoundingClientRect().bottom <= navBottom) {
          // Collection has scrolled above the nav; release the dark state
          // so later sections control the nav colours.
          navDark = false;
        } else if (!navDark) {
          // Turn light once the nav is over the dark end of the fade or
          // the panel itself.
          if (ratio >= 0.48 || panelTop <= navBottom) {
            navDark = true;
          }
        } else if (ratio <= 0.3 && panelTop > navBottom + 8) {
          navDark = false;
        }

        if (navDark !== navApplied) {
          navApplied = navDark;
          root.classList.toggle(NAV_DARK_CLASS, navDark);
        }
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const handleMotionChange = () => {
      reduced = motionQuery.matches;
      lastProgress = Number.NaN;
      lastReveal = Number.NaN;
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.visualViewport?.addEventListener("resize", schedule);
    motionQuery.addEventListener("change", handleMotionChange);

    // Apply the current state immediately; scroll/resize keep it in sync.
    update();
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      motionQuery.removeEventListener("change", handleMotionChange);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove(NAV_DARK_CLASS);
    };
  }, []);

  return (
    <div className="collection-transition" ref={wrapperRef}>
      <div className="collection-fade" aria-hidden="true" />
      <section id="collection" className="collection-band">
        <CollectionDeck />
      </section>
    </div>
  );
}

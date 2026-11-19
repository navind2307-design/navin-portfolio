"use client";

import { useEffect } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { QuoteBlock } from "./QuoteBlock";
import { Servicios } from "./Servicios";
import { DarkMode } from "./DarkMode";
import { Experience } from "./Experience";
import { CollectionBand } from "./CollectionBand";
import { ProjectCards } from "./ProjectCards";
import { Reviews } from "./Reviews";
import { Contacto } from "./Contacto";
import { Footer } from "./Footer";

async function initOnlinesScripts() {
  // Shared components must exist before the block scripts run.
  await import("./vendor/grilla-celdas.js");
  await import("./vendor/patron-puntos.js");
  await import("./vendor/shader-halftone.js");

  await import("./vendor/header-logo.js");
  await import("./vendor/home-hero.js");
  await import("./vendor/home-quote-block.js");
  await import("./vendor/home-servicios.js");
  await import("./vendor/card-servicio.js");
  await import("./vendor/home-bloque-dark-mode.js");
  await import("./vendor/home-contacto.js");
}

export function OnlinesHome() {
  useEffect(() => {
    let cancelled = false;

    initOnlinesScripts().catch((error) => {
      if (!cancelled) {
        console.error("[onlines] failed to init page scripts", error);
      }
    });

    return () => {
      cancelled = true;
      document.documentElement.classList.remove("is-hero-scroll-lock");
      window.dispatchEvent(new Event("onlines:lenis-start"));
    };
  }, []);

  return (
    <div className="wp-site-blocks">
      <Header />
      <Hero />
      <QuoteBlock />
      <Servicios />
      <DarkMode />
      <Experience />
      <CollectionBand />
      <ProjectCards />
      <Reviews />
      <Contacto />
      <Footer />
    </div>
  );
}

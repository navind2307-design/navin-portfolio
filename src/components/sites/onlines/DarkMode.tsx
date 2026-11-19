import { Halftone, type HalftoneConfig } from "./Halftone";

const laptopConfig: HalftoneConfig = {
  imageUrl: "/sites/onlines/dark/trama-textura.webp",
  width: 386,
  height: 358,
  colorBack: "#021133",
  colorFront: "#1f6bff",
  originalColors: false,
  inverted: false,
  size: 0.01,
  radius: 1.01,
  contrast: 0.01,
  grainMixer: 0.11,
  grainOverlay: 0,
  grainSize: 0,
  scale: 1,
  fit: "cover",
};

export function DarkMode() {
  return (
    <section className="home-bloque-dark-mode px-1rem-mob wp-block-onlines-home-bloque-dark-mode">
      <div className="home-bloque-dark-mode__container">
        <div className="home-bloque-dark-mode__card">
          <div className="home-bloque-dark-mode__contenido">
            <span
              className="home-bloque-dark-mode__drag-area js-home-bloque-dark-mode-drag-area"
              aria-hidden="true"
            />
            <div className="home-bloque-dark-mode__titulo-wrap js-home-bloque-dark-mode-titulo">
              <div
                className="home-bloque-dark-mode__seleccion"
                aria-hidden="true"
              >
                <div className="home-bloque-dark-mode__seleccion-borde" />
                <span className="home-bloque-dark-mode__handle home-bloque-dark-mode__handle--tl" />
                <span className="home-bloque-dark-mode__handle home-bloque-dark-mode__handle--tc" />
                <span className="home-bloque-dark-mode__handle home-bloque-dark-mode__handle--tr" />
                <span className="home-bloque-dark-mode__handle home-bloque-dark-mode__handle--bl" />
                <span className="home-bloque-dark-mode__handle home-bloque-dark-mode__handle--bc" />
                <span className="home-bloque-dark-mode__handle home-bloque-dark-mode__handle--br" />
              </div>
              <h3 className="home-bloque-dark-mode__titulo">
                From concept to creation.
              </h3>
            </div>
            <div className="home-bloque-dark-mode__parrafos">
              <p className="home-bloque-dark-mode__descripcion">
                I combine design, storytelling and AI-powered creative
                workflows to transform ideas into engaging visual experiences.
              </p>
              <p className="home-bloque-dark-mode__texto-secundario">
                From the first concept to the final output, every detail matters
                in creating visuals that communicate effectively.
              </p>
            </div>
            <div className="home-bloque-dark-mode__boton-wrap">
              <a
                className="home-bloque-dark-mode__boton"
                href="https://www.behance.net/navind5"
                target="_blank"
                rel="noopener noreferrer"
                title="Explore my work"
                aria-label="Explore my work"
              >
                Explore my work
              </a>
            </div>
          </div>

          <div className="home-bloque-dark-mode__pc" aria-hidden="true">
            <div className="home-bloque-dark-mode__pc-fondo" />
            <div className="home-bloque-dark-mode__pc-trama">
              <img
                fetchPriority="low"
                src="/sites/onlines/dark/trama-textura.webp"
                alt="Animated laptop screen"
                width={951}
                height={1033}
                decoding="async"
              />
            </div>
            <Halftone
              className="home-bloque-dark-mode__pc-shader"
              config={laptopConfig}
            />
            <img
              fetchPriority="low"
              className="home-bloque-dark-mode__pc-laptop"
              src="/sites/onlines/dark/laptop.webp"
              alt="Laptop"
              width={450}
              height={447}
              decoding="async"
            />
          </div>
        </div>
        <div className="home-bloque-dark-mode__footer">
          <p className="home-bloque-dark-mode__footer-texto">
            Based in India, collaborating with brands and storytellers
            worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}

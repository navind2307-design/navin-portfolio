import { Halftone, type HalftoneConfig } from "./Halftone";

const services = [
  {
    image: "fondo-1.webp",
    title: "Graphic & Interface Design",
    description:
      "Creating meaningful visual identities and intuitive digital experiences through graphic design, UI/UX and thoughtful visual communication.",
    below:
      "Building brands and interfaces that feel clear, considered and human.",
  },
  {
    image: "fondo-2.webp",
    title: "Motion Graphics & Animation",
    description:
      "Bringing ideas to life through 2D motion graphics, animated storytelling, kinetic typography and engaging visual content.",
    below:
      "Giving every story rhythm, movement and a distinct visual voice.",
  },
  {
    image: "fondo-3.webp",
    title: "AI-Powered Visual Creation",
    description:
      "Exploring AI image generation, character creation and animation to produce compelling visuals for brands, campaigns and storytelling.",
    below:
      "Expanding what one creative can produce with thoughtful AI workflows.",
  },
];

function serviceConfig(image: string): HalftoneConfig {
  return {
    imageUrl: `/sites/onlines/servicios/${image}`,
    width: 452,
    height: 520,
    colorBack: "#000c38",
    colorFront: "#94ffaf",
    originalColors: true,
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
}

export function Servicios() {
  return (
    <section className="home-servicios px-1rem-mob home-servicios--vertical wp-block-onlines-home-servicios">
      <div className="home-servicios__grilla">
        {services.map((service) => (
          <article className="card-servicio-article" key={service.title}>
            <a
              href="https://www.behance.net/navind5"
              className="card-servicio card-servicio--vertical wp-block-onlines-card-servicio"
              target="_blank"
              rel="noopener noreferrer"
              title="View my work"
              aria-label="View my work"
            >
              <div className="card-servicio__tarjeta">
                <Halftone
                  className="card-servicio__shader"
                  config={serviceConfig(service.image)}
                />
                <div className="card-servicio__textos">
                  <h3
                    className="card-servicio__titulo js-card-servicio-titulo"
                    data-card-servicio-title={service.title}
                  >
                    <span className="card-servicio__titulo-texto">
                      {service.title}
                    </span>
                  </h3>
                  <p className="card-servicio__descripcion">
                    {service.description}
                  </p>
                </div>
                <span
                  className="card-servicio__cta card-servicio__cta--vertical"
                  aria-hidden="true"
                >
                  View services
                </span>
              </div>
              <p className="card-servicio__texto-debajo">{service.below}</p>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

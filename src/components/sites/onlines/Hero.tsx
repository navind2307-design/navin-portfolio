import { CursorIcon } from "./icons";

type CursorSpec = {
  key: string;
  label: string;
  color: string;
  delay: number;
  offsetX: number;
  offsetY: number;
  darkText?: boolean;
};

const cursors: CursorSpec[] = [
  {
    key: "desarrollador",
    label: "Animator",
    color: "var(--wp--preset--color--custom-figma-turquesa)",
    delay: 0,
    offsetX: -400,
    offsetY: 400,
  },
  {
    key: "cliente",
    label: "Client",
    color: "var(--wp--preset--color--custom-figma-naranja)",
    delay: 510,
    offsetX: 400,
    offsetY: 300,
  },
  {
    key: "director",
    label: "Creative director",
    color: "var(--wp--preset--color--custom-figma-verde)",
    delay: 1020,
    offsetX: -200,
    offsetY: -350,
  },
  {
    key: "ui",
    label: "Graphic designer",
    color: "var(--wp--preset--color--custom-figma-violeta)",
    delay: 255,
    offsetX: -500,
    offsetY: -100,
  },
  {
    key: "ux",
    label: "Motion designer",
    color: "var(--wp--preset--color--custom-figma-rosa)",
    delay: 765,
    offsetX: -350,
    offsetY: 100,
  },
  {
    key: "pm",
    label: "AI artist",
    color: "var(--wp--preset--color--custom-figma-celeste)",
    delay: 1360,
    offsetX: 300,
    offsetY: -50,
  },
  {
    key: "desarrollador2",
    label: "Animator",
    color: "var(--wp--preset--color--custom-figma-amarillo)",
    delay: 1700,
    offsetX: 200,
    offsetY: 400,
    darkText: true,
  },
];

function FigmaComment({
  delay,
  text,
  className,
  parallax,
  center,
}: {
  delay: number;
  text: string;
  className: string;
  parallax: number;
  center?: boolean;
}) {
  return (
    <div
      className={`comentario-figma home-hero__elemento home-hero__comentario ${className} js-home-hero-fadein js-home-hero-float`}
      data-fadein-delay={delay}
      data-float-parallax={parallax}
      data-float-center={center ? "1" : undefined}
      aria-hidden="true"
    >
      <div className="comentario-figma__burbuja">
        <img
          className="comentario-figma__avatar"
          src="/sites/onlines/ui/onlines-avatar.svg"
          alt="Figma user"
          width={30}
          height={30}
          loading="eager"
          decoding="async"
        />
        <div className="comentario-figma__contenido">
          <p className="comentario-figma__header">
            <strong>Navin D</strong> <span>just now</span>
          </p>
          <p className="comentario-figma__texto">{text}</p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="home-hero wp-block-onlines-home-hero">
      <div className="home-hero__inner">
        <div
          className="home-hero__grilla grilla-celdas js-home-hero-grilla"
          aria-hidden="true"
        />

        <div
          className="home-hero__seleccion js-home-hero-seleccion"
          aria-hidden="true"
        >
          <div className="home-hero__seleccion-borde">
            <span className="home-hero__handle home-hero__handle--tl" />
            <span className="home-hero__handle home-hero__handle--tr" />
            <span className="home-hero__handle home-hero__handle--tc" />
            <span className="home-hero__handle home-hero__handle--bl" />
            <span className="home-hero__handle home-hero__handle--br" />
            <span className="home-hero__handle home-hero__handle--bc" />
          </div>
        </div>

        <h3 className="home-hero__titulo">NAVIN D</h3>

        <div
          className="home-hero__elemento home-hero__wireframe js-home-hero-fadein js-home-hero-float"
          data-fadein-delay={200}
          data-float-parallax="0.10"
          aria-hidden="true"
        >
          <img
            src="/sites/onlines/hero/wireframe.svg"
            alt="Wireframe"
            width={214}
            height={160}
            loading="eager"
            decoding="async"
          />
        </div>

        <div
          className="home-hero__elemento home-hero__codigo js-home-hero-fadein js-home-hero-float"
          data-fadein-delay={1600}
          data-float-parallax="0.13"
          aria-hidden="true"
        >
          <div className="home-hero__codigo-fondo">
            <img
              src="/sites/onlines/hero/codigo.svg"
              alt="Source code"
              width={214}
              height={160}
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="home-hero__codigo-texto js-home-hero-typing" />
        </div>

        <div
          className="home-hero__elemento home-hero__chat js-home-hero-fadein js-home-hero-float"
          data-fadein-delay={1400}
          data-float-parallax="0.08"
          aria-hidden="true"
        >
          <img
            src="/sites/onlines/hero/chat.svg"
            alt="Chat"
            width={214}
            height={160}
            loading="eager"
            decoding="async"
          />
        </div>

        <div
          className="home-hero__elemento home-hero__diseno js-home-hero-fadein js-home-hero-float"
          data-fadein-delay={400}
          data-float-parallax="0.16"
          aria-hidden="true"
        >
          <div className="home-hero__diseno-borde" />
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet="/sites/onlines/hero/diseno.avif"
              type="image/avif"
            />
            <source
              media="(min-width: 1024px)"
              srcSet="/sites/onlines/hero/diseno.webp"
              type="image/webp"
            />
            <source
              srcSet="/sites/onlines/hero/diseno-mobile.avif"
              type="image/avif"
            />
            <img
              src="/sites/onlines/hero/diseno-mobile.webp"
              alt="Custom design"
              width={360}
              height={270}
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>

        <div
          className="home-hero__elemento home-hero__pc js-home-hero-fadein js-home-hero-float"
          data-fadein-delay={800}
          data-float-parallax="0.18"
          aria-hidden="true"
        >
          <div className="home-hero__pc-contenedor">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet="/sites/onlines/hero/pc-screen.avif"
                type="image/avif"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="/sites/onlines/hero/pc-screen.webp"
                type="image/webp"
              />
              <source
                srcSet="/sites/onlines/hero/pc-screen-mobile.avif"
                type="image/avif"
              />
              <img
                className="home-hero__pc-screen"
                src="/sites/onlines/hero/pc-screen-mobile.webp"
                alt="Laptop"
                width={326}
                height={208}
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        <div
          className="home-hero__elemento home-hero__celular js-home-hero-fadein js-home-hero-float"
          data-fadein-delay={1100}
          data-float-parallax="0.11"
          aria-hidden="true"
        >
          <div className="home-hero__celular-contenedor">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet="/sites/onlines/hero/celular-screen.avif"
                type="image/avif"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="/sites/onlines/hero/celular-screen.webp"
                type="image/webp"
              />
              <source
                srcSet="/sites/onlines/hero/celular-screen-mobile.avif"
                type="image/avif"
              />
              <img
                className="home-hero__celular-screen"
                src="/sites/onlines/hero/celular-screen-mobile.webp"
                alt="Phone"
                width={94}
                height={193}
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        <div
          className="home-hero__elemento home-hero__switch js-home-hero-fadein js-home-hero-float"
          data-fadein-delay={900}
          data-float-parallax="0.06"
          data-float-center="1"
          aria-hidden="true"
        >
          <div
            className="home-hero__switch-pill js-home-hero-switch"
            data-switch-interval={4000}
          >
            <span className="home-hero__switch-label">AI mode</span>
            <span className="home-hero__switch-toggle">
              <span className="home-hero__switch-toggle-knob" />
            </span>
          </div>
        </div>

        <FigmaComment
          className="home-hero__comentario--1"
          delay={1200}
          parallax={0.09}
          text="Let's bring this idea to life."
        />
        <FigmaComment
          className="home-hero__comentario--2"
          delay={1800}
          parallax={0.12}
          center
          text="Designed, animated and AI-assisted."
        />

        <div className="home-hero__apps" aria-hidden="true">
          {[
            { cls: "vscode", src: "app-vscode.svg", alt: "Visual Studio Code", w: 30, h: 30, parallax: 0.05 },
            { cls: "figma", src: "app-figma.webp", alt: "Figma", w: 20, h: 30, parallax: 0.06 },
            { cls: "notion", src: "app-notion.svg", alt: "Notion", w: 29, h: 30, parallax: 0.05 },
            { cls: "notion2", src: "app-notion2.svg", alt: "NextJS", w: 30, h: 30, parallax: 0.07 },
            { cls: "wordpress", src: "app-wordpress.webp", alt: "WordPress", w: 30, h: 30, parallax: 0.05, center: true },
          ].map((app) => (
            <div
              key={app.cls}
              className={`home-hero__app home-hero__app--${app.cls} js-home-hero-app js-home-hero-float`}
              data-float-parallax={app.parallax}
              data-float-center={app.center ? "1" : undefined}
            >
              <img
                src={`/sites/onlines/hero/${app.src}`}
                alt={app.alt}
                width={app.w}
                height={app.h}
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </div>

        <div className="home-hero__cursores" aria-hidden="true">
          {cursors.map((cursor) => (
            <div
              key={cursor.key}
              className={`home-hero__cursor home-hero__cursor--${cursor.key} js-home-hero-cursor`}
              data-offset-x={cursor.offsetX}
              data-offset-y={cursor.offsetY}
              data-cursor-delay={cursor.delay}
            >
              <CursorIcon
                filterId={`hero-cursor-${cursor.key}`}
                fill={cursor.color}
              />
              <span
                className="home-hero__cursor-label"
                style={{
                  background: cursor.color,
                  color: cursor.darkText
                    ? "var(--wp--preset--color--custom-titulos)"
                    : undefined,
                }}
              >
                {cursor.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

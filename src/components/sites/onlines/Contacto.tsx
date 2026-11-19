import { CursorIcon } from "./icons";

const cards = [
  {
    index: 1,
    delay: 0,
    image: "tarjeta-metricas.webp",
    alt: "Metrics dashboard",
    flat: true,
  },
  {
    index: 2,
    delay: 180,
    image: "tarjeta-persona-notebook.webp",
    alt: "Person working on a laptop",
  },
  {
    index: 3,
    delay: 360,
    image: "tarjeta-mano-sobre-escritorio.webp",
    alt: "Hand on a desk with a laptop",
  },
];

const apps = [
  { index: 1, delay: 0, image: "app-google-doc.svg", alt: "Google Docs", w: 29, h: 40 },
  { index: 2, delay: 120, image: "app-notion.svg", alt: "Notion", w: 30, h: 30 },
  { index: 3, delay: 240, image: "app-vscode.svg", alt: "VS Code", w: 30, h: 30 },
  { index: 4, delay: 360, image: "app-figma.webp", alt: "Figma", w: 20, h: 30 },
  { index: 5, delay: 480, image: "app-cursor.svg", alt: "Cursor", w: 30, h: 30 },
];

export function Contacto() {
  return (
    <section
      id="contact"
      className="home-contacto wp-block-onlines-home-contacto"
    >
      <div className="home-contacto__inner">
        <div className="home-contacto__grilla">
          <div className="home-contacto__animaciones">
            <div
              className="home-contacto__dots patron-puntos js-home-contacto-dots"
              aria-hidden="true"
            />
            <div
              className="home-contacto__aa js-home-contacto-aa"
              aria-hidden="true"
            >
              Aa
            </div>

            {cards.map((card) => (
              <div
                key={card.index}
                className={`home-contacto__tarjeta home-contacto__tarjeta--${card.index} js-home-contacto-card`}
                data-card-delay={card.delay}
                aria-hidden="true"
              >
                {card.flat ? (
                  <img
                    src={`/sites/onlines/contacto/${card.image}`}
                    alt={card.alt}
                    width={283}
                    height={164}
                    loading="lazy"
                    decoding="async"
                    className="home-contacto__tarjeta-img home-contacto__tarjeta-img--flat"
                  />
                ) : (
                  <>
                    <div
                      className="home-contacto__tarjeta-layer"
                      aria-hidden="true"
                    >
                      <div className="home-contacto__tarjeta-rotada">
                        <div className="home-contacto__tarjeta-marco" />
                      </div>
                    </div>
                    <div className="home-contacto__tarjeta-layer home-contacto__tarjeta-layer--media">
                      <div className="home-contacto__tarjeta-rotada">
                        <div className="home-contacto__tarjeta-media">
                          <img
                            src={`/sites/onlines/contacto/${card.image}`}
                            alt={card.alt}
                            width={199}
                            height={149}
                            loading="lazy"
                            decoding="async"
                            className="home-contacto__tarjeta-img"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}

            <div
              className="home-contacto__chat js-home-contacto-chat"
              aria-hidden="true"
            >
              <div className="home-contacto__chat-rotada">
                <img
                  src="/sites/onlines/contacto/chat.svg"
                  alt="Chat interface"
                  width={214}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  className="home-contacto__chat-img"
                />
              </div>
            </div>

            {apps.map((app) => (
              <div
                key={app.index}
                className={`home-contacto__app home-contacto__app--${app.index} js-home-contacto-app`}
                data-delay={app.delay}
                aria-hidden="true"
              >
                <div className="home-contacto__app-burbuja">
                  <img
                    src={`/sites/onlines/contacto/${app.image}`}
                    alt={app.alt}
                    width={app.w}
                    height={app.h}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}

            <div
              className="home-contacto__cursor js-home-contacto-cursor"
              aria-hidden="true"
            >
              <CursorIcon filterId="contact-cursor" fill="#ef5533" />
              <span
                className="home-contacto__cursor-label"
                style={{ background: "#ef5533" }}
              >
                Client
              </span>
            </div>
          </div>

          <div className="home-contacto__contenido px-1rem-mob">
            <h3 className="home-contacto__titulo">
              <span className="home-contacto__titulo-linea">
                <span className="home-contacto__titulo-texto">
                  {"Let's create something "}
                </span>
                <span
                  className="home-contacto__titulo-puntos"
                  aria-hidden="true"
                />
              </span>
              <span className="home-contacto__titulo-linea">
                <span className="home-contacto__titulo-texto">
                  {"remarkable together "}
                </span>
                <span
                  className="home-contacto__titulo-puntos"
                  aria-hidden="true"
                />
              </span>
            </h3>
            <p className="home-contacto__descripcion">
              Have a project in mind? I&apos;d love to hear about it. Let&apos;s
              turn your ideas into visuals that connect, move and stay with
              people.
            </p>
            <div className="home-contacto__botonera">
              <a
                className="home-contacto__boton"
                href="https://www.linkedin.com/in/navin-d-b97b85281/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                title="Let's connect on LinkedIn"
                aria-label="Let's connect on LinkedIn"
              >
                Let&apos;s connect
              </a>
              <a
                className="home-contacto__social"
                href="https://www.instagram.com/navin_.__/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
              >
                <img
                  src="/sites/onlines/ui/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={13}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                className="home-contacto__social"
                href="https://www.linkedin.com/in/navin-d-b97b85281/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <img
                  src="/sites/onlines/ui/linkedin.svg"
                  alt="LinkedIn"
                  width={20}
                  height={13}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                className="home-contacto__social"
                href="https://www.behance.net/navind5"
                target="_blank"
                rel="nofollow noopener noreferrer"
                title="Behance"
                aria-label="Behance"
              >
                <img
                  src="/sites/onlines/ui/behance.svg"
                  alt="Behance"
                  width={20}
                  height={13}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

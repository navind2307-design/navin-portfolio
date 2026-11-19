"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

type IconName = "pen" | "film" | "layout" | "spark";

type Fact = {
  label: string;
  value: string;
  live?: boolean;
};

type Role = {
  index: string;
  company: string;
  role: string;
  icon: IconName;
  current?: boolean;
  facts: Fact[];
};

const roles: Role[] = [
  {
    index: "01",
    company: "TPCC Studio",
    role: "Graphic Designer Intern",
    icon: "pen",
    facts: [
      { label: "Location", value: "Coimbatore" },
      { label: "Started", value: "June 2023" },
    ],
  },
  {
    index: "02",
    company: "S16 Films",
    role: "Assistant Director & Graphic Designer",
    icon: "film",
    facts: [
      { label: "Location", value: "Coimbatore" },
      { label: "Period", value: "February 2024 – September 2024" },
    ],
  },
  {
    index: "03",
    company: "Leadpro Infotech",
    role: "UI/UX Design Intern",
    icon: "layout",
    facts: [
      { label: "Location", value: "Coimbatore" },
      { label: "Period", value: "March 2025 – Sept 2025" },
    ],
  },
  {
    index: "04",
    company: "Falcon Reality",
    role: "Graphic Designer & AI Animator",
    icon: "spark",
    current: true,
    facts: [
      { label: "Current", value: "You are here", live: true },
      { label: "Location", value: "Bengaluru" },
      { label: "Since", value: "October 2025" },
    ],
  },
];

function RoleIcon({ name }: { name: IconName }) {
  if (name === "pen") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />
      </svg>
    );
  }

  if (name === "film") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 6l2 4M13 6l2 4" />
      </svg>
    );
  }

  if (name === "layout") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
    </svg>
  );
}

/* Decorative wave art. The paths are deterministic so server and client render
   the same markup; the slow drift is a CSS animation. */
function WaveArt({ index }: { index: number }) {
  const gradientId = `experience-wave-${index}`;
  const paths = Array.from({ length: 34 }, (_, i) => {
    const y = 60 + i * 4.2;
    const amplitude = 34 + index * 7;
    const start = (y + Math.sin(i * 0.18 + index) * 10).toFixed(2);
    const controlA = (y - amplitude + i * 0.9).toFixed(2);
    const controlB = (y + amplitude - i * 0.6).toFixed(2);
    const end = (y - 12 + i * 0.8).toFixed(2);

    return {
      d: `M-20,${start} C90,${controlA} 190,${controlB} 420,${end}`,
      opacity: (0.9 - i * 0.02).toFixed(2),
    };
  });

  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1">
          <stop
            offset="0"
            className="home-experiencia__arte-stop-inicio"
          />
          <stop offset="1" className="home-experiencia__arte-stop-fin" />
        </linearGradient>
      </defs>
      <g
        className="home-experiencia__arte-onda"
        style={{ animationDelay: `${-index * 2}s` }}
      >
        {paths.map((path, i) => (
          <path
            key={i}
            d={path.d}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={1}
            opacity={path.opacity}
          />
        ))}
      </g>
    </svg>
  );
}

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(3);
  const [inView, setInView] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setInView(true);
          observer.disconnect();
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(row);

    return () => observer.disconnect();
  }, []);

  const activate = (index: number) => setActiveIndex(index);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "Spacebar"
    ) {
      event.preventDefault();
      activate(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (
      window.matchMedia("(hover: hover) and (min-width: 1024px)").matches
    ) {
      activate(index);
    }
  };

  return (
    <section
      id="experience"
      className="home-experiencia px-1rem-mob"
      aria-labelledby="experience-title"
    >
      <div
        className="home-experiencia__grilla grilla-celdas"
        aria-hidden="true"
      />

      <div className="home-experiencia__inner">
        <header className="home-experiencia__intro">
          <div className="home-experiencia__intro-titulo">
            <span className="home-experiencia__eyebrow">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M9 3l1.6 4.4L15 9l-4.4 1.6L9 15l-1.6-4.4L3 9l4.4-1.6zM17 12l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1z" />
              </svg>
              Experience
            </span>
            <h3 id="experience-title" className="home-experiencia__titulo">
              Every experience
              <br />
              <span className="home-experiencia__titulo-acento">
                moves me forward.
              </span>
            </h3>
          </div>

          <div className="home-experiencia__aside">
            <p className="home-experiencia__descripcion">
              A journey through design, visual storytelling, film production
              and AI-powered creativity. Every experience has shaped the way I
              think, create and approach new challenges.
            </p>
            <a
              className="home-experiencia__cta"
              href="https://wa.me/9047799985"
              target="_blank"
              rel="noopener noreferrer"
            >
              Let&apos;s talk
            </a>
          </div>
        </header>

        <div
          ref={rowRef}
          className={`home-experiencia__lista${inView ? " is-in" : ""}`}
          role="group"
          aria-label="Experience"
        >
          {roles.map((item, index) => {
            const isActive = index === activeIndex;
            const titleId = `experience-role-title-${index}`;
            const roleId = `experience-role-name-${index}`;

            return (
              <div
                key={item.index}
                className={`home-experiencia__rol-card${
                  isActive ? " is-active" : ""
                }`}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-labelledby={`${titleId} ${roleId}`}
                onClick={() => activate(index)}
                onFocus={() => activate(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <span
                  className="home-experiencia__rol-numero"
                  aria-hidden="true"
                >
                  {item.index}.
                </span>

                <div
                  className="home-experiencia__rol-arte"
                  aria-hidden="true"
                >
                  <WaveArt index={index} />
                </div>

                <div className="home-experiencia__rol-cuerpo">
                  <span
                    className="home-experiencia__rol-icono"
                    aria-hidden="true"
                  >
                    <RoleIcon name={item.icon} />
                  </span>

                  <h4
                    id={titleId}
                    className="home-experiencia__rol-titulo"
                  >
                    {item.company}
                  </h4>
                  <p id={roleId} className="home-experiencia__rol-puesto">
                    {item.role}
                  </p>

                  <div
                    className="home-experiencia__rol-mas"
                    aria-hidden={isActive ? undefined : true}
                  >
                    <div>
                      <div className="home-experiencia__rol-datos">
                        {item.facts.map((fact) => (
                          <span
                            key={fact.label}
                            className={`home-experiencia__rol-dato${
                              fact.live
                                ? " home-experiencia__rol-dato--live"
                                : ""
                            }`}
                          >
                            {fact.label}
                            <b>{fact.value}</b>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

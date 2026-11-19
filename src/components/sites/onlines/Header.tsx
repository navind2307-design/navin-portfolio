import Link from "next/link";
import { LogoFull, LogoSmall } from "./icons";

export function Header() {
  return (
    <header className="header wp-block-template-part">
      <div
        className="wp-block-group alignfull header__wrapper px-1rem-mob is-layout-constrained wp-block-group-is-layout-constrained"
        style={{
          marginTop: 0,
          marginBottom: 0,
          paddingTop: "var(--wp--preset--spacing--110)",
          paddingRight: 0,
          paddingBottom: "var(--wp--preset--spacing--110)",
          paddingLeft: 0,
        }}
      >
        <div className="wp-block-group alignwide container is-content-justification-space-between is-nowrap is-layout-flex wp-block-group-is-layout-flex">
          <div
            className="header-logo wp-block-onlines-header-logo"
            style={
              {
                "--header-logo-height": "18px",
                "--header-logo-height-mobile": "18px",
              } as React.CSSProperties
            }
          >
            <div className="header-logo__heading">
              <Link
                className="header-logo__link js-header-logo"
                href="/"
                rel="follow"
                title="Navin D — Creative AI Animator & Graphic Designer"
                aria-label="Navin D — Creative AI Animator & Graphic Designer"
              >
                <span className="header-logo__small js-header-logo-small">
                  <LogoSmall />
                </span>
                <span className="header-logo__full js-header-logo-full">
                  <LogoFull />
                </span>
              </Link>
            </div>
          </div>
          <div className="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex">
            <a
              className="header__nav-link"
              href="#collection"
              onClick={(event) => {
                const section = document.getElementById("collection");
                if (!section) return;
                event.preventDefault();
                const reduced = window.matchMedia(
                  "(prefers-reduced-motion: reduce)",
                ).matches;
                section.scrollIntoView({
                  behavior: reduced ? "auto" : "smooth",
                  block: "start",
                });
                window.history.replaceState(null, "", "#collection");
              }}
            >
              Collection
            </a>
            <div className="wp-block-button header__btn-call">
              <a
                className="wp-block-button__link wp-element-button"
                href="https://wa.me/9047799985"
                target="_blank"
                rel="noopener noreferrer"
                style={{ paddingTop: "7px", paddingBottom: "7px" }}
              >
                Let&apos;s talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

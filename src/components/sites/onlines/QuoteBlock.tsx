const title = [
  "I",
  "create",
  "engaging",
  "visuals",
  "through",
  "design,",
  "animation",
  "and",
  "AI.",
];

const subtitleStart = [
  "Combining",
  "creative",
  "thinking,",
  "visual",
  "storytelling",
  "and",
  "emerging",
  "technology",
];
const subtitleEnd = [
  "to",
  "turn",
  "ideas",
  "into",
  "impactful",
  "visual",
  "experiences.",
];

export function QuoteBlock() {
  return (
    <section className="home-quote-block wp-block-onlines-home-quote-block">
      <div className="home-quote-block__sticky js-quote-sticky">
        <div
          className="home-quote-block__dots patron-puntos js-quote-dots"
          aria-hidden="true"
        />
        <div className="home-quote-block__contenido">
          <h1
            className="home-quote-block__titulo js-quote-texto"
            data-quote-group="titulo"
          >
            {title.map((word) => (
              <span key={word} className="js-quote-word">
                {word}{" "}
              </span>
            ))}
          </h1>
          <p
            className="home-quote-block__subtitulo js-quote-texto"
            data-quote-group="subtitulo"
          >
            {subtitleStart.map((word) => (
              <span key={word} className="js-quote-word">
                {word}{" "}
              </span>
            ))}
            <br />
            {subtitleEnd.map((word) => (
              <span key={word} className="js-quote-word">
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

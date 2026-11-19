import type { CSSProperties } from "react";

export type HalftoneConfig = {
  imageUrl: string;
  width: number;
  height: number;
  colorBack: string;
  colorFront: string;
  originalColors: boolean;
  inverted: boolean;
  size: number;
  radius: number;
  contrast: number;
  grainMixer: number;
  grainOverlay: number;
  grainSize: number;
  scale: number;
  fit: string;
};

export function Halftone({
  config,
  className = "",
  stageClassName = "",
}: {
  config: HalftoneConfig;
  className?: string;
  stageClassName?: string;
}) {
  return (
    <div
      className={`shader-halftone ${className} wp-block-onlines-shader-halftone`}
    >
      <div
        className={`shader-halftone__stage js-shader-halftone ${stageClassName}`}
        data-halftone-config={JSON.stringify(config)}
        style={
          {
            "--halftone-ratio": `${config.width} / ${config.height}`,
            "--halftone-color-back": config.colorBack,
            "--halftone-color-front": config.colorFront,
            "--halftone-fit": config.fit,
          } as CSSProperties
        }
        aria-hidden="true"
      >
        <canvas className="shader-halftone__canvas js-shader-halftone-canvas" />
        <noscript>
          <img
            className="shader-halftone__fallback-image"
            src={config.imageUrl}
            alt=""
            width={config.width}
            height={config.height}
            loading="lazy"
            decoding="async"
          />
        </noscript>
      </div>
    </div>
  );
}

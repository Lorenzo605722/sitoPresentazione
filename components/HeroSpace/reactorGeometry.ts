import type { ReactorSegmentConfig } from "./heroSpace.types";

/** Parametri geometrici dell'anello Arc Reactor */
export interface ReactorGeometryConfig {
  /** Numero di segmenti che compongono l'anello */
  segmentCount: number;
  /** Raggio esterno dell'anello (px, relativo al centro del .reactor) */
  outerRadius: number;
  /** Raggio interno dell'anello (px) */
  innerRadius: number;
  /** Raggio di partenza per l'animazione fly-in (px) */
  startRadius: number;
  /** Ritardo a cascata tra segmenti (ms) */
  staggerDelayMs: number;
  /** Fattore di overlap tra segmenti adiacenti (0–1) */
  arcCoverage: number;
  /** Margine oltre il raggio esterno fino al bordo del contenitore .reactor (px) */
  reactorPadding: number;
}

/** Flash ciano poco prima che il segmento agganci (ms prima della fine transform) */
export const SEGMENT_FLASH_LEAD_MS = 90;
export const SEGMENT_FLASH_DURATION_MS = 420;

export const DEFAULT_REACTOR_CONFIG: ReactorGeometryConfig = {
  segmentCount: 24,
  outerRadius: 180,
  innerRadius: 115,
  startRadius: 560,
  staggerDelayMs: 28,
  arcCoverage: 1.08,
  reactorPadding: 30,
};

/** Durata transizione fly-in segmenti (ms) — deve coincidere con il CSS */
export const ASSEMBLY_TRANSFORM_MS = 850;
export const ASSEMBLY_OPACITY_MS = 500;

/** Ritardo iniziale prima dell'assemblaggio segmenti (ms) */
export const SCAN_PHASE_DELAY_MS = 350;

/** Pausa dopo l'aggancio dell'ultimo segmento prima dell'accensione core (ms) */
export const POST_ASSEMBLY_BUFFER_MS = 150;

/** Durata accensione lenta del disco interno (ms) */
export const ARC_IGNITE_DURATION_MS = 1600;

/** Dimensioni del bounding box di ogni segmento trapezoidale */
export interface SegmentDimensions {
  width: number;
  height: number;
}

export function getMidRadius(config: ReactorGeometryConfig): number {
  return (config.outerRadius + config.innerRadius) / 2;
}

/** Lato del quadrato .reactor (px) */
export function getReactorSize(config: ReactorGeometryConfig): number {
  return (config.outerRadius + config.reactorPadding) * 2;
}

/** Inset anello esterno: coincide con il bordo esterno dei segmenti */
export function getRingOuterInset(config: ReactorGeometryConfig): number {
  return config.reactorPadding;
}

/** Inset anello interno: coincide con il bordo interno dei segmenti */
export function getRingInnerInset(config: ReactorGeometryConfig): number {
  const half = getReactorSize(config) / 2;
  return half - config.innerRadius;
}

export function getSegmentDimensions(config: ReactorGeometryConfig): SegmentDimensions {
  const outerArcWidth =
    ((2 * Math.PI * config.outerRadius) / config.segmentCount) * config.arcCoverage;

  return {
    width: Math.round(outerArcWidth * 10) / 10,
    height: config.outerRadius - config.innerRadius,
  };
}

/**
 * Trapezio radiale: lato superiore = arco esterno, inferiore = arco interno.
 * I vertici sono calcolati da innerRadius/outerRadius e arcCoverage.
 */
export function getSegmentClipPath(config: ReactorGeometryConfig): string {
  const { innerRadius, outerRadius, arcCoverage } = config;
  const outerInset = ((1 - arcCoverage) / 2) * 100;
  const innerRatio = innerRadius / outerRadius;
  const innerLeft = ((1 - innerRatio) / 2) * 100;
  const innerRight = ((1 + innerRatio) / 2) * 100;

  return [
    "polygon(",
    `${outerInset.toFixed(2)}% 0%, `,
    `${(100 - outerInset).toFixed(2)}% 0%, `,
    `${innerRight.toFixed(2)}% 100%, `,
    `${innerLeft.toFixed(2)}% 100%)`,
  ].join("");
}

export function getReactorCssVars(
  config: Partial<ReactorGeometryConfig> = {}
): Record<string, string> {
  const resolved: ReactorGeometryConfig = { ...DEFAULT_REACTOR_CONFIG, ...config };
  const dims = getSegmentDimensions(resolved);
  const innerRatio = resolved.innerRadius / resolved.outerRadius;
  const innerLeft = ((1 - innerRatio) / 2) * 100;
  const innerRight = ((1 + innerRatio) / 2) * 100;
  const reactorSize = getReactorSize(resolved);

  return {
    "--reactor-size": `${reactorSize}px`,
    "--reactor-half": `${reactorSize / 2}px`,
    "--reactor-outer-radius": `${resolved.outerRadius}px`,
    "--reactor-inner-radius": `${resolved.innerRadius}px`,
    "--reactor-mid-radius": `${getMidRadius(resolved)}px`,
    "--ring-outer-inset": `${getRingOuterInset(resolved)}px`,
    "--ring-inner-inset": `${getRingInnerInset(resolved)}px`,
    "--segment-width": `${dims.width}px`,
    "--segment-height": `${dims.height}px`,
    "--segment-clip-path": getSegmentClipPath(resolved),
    "--segment-inner-left": `${innerLeft.toFixed(2)}%`,
    "--segment-inner-right": `${(100 - innerRight).toFixed(2)}%`,
    "--segment-transform-ms": `${ASSEMBLY_TRANSFORM_MS}ms`,
    "--segment-opacity-ms": `${ASSEMBLY_OPACITY_MS}ms`,
    "--text-core-max": `${Math.round(resolved.innerRadius * 1.65)}px`,
    "--arc-core-size": `${Math.round(resolved.innerRadius * 1.82)}px`,
    "--core-ring-size": `${Math.round(resolved.innerRadius * 1.62)}px`,
    "--arc-ignite-duration": `${ARC_IGNITE_DURATION_MS}ms`,
    "--segment-track-inner-pct": `${((resolved.innerRadius / resolved.outerRadius) * 100).toFixed(2)}%`,
    "--segment-flash-ms": `${SEGMENT_FLASH_DURATION_MS}ms`,
  };
}

/** Durata totale fly-in: ultimo delay + transizione transform */
export function getAssemblyDurationMs(
  config: Partial<ReactorGeometryConfig> = {}
): number {
  const resolved: ReactorGeometryConfig = { ...DEFAULT_REACTOR_CONFIG, ...config };
  const lastStagger = (resolved.segmentCount - 1) * resolved.staggerDelayMs;
  return lastStagger + ASSEMBLY_TRANSFORM_MS;
}

export interface ReactorTimeline {
  scan: number;
  reveal: number;
  ignite: number;
  done: number;
}

/** Timeline hero sincronizzata con il numero di segmenti configurato */
export function getReactorTimeline(
  config: Partial<ReactorGeometryConfig> = {}
): ReactorTimeline {
  const assemblyDuration = getAssemblyDurationMs(config);
  const ignite =
    SCAN_PHASE_DELAY_MS + assemblyDuration + POST_ASSEMBLY_BUFFER_MS;

  return {
    scan: SCAN_PHASE_DELAY_MS,
    reveal: SCAN_PHASE_DELAY_MS + 700,
    ignite,
    done: ignite + ARC_IGNITE_DURATION_MS,
  };
}

/**
 * Calcola posizioni e rotazioni per ogni segmento dell'anello.
 * Ogni segmento parte da startRadius e si aggancia su midRadius,
 * ruotato radialmente (rotEnd = angle + 90°).
 */
export function buildReactorSegments(
  config: Partial<ReactorGeometryConfig> = {}
): ReactorSegmentConfig[] {
  const resolved: ReactorGeometryConfig = { ...DEFAULT_REACTOR_CONFIG, ...config };
  const { segmentCount, startRadius, staggerDelayMs } = resolved;
  const midRadius = getMidRadius(resolved);
  const stepAngle = 360 / segmentCount;

  return Array.from({ length: segmentCount }).map((_, i) => {
    const angle = i * stepAngle;
    const rad = (angle * Math.PI) / 180;

    return {
      id: i,
      txStart: `${(Math.cos(rad) * startRadius).toFixed(1)}px`,
      tyStart: `${(Math.sin(rad) * startRadius).toFixed(1)}px`,
      txEnd: `${(Math.cos(rad) * midRadius).toFixed(1)}px`,
      tyEnd: `${(Math.sin(rad) * midRadius).toFixed(1)}px`,
      rotStart: `${angle + 140}deg`,
      rotEnd: `${angle + 90}deg`,
      delay: `${i * staggerDelayMs}ms`,
      flashDelay: `${i * staggerDelayMs + ASSEMBLY_TRANSFORM_MS - SEGMENT_FLASH_LEAD_MS}ms`,
    };
  });
}

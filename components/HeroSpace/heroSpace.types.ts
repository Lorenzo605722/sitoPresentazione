import type { CSSProperties } from "react";

/** Custom properties CSS per il posizionamento dei segmenti reattore */
export interface SegmentCustomProperties {
  "--tx-start": string;
  "--ty-start": string;
  "--tx-end": string;
  "--ty-end": string;
  "--rot-start": string;
  "--rot-end": string;
  "--segment-flash-delay": string;
}

/** Style inline tipizzato: CSSProperties + variabili custom dei segmenti */
export type SegmentInlineStyle = CSSProperties & SegmentCustomProperties;

/** Configurazione geometrica/animata di un singolo segmento */
export interface ReactorSegmentConfig {
  id: number;
  txStart: string;
  tyStart: string;
  txEnd: string;
  tyEnd: string;
  rotStart: string;
  rotEnd: string;
  delay: string;
  flashDelay: string;
}

/** @deprecated Usare ReactorSegmentConfig */
export type ShardConfig = ReactorSegmentConfig;

export function buildSegmentStyle(segment: ReactorSegmentConfig): SegmentInlineStyle {
  return {
    "--tx-start": segment.txStart,
    "--ty-start": segment.tyStart,
    "--tx-end": segment.txEnd,
    "--ty-end": segment.tyEnd,
    "--rot-start": segment.rotStart,
    "--rot-end": segment.rotEnd,
    "--segment-flash-delay": segment.flashDelay,
    transitionDelay: segment.delay,
  };
}

/** @deprecated Usare buildSegmentStyle */
export const buildShardStyle = buildSegmentStyle;

/** @deprecated Usare SegmentInlineStyle */
export type ShardInlineStyle = SegmentInlineStyle;

/** @deprecated Usare SegmentCustomProperties */
export type ShardCustomProperties = SegmentCustomProperties;

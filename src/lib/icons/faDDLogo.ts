import type {
  IconDefinition,
  IconName,
} from "@fortawesome/fontawesome-svg-core";

export const svgPathData =
  "M499.84 258.56a137.6 137.6 0 00-32-43.52 160 160 0 00-48.64-29.12 142.08 142.08 0 00-22.72-6.72 120.64 120.64 0 00-10.24-32 137.6 137.6 0 00-32-43.52 160 160 0 00-48.64-29.12A166.4 166.4 0 00243.84 64H0v39.36h76.8v195.2H0v38.4h192v72.96h-77.44V448H358.4a166.4 166.4 0 0059.84-10.88A160 160 0 00466.88 408a139.84 139.84 0 0032-43.2 122.88 122.88 0 000-106.56zm-384-155.2h128a128 128 0 0144.8 7.36 117.12 117.12 0 0136.8 21.12 96 96 0 0124.64 32A57.6 57.6 0 01355.2 176H114.56zM356.8 214.72a82.88 82.88 0 01-7.68 24.32 101.76 101.76 0 01-24.96 32 122.88 122.88 0 01-36.8 20.8 134.72 134.72 0 01-44.8 7.68h-13.44v-84.8zm-242.24 83.84v-83.84H192v83.84zM462.4 352a101.76 101.76 0 01-24.96 32 122.88 122.88 0 01-36.8 20.8 134.72 134.72 0 01-44.8 7.68h-128v-75.52h14.72a165.12 165.12 0 0059.84-10.88 157.44 157.44 0 0049.6-28.16A132.8 132.8 0 00384 256a116.8 116.8 0 0010.56-32l4.8 1.6a117.12 117.12 0 0136.8 21.12 96 96 0 0124.64 32 83.52 83.52 0 019.28 38.08 87.68 87.68 0 01-7.68 35.2z";

export const width = 512;
export const height = 512;
export const prefix = "fak";
export const iconName = "dd-icon" as IconName;
export const unicode = "57344";
export const aliases = [];
export const ligatures = aliases;

export const definition = {
  icon: [width, height, aliases, unicode, svgPathData],
  iconName,
  prefix,
} as IconDefinition;

export const faDDLogo = definition;

export default definition;

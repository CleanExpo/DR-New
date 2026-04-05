/**
 * CSS module type declarations.
 * Fixes TS2882: "Cannot find module or type declarations for side-effect import of '*.css'"
 * Required for: globals.css, leaflet/dist/leaflet.css
 */
declare module '*.css' {
  const stylesheet: { [className: string]: string };
  export default stylesheet;
}

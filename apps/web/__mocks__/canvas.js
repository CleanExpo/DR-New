// No-op canvas mock. Allows component tests that import canvas indirectly
// (via jsdom or chart libraries) to start without the native canvas module.
//
// Per UNI-2066 verify-audit §3.1, the actual native canvas package was
// missing on this machine; installing it requires system-level cairo/pango
// build deps. This mock provides just enough of the canvas API surface
// for jsdom-based tests to load.
//
// References: apps/web/jest.environment.js patches Module._load to
// redirect 'canvas' imports to this file.
module.exports = {
  createCanvas: () => ({
    getContext: () => ({}),
    toBuffer: () => Buffer.from(''),
  }),
  loadImage: async () => ({}),
  Image: function Image() {},
  Canvas: function Canvas() {},
};

// Patched jsdom environment that no-ops the canvas module.
//
// Per UNI-2066 verify-audit §3.1, pnpm test was blocked on a missing
// canvas.node native module. The original jest config used
// testEnvironment: 'jsdom' directly; this file extends jest-environment-jsdom
// and intercepts Module._load so any `require('canvas')` returns the local
// no-op mock at apps/web/__mocks__/canvas.js.
//
// The patch is self-restoring (originalLoad is restored in finally) so
// tests that don't need canvas are unaffected. Tests that DO need real
// canvas operations (e.g. chart rendering) will need the real package
// installed — see Beads ticket DR-NRPG-2.
const JsdomEnvironment = require('jest-environment-jsdom').default;
const Module = require('module');

class PatchedJsdomEnvironment extends JsdomEnvironment {
  constructor(config, context) {
    const originalLoad = Module._load;
    Module._load = function patchedLoad(request, parent, isMain) {
      if (request === 'canvas') {
        return require('./__mocks__/canvas.js');
      }
      return originalLoad.call(this, request, parent, isMain);
    };

    try {
      super(config, context);
    } finally {
      Module._load = originalLoad;
    }
  }
}

module.exports = PatchedJsdomEnvironment;

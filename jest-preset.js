const ts_preset = require('ts-jest/jest-preset');
const puppeteer_preset = require('jest-puppeteer/jest-preset.json');

module.exports = Object.assign({}, ts_preset, puppeteer_preset, {
  test_url: `http://${process.env.HOST || '127.0.0.1'}:${
    process.env.PORT || 3000
  }`,
});

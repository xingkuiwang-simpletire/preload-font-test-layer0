/** @type {import('next').NextConfig} */

const { withLayer0, withServiceWorker } = require("@layer0/next/config");

module.exports = withLayer0(
  withServiceWorker({
    // Output source maps so that stack traces have original source filenames and line numbers when tailing
    // the logs in the Layer0 developer console.
    layer0SourceMaps: true,
  })
);

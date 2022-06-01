const extractFrames = require("gif-extract-frames");

/**
 *
 * @param {String} gifPath
 * @returns
 */
 async function getFrame(gifFileName) {
  const results = await extractFrames({
    input: `./gifs/${gifFileName}`,
    output: "./frames/frame-%d.jpg",
  });
  return results;
}

module.exports = getFrame;
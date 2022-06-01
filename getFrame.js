const extractFrames = require("gif-extract-frames");

/**
 *
 * @param {String} input
 * @param {String} ouput
 * @returns
 */
exports.module = async function getFrame(input, ouput) {
  const results = await extractFrames({
    input: "./gifs/snoopdog.gif",
    output: "./frames/frame-%d.jpg",
  });
  return results;
}

// getFrame()

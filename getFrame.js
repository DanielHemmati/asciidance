const extractFrames = require("gif-extract-frames");

async function getFrame() {
  const results = await extractFrames({
    input: "./gifs/snoopdog.gif",
    output: "./frames/frame-%d.jpg",
    coalesce: true
  });
  return results;
}

getFrame()

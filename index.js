const fs = require("fs");
const extractFrames = require("gif-extract-frames");

async function asciidance(gifFile) {
  const frameDir = "./frames";

  if (!fs.existsSync(frameDir)) {
    fs.mkdirSync(frameDir, { recursive: true });
  }

  const gifToFrames = await extractFrames({
    input: `./gifs/${gifFile}`,
    output: "./frames/frame-%d.jpg",
  });

  const NumberOfFrames = fs.readdirSync(frameDir).length;


}

asciidance("snoopdog.gif");

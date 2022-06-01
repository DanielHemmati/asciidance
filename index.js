const fs = require("fs");
const imageToAscii = require("image-to-ascii");
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

  for (let i = 0; i < NumberOfFrames; ++i){
    imageToAscii(`./frames/frames-${i}.jpg`, (err ,converted) => {
      console.log(err || converted) 
    })
  }

}

asciidance("snoopdog.gif");

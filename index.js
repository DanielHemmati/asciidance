const fs = require("fs");
const extractFrames = require("gif-extract-frames");
const jp2a = require("jp2a");
const makeItDance = require('./makeItDance');

/**
 * 
 * @param {string} gifFile the gif file which will convert to ascii
 * @param {Object} asciiConfig config for how the ascii should looks like
 * @param {Object} danceConfig config for how should ascii dance on a terminal
 */
async function asciidance(gifFile, asciiConfig={}, danceConfig={}) {
  const frameDir = "./frames";
  const asciiDir = "./ascii";

  if (!fs.existsSync(frameDir) || !fs.existsSync(asciiDir)) {
    fs.mkdirSync(frameDir, { recursive: true });
    fs.mkdirSync(asciiDir, { recursive: true });
  }

  const gifToFrames = await extractFrames({
    input: `./gifs/${gifFile}`,
    output: "./frames/frame-%d.jpg",
  });

  const NumberOfFrames = fs.readdirSync(frameDir).length;
  
  for (let i = 0; i < NumberOfFrames; ++i) {
    jp2a(
      [
        `./frames/frame-${i}.jpg`,
        `${asciiConfig.chars ? `--chars=${asciiConfig.chars}` : ``}`,
        `${asciiConfig.bg ? `--background=${asciiConfig.bg}` : ``}`,
        `${asciiConfig.border ? `--${asciiConfig.border}` : ``}`,
        `${asciiConfig.flipx ? `--${asciiConfig.flipx}` : ``}`,
        `${asciiConfig.flipy ? `--${asciiConfig.flipy}` : ``}`,
        `${asciiConfig.size ? `--size=${asciiConfig.size}` : ``}`,
        `${asciiConfig.width ? `--width=${asciiConfig.width}` : ``}`,
      ],
      function (ouput) {
        fs.writeFileSync(`./${asciiDir}/ascii-${i}.txt`, ouput);
      }
    );
  }

  await makeItDance(danceConfig);
}

module.exports = asciidance;
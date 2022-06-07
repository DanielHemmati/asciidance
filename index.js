const fs = require("fs");
const extractFrames = require("gif-extract-frames");
const jp2a = require("jp2a");

async function asciidance(gifFile, asciiConfig={}) {
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
  // console.log(asciiConfig.bg);
  console.log(  `${asciiConfig.bg ? `--background=${asciiConfig.bg}` : ``}`)
  for (let i = 0; i < NumberOfFrames; ++i) {
    jp2a(
      [
        `./frames/frame-${i}.jpg`,
        `${asciiConfig.chars ? `--chars=${asciiConfig.chars}` : ``}`,
        `${asciiConfig.bg ? `--background=${asciiConfig.bg}` : ``}`,
        `${asciiConfig.border ? `--${asciiConfig.border}` : ``}`,
      ],
      function (ouput) {
        console.log(ouput);
        fs.writeFileSync(`./${asciiDir}/ascii-${i}.txt`, ouput);
      }
    );
  }
}

asciidance("snoopdog.gif", { bg: "light", chars: "##!!!!#@##", border: "border" });

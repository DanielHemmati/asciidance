const fs = require("fs");
const { exec } = require("child_process");
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

  // for (let i = 0; i < NumberOfFrames; ++i){
  //   imageToAscii(`./frames/frames-${i}.jpg`, (err ,converted) => {
  //     console.log(err || converted)
  //   })
  // }

  exec("bash test.sh", (error, stdout, stderr) => {
     if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`); 
  })
}

asciidance("snoopdog.gif");

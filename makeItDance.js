/*
  most of this code is from:https://github.com/hugomd/parrot.live
  i just added a little bit of spice 🌶️ to it
*/
const path = require("path");
const fs = require("fs").promises;
const http = require("http");
const colors = require("colors/safe");
const url = require("url");
const { Readable } = require("stream");
const randomColors = require("./utils/randomColor");

/**
 *
 * @param {Number} frameRate
 * @param {Array} customColor
 */
async function makeItDance({ frameRate = 70, customColor = [] }) {
  let original;

  (async () => {
    try {
      const filePath = process.cwd() + "/ascii";
      const files = await fs.readdir(filePath);

      original = await Promise.all(
        files.map(async (res) => {
          const frame = await fs.readFile(path.join(filePath, res));
          return frame.toString();
        })
      ).then((res) => res);
    } catch (err) {
      console.log(err);
    }
  })().catch((err) => {
    console.log("error loading frame");
    console.log(err);
  });

  const colorsOptions = customColor.length === 0 ? randomColors : customColor;
  const randomColorSelector = () => {
    let randomNumber = Math.floor(Math.random() * colorsOptions.length);
    return randomNumber;
  };

  const streamer = async (stream) => {
    let index = 0;

    return setInterval(() => {
      // clear terminal
      stream.push("\033[2J\033[3J\033[H");
      const newColor = randomColorSelector();

      stream.push(colors[colorsOptions[newColor]](original[index]));

      // it goes from 0 to length of asciiFiles you have 
      // but here original is array
      index = (index + 1) % original.length;
    }, frameRate);
  };

  const server = http.createServer((req, res) => {
    if (req.url === "/status") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ status: "ok" }) + "\n");
    }

    if (
      !req.headers["user-agent"].includes("curl")
    ) {
      res.writeHead(302, {
        Location: "https://github.com/DanielCodex/asciidance",
      });
      return res.end();
    }

    const stream = new Readable();
    stream._read = function noop() {};
    stream.pipe(res);
    const interval = streamer(stream);

    req.on("close", () => {
      stream.destroy();
      clearInterval(interval);
    });
  });

  const port = process.env.PARROT_PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on localhost:${port}`);
  });
}

module.exports = makeItDance;

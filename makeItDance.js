const path = require("path");
const fs = require("fs").promises;
const http = require("http");
const colors = require("colors/safe");
const url = require("url");
const { Readable } = require("stream");

let original;
let flipped;

(async () => {
  try {
    const filePath = process.cwd() + "/ascii";
    const files = await fs.readdir(filePath);

    original = await Promise.all(
      files.map(async (res) => {
        const frame = await fs.readFile(path.join(filePath, res));
        // console.log(path.join(filePath, res))
        return frame.toString();
      })
    ).then((res) => res);

    flipped = original.map((item) => {
      return item.toString().split("").reverse().join("");
    });
    // console.log(flipped)
  } catch (err) {
    console.log(err);
  }
})().catch((err) => {
  console.log("error loading frame");
  console.log(err);
});

const colorsOptions = [
  "red",
  "yellow",
  "green",
  "blue",
  "magenta",
  "cyan",
  "white",
];
const selectColor = () => {
  let randomNumber = Math.floor(Math.random() * colorsOptions.length);
  return randomNumber;
};

const streamer = (stream, opt) => {
  let index = 0;
  const frames = opt.flip ? flipped : original;
  console.log(opt)

  return setInterval(() => {
    stream.push("\033[2J\033[3J\033[H");
    // const newColor = (lastColor = selectColor(lastColor));
    const newColor = selectColor();
    // console.log(`newColor is ${newColor}`);

    stream.push(colors[colorsOptions[newColor]](frames[index]));

    index = (index + 1) % frames.length;
  }, 70);
};

const validateQuery = ({ flip }) => {
  return {
    flip: String(flip).toLowerCase() === true
  }
}


const server = http.createServer((req, res) => {
  if (req.url === "/healthcheck") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }) + "\n");
  }

  if (
    req.headers &&
    req.headers["user-agent"] &&
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
  const interval = streamer(
    stream,
    validateQuery(url.parse(req.url, true).query)
  );
  
  console.log(req.url)
  req.on("close", () => {
    stream.destroy();
    clearInterval(interval);
  });
});

const port = process.env.PARROT_PORT || 3001;
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`Listening on localhost:${port}`);
});

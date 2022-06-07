const path = require("path");
const fs = require("fs").promises;
const http = require("http");
const colors = require("colors/safe");
const url = require("url");
const { Readable } = require("stream");

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

const streamer = (stream) => {
  let index = 0;

  return setInterval(() => {
    stream.push("\033[2J\033[3J\033[H");
    const newColor = selectColor();

    stream.push(colors[colorsOptions[newColor]](original[index]));

    index = (index + 1) % original.length;
  }, 70);
};


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

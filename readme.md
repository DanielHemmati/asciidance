# i should add docs in here


```js
const img2ascii = require("image-to-ascii")
const colors = require("colors")
const stream = require('stream');

const colorsOptions = [
  "red",
  "yellow",
  "green",
  "blue",
  "magenta",
  "cyan",
  "white",
];
// console.log('red'.red)
for (let i = 0; i < 20; ++i) {
  img2ascii(
    `./frames/frame-${i}.jpg`,
    { size: { height: "100%", width: "20%" } },
    function (err, result) {
      console.log(result);
    }
  );
}

// stream.push('\033[2J\033[3J\033[H');
console.log('daniel hemmati');
```

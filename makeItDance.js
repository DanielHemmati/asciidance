const { readdir, readFile } = require('fs');
const path = require('path');
const fs = require("fs").promises;

let original;
let flipped;

(async () => {
  try {
    const filePath = process.cwd() + "/ascii";
    const files = await fs.readdir(filePath);

     original = await Promise.all(
      files.map(async (res) => {
        const frame = await fs.readFile(path.join(filePath, res))
        // console.log(path.join(filePath, res))
        return frame.toString();
      })
    ).then(res => res);

    // flipped = original.map((item) => {
    //   return item.toString().split('').reverse().join('');
    // })
    // console.log(flipped)
  } catch (err) {
    console.log(err)
  }
})().catch((err) => {
  console.log("error loading frame");
  console.log(err);
})



const img2ascii = require("image-to-ascii");
var colors = require('colors');

const colorsOptions = [
  'red',
  'yellow',
  'green',
  'blue',
  'magenta',
  'cyan',
  'white'
];
// console.log('red'.red)
for (let i = 0; i < 20; ++i){
img2ascii(`./frames/frame-${i}.jpg`, {size: {height: "100%", width: "20%"}}, function (err, result) {
    console.log(result);
})
}

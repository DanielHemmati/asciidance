# Asciidance

This project is inpired from [parrot.live](https://github.com/hugomd/parrot.live).

Basically i wanted to make any gifs to ascii and make it dance on terminal hence the name **asciidance**.

So The process of getting this result for any gifs is:

1. you need a gif
2. we have to extract frames from gifs
3. at last we have to turn those frames to ascii

All of this happen will happen behind the secene when you use **asciidance**

Here is the quick example  
![quick example](./tutorial//quick-example.gif)

## Install

```bash
npm install asciidance
```

## Before running examples

1. You have to install `jp2a` on your computer
   1. For installing on Windows use [wsl](https://docs.microsoft.com/en-us/windows/wsl/install)
   2. For installin on Mac use [brew](https://formulae.brew.sh/formula/jp2a)
   3. For installing on Ubuntu use `sudo apt-get install jp2a`
2. You have to put your gifs on a `gifs` folder
3. Everytime you run the code again (as you can see in a quick example above) you have to delete both `ascii` and `frames` folder

## Example

### background

```js
const asciidance = require("asciidance");

asciidance("snoopdog.gif", { bg: "light" });
```

![bg](tutorial/bg.gif)

### Custom characters

```js
const asciidance = require("asciidance");

asciidance("snoopdog.gif", { chars: "!@#$%^&()_+" });
```

![custom-chars](tutorial/custom-chars.png)

### Border example

```js
const asciidance = require("asciidance");

asciidance("snoopdog.gif", { border: "border" });
```

![boder](tutorial/border.png)

### Flip-horizontal

```js
const asciidance = require("asciidance");

asciidance("snoopdog.gif", { flipx: "flipx" });
```

![flipx](tutorial/flipx.gif)

### Flip-vertical

```js
const asciidance = require("asciidance");

asciidance("snoopdog.gif", { flipy: "flipy" });
```

![flipy](tutorial/flipy.gif)

### Size

```js
const asciidance = require("asciidance");

asciidance("snoopdog.gif", { size: "100x100" });
```

![size](tutorial/size.gif)

### Width

```js
const asciidance = require("asciidance");

asciidance("snoopdog.gif", { width: "20" });
```

![width](tutorial/width.gif)

### Frame-Rate

```js
const asciidance = require("asciidance");

asciidance("snoopdog.gif", { frameRate: "10" });
```

![frame-rate](tutorial/frame-rate.gif)

### Custom-colors

```js
const asciidance = require("asciidance");

asciidance("snoopdog.gif", { customColor: ["green"] });
```

![custom-color](tutorial/custom-color.gif)

### everthing together


```js
const asciiDance = require("asciidance");

asciiDance("snoop.gif", {
  bg: "dark",
  chars: "danielcodex",
  flipy: "flipy",
  flipx: "flipx",
  border: "border",
  frameRate: "100",
  customColor: ["green", "red", "cyan"]
});
```

![everything](tutorial/everythin.gif)

---

## API

### asciidance(gifFile, asciiConfig?)

#### gifFile

Type: `string`  
Your gif file name

#### asciiConfig

Type: `object`  
Default: `undefined`  

Options for how you ascii should look like.  

##### bg

Type: `string`  
Default: `dark`  

The other option is `light`  

Here is the [example](#background)

##### chars

Type: `string`  
Default: `...',;:clodxkO0KXNWM`  

Here is the [example](#Custom-characters)

##### Border

Type: `string`  
Default: `undefined`  

You can set it to `border`  
Here is the [example](#border)  

##### flipx

Type: `string`  
Default: `undefined`

You can flip the ascii in the x axis  
Here is the [example](#flip-horizontal)  

##### flipy

Type: `string`  
Default: `undefined`  

you can flip the ascii in the y axis  
Here is the [example](#flip-vertical)

##### size

Type: `string`  
Default: The default is the largest image dimension that fits on your terminal [link](http://manpages.ubuntu.com/manpages/bionic/en/man1/jp2a.1.html#:~:text=Use%20the%20largest%20dimension%20that%20makes%20the%20image%20fit%20in%20your%20terminal%20display.)

The format which you write is `NxN`. That's x in the middle.  

Here is the [example](#size)  

##### frameRate

Type: `string`  
Default: `70`  

This default rate is originally from [parrot.live](https://github.com/hugomd/parrot.live/blob/12f5e20f3e240bfb82fe1ac12fb75b849c48abbe/index.js#L67) source code.

But you can change it to any number you want  

The rules of thumb is this:  
**the lower the number the faster the animation/dancing and the higher the number the slower the animation/dancing 😂**  

Here is the [example](#custom-colors)

##### customColor

Type: `array`  
Default: `["red", "yellow", "green", "blue", "magenta", "cyan", "white"]`

You can give choose any color from default array.  
This colors come from [colors npm](https://www.npmjs.com/package/colors) package.  

Here is the [example](#frame-rate)

---

## Buggy behaviour

Intentionally i run one code after 2s. Here is the [link](https://github.com/DanielCodex/asciidance/blob/071add85490b1a6551eefec6e78115c0a105b938/index.js#L46)

For some reason which i don't know yet, if we remove this delay and run the code for the first time, the moment we run `curl localhost:3000` we won't get any result in terminal.

So i suspect that the reason for that is because the ascii folder is not populated yet the moment the `makeItDance()` is called.

That's why i delay the called for `makeItDance()` function.

If you used a gifs which was really long (i haven't seen a long gifs myself 🤔😂) you might not see anything on terminal the moment you run `curl localhost:3000`.

In order for that to work just run the your code again and run `curl localhost:3000` (it will works)

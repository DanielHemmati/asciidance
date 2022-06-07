# Asciidance

This project is inpired from [parrot.live](https://github.com/hugomd/parrot.live).  
Basically i wanted to make any gifs to ascii and make it dance on terminal hence the name **asciidance**.  

So The process of getting this result for any gifs is:  

1. you need a gif
2. we have to extract frames from gifs
3. at last we have to turn those frames to ascii

All of this happen will happen behind the secene when you use **asciidance**  

Here is the quick example  

## Install

```bash
npm install asciidance
```

## Before running examples

1. You have to put your gifs on a `gifs` folder  
2. I


## Example

```js 
const asciidance = require("asciidance");

asciidance("snoopdog.gif", { border: "border" })
```


## Buggy behaviour

Intentionally i run one code after 2s. Here is the [link](https://github.com/DanielCodex/asciidance/blob/071add85490b1a6551eefec6e78115c0a105b938/index.js#L46)  

For some reason which i don't know yet, if we remove this delay and run the code for the first time, the moment we run `curl localhost:3000` we won't get any result in terminal.  

So i suspect that the reason for that is because the ascii folder is not populated yet the moment the `makeItDance()` is called.  

That's why i delay the called for `makeItDance()` function.  

If you used a gifs which was really long (i haven't seen a long gifs myself 🤔😂) you might not see anything on terminal the moment you run `curl localhost:3000`.  

In order for that to work just run the your code again and run `curl localhost:3000` (it will works)


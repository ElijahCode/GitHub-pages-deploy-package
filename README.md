# @elijahcode/ghpagesdeployer

## Description

This package let you deploy your pages on github pages with using commands in terminal.

## Install

>                        npm install @elijahCode/ghpagesdeployer

process of installation you can see on this gif:
[![asciicast](https://asciinema.org/a/lNFG7PbAXV42qWaM62wM1CsYf.svg)](https://asciinema.org/a/lNFG7PbAXV42qWaM62wM1CsYf)

## Usage

For usage this package you need run next comman in your terminal:

>                        "node node_modules/@elijahcode/ghpagesdeployer/build/app.js -i"

Instead of -i you can use --init

It create configuration file. Now you can deploy your page. Run:

>                        "node node_modules/@elijahcode/ghpagesdeployer/build/app.js"

If you dont want create configure file, run this command:

>                        "node node_modules/@elijahcode/ghpagesdeployer/build/app.js -c"

Instead of -c you can use --custom:deploy

IN case if you use webpack and whant build the project, use flag -b or --build. After building, page automatically will be deployed.

>                        "node node_modules/@elijahcode/ghpagesdeployer/build/app.js -b"

**_Warning_ : for use this command you must have "build" script in your .json file. If you haven`t it, process execute with error**

For usage recommended create this scripts in your .json file:

```json
"deploy": "node node_modules/@elijahcode/ghpagesdeployer/build/app.js",
"deploy:init": "node node_modules/@elijahcode/ghpagesdeployer/build/app.js -i",
"deploy:build": "node node_modules/@elijahcode/ghpagesdeployer/build/app.js -b",
"deploy:custom": "node node_modules/@elijahcode/ghpagesdeployer/build/app.js -c"
```

Example of using:

[![asciicast](https://asciinema.org/a/m4Yf0bo2cwhKikV4Wq8jaaQC1.svg)](https://asciinema.org/a/m4Yf0bo2cwhKikV4Wq8jaaQC1)

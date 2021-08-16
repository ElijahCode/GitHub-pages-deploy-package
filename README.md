# @elijahcode/ghpagesdeployer

## Description

This package let you deploy your pages on github pages with using commands in terminal.

## Install

>                        npm install @elijahCode/ghpagesdeployer

process of installation you can see on this gif:
[![asciicast](https://asciinema.org/a/lNFG7PbAXV42qWaM62wM1CsYf.svg)](https://asciinema.org/a/lNFG7PbAXV42qWaM62wM1CsYf)

## Usage

For usage this package you need run next comman in your terminal:

>                                                                  ghdeployer -i

Instead of -i you can use --init

In case if you use webpack and whant build the project, use flag -b or --build:

>                                                                  ghdeployer -b

**_Warning_ : for use this command you must have "build" script in your .json file. If you haven`t it, process execute with error**

If you dont want create configure file use flag -c:

>                                                                  ghdeployer -c

Instead of -c you can use --custom-deploy. After run you shoud input asked data. After it page will authomatically deployed.

For deploing page with use config file use flag -d or --deploy:

>                                                                  ghdeployer -d

Also you can use few flags in one command, for example:

>                                                                  ghdeployer -i -b -d

This command will create config file, build the page and deploy it.

Example of using:

[![asciicast](https://asciinema.org/a/430732.svg)](https://asciinema.org/a/430732)

##  barcode-font-generator (barf)

this is a barcode fonts generator. You input the name of the font-family you like, the height of one bar, and the encoding you want.
Supported encodings are:

* [code128](https://github.com/Holger-Will/code-128-font)
* [code39](https://github.com/Holger-Will/code-39-font)
* [2of5 interleaved](https://github.com/Holger-Will/2of5-font)
* [ean13](https://github.com/Holger-Will/ean13-font) [live example](https://cdn.rawgit.com/Holger-Will/ean13-font/master/examples/generator.html)

# Installing

Install it globally with npm

    npm install -g barcode-font-generator

# Usage

the command line interface is called barf. use it like this:

    barf -n "Super_EAN_Font" -h 60 -c "ean13" -bl 10 --with-numbers

| switch | values | description |
| --- | --- | --- |
| -c, --code | code128,code39,2of5,ean13 | the encoding you want to use |
| -n, --name | STRING | the name you want give to the font |
| -h, --height | INTEGER | the height of one bar |
| -bl, --basline | INTEGER | set the height if the numbers at the bottom of the codes. applys only to ean13 and 2of5 fonts so far.|
| -wn, --with-numbres | | display numbers underneath the bars |

The command creates a folder with the fonts in .svg, .ttf, .woff and .eot format. You will find an example html file using the font in that folder as well.

"use strict";
var svg2ttf = require("svg2ttf")
var ttf2woff= require("ttf2woff")
var ttf2eot = require("ttf2eot")
var fs = require('fs');
(function() {
  var root = this
  var previous_BarcodeGenerator = root.BarcodeGenerator
  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = BarcodeGenerator
    }
    exports.BarcodeGenerator = BarcodeGenerator
  }
  else {
    root.BarcodeGenerator = BarcodeGenerator
  }
  BarcodeGenerator.noConflict = function() {
    root.BarcodeGenerator = previous_BarcodeGenerator
    return BarcodeGenerator
  }
}).call(this);

function BarcodeGenerator(){
  this.generate=function(info){
    var cf = (info.code!=undefined) ? "./data/"+info.code+".json" : info.input
    if(cf==undefined){
      console.log("no code or input file specified")
      return
    }
    console.log(cf)
    var def = require(cf)
    var codes = def.codes
    var svg =
    `<svg xmlns="http://www.w3.org/2000/svg">
      <font id = "${info.name}"
            horiz-adv-x   = "${info.height*100}"
            vert-origin-x = "0"
            vert-origin-y = "0" >
        <font-face font-family  = "${info.name}"
                   font-weight  = "normal"
                   units-per-em = "${info.height*100}"
                   cap-height   = "${info.height*100}"
                   x-height     = "${info.height*100}"
                   bbox         = "0 0 ${info.height*100} ${info.height*100}">
          <font-face-src>
            <font-face-name name="${info.name}"/>
          </font-face-src>
        </font-face>`
    codes.forEach(function(item,index){
      // shift the start codes by 10 bars to left right to satisfy the requirments of a quite zone
      var first = item.bars[0]
      var offset = 0
      var st     = ``
      for(var i  = 0; i < item.weights.length; i++ ) {
        var w   = parseInt( item.weights[i] )
        if ( i%2 == first) {
        } else {
          var bl = (info.baseline==undefined) ? 0 : info.baseline
          if(item.role=="ctrl") bl=0
          if(w>0) st += `M ${offset*100}, ${bl*100} h ${w*100} V ${info.height*100} h ${-w*100} z `
        }
        offset += w
      }
      var hax = lengthFromWeights(item.weights)
      item.ascii.forEach(function(a,index){
        if((typeof a)!="string"){
          a="&#"+a+";"
        }
        svg+=`<glyph unicode = "${a}" horiz-adv-x = "${hax*100}" d = "${st}" />`
      })
    })
    svg+=`</font></svg>`
    var ttf = svg2ttf(svg,{})
    if(!fs.existsSync(info.output)) fs.mkdirSync(info.output)
    fs.writeFileSync(info.output+"/"+info.name+".svg", svg);
    fs.writeFileSync(info.output+"/"+info.name+".ttf", new Buffer(ttf.buffer));
    var woff = ttf2woff(ttf.buffer,{})
    fs.writeFileSync(info.output+"/"+info.name+".woff", new Buffer(woff.buffer));
    var woff = ttf2eot(ttf.buffer,{})
    fs.writeFileSync(info.output+"/"+info.name+".eot", new Buffer(woff.buffer));
    var testtext=""
    var testtextenc=""
    if(info.code == "code39") {
      testtext="*ABC1234*"
      testtextenc = "*ABC1234*"
    }
    if(info.code == "2of5") {
      testtext="1234567890"
      testtextenc = ":1234567890;"
    }
    if(info.code == "code128") {
      testtext="Test"
      testtextenc = "ÑTestWÓ"
    }
    if(info.code == "ean13") {
      testtext="8 711253 001202"
      testtextenc = "*L7G1L1G2G5L3**R0R0R1R2R0R2*"
    }

    var html=`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${info.name} Test Page</title>
        <style>
          @font-face { font-family: '${info.name}'; src: url('./${info.name}.woff'); }
          .barcodeS { font-family: '${info.name}'; font-size:${info.height}px } /* 1 bar is 1px whide */
          .barcodeM { font-family: '${info.name}'; font-size:${info.height*2}px } /* 2 bar is 1px whide */
          .barcodeL { font-family: '${info.name}'; font-size:${info.height*3}px } /* 3 bar is 1px whide */
          .barcodeXL { font-family: '${info.name}'; font-size:${info.height*4}px } /* 4 bar is 1px whide */
        </style>
      </head>
      <body>
        <div style="display:flex;flex-direction:column;align-items:center">
          <div class="barcodeS">${testtextenc}</div>
          <div>${testtext}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center">
          <div class="barcodeM">${testtextenc}</div>
          <div>${testtext}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center">
          <div class="barcodeL">${testtextenc}</div>
          <div>${testtext}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center">
          <div class="barcodeXL">${testtextenc}</div>
          <div>${testtext}</div>
        </div>
      </body>
    </html>`
    fs.writeFileSync(info.output+"/"+info.name+".html", html);
  }

}


function lengthFromWeights(weights){
  var tl=0
  for(var i = 0 ; i < weights.length;i++){
    tl+=parseInt(weights[i])
  }
  return tl
}

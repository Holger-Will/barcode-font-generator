"use strict";
var svg2ttf = require("svg2ttf")
var ttf2woff= require("ttf2woff")
var ttf2eot = require("ttf2eot")
var path = require("svgpath")
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
var numbers=["M609 353q0-78-18-138t-51-101-82-63-112-21q-62 0-111 21t-83 63-53 101-18 138v191q0 78 18 138t52 102 83 63 111 21q63 0 112-21t83-63 51-102 18-138v-191z m-424 21l318 243q-9 81-47 124t-111 42q-82 0-121-55t-39-161v-193z m320 144l-317-242q10-79 49-121t109-41q82 0 121 56t38 161v187z","M433 41h-103v683l-214-81v95l309 119h8v-816z","M598 41h-535v75l267 296q36 40 60 71t39 57 21 49 6 48q0 30-10 57t-29 46-45 31-60 12q-41 0-71-12t-50-33-29-53-10-69h-104q0 52 18 97t51 80 83 55 112 20q58 0 104-17t78-48 49-71 17-90q0-36-12-72t-34-71-48-68-59-68l-219-237h410v-85z","M218 499h74q39 0 69 10t51 29 31 45 11 56q0 71-37 108t-106 36q-33 0-60-10t-47-28-30-45-10-57h-105q0 46 19 87t51 72 79 48 103 18q55 0 100-15t78-44 50-72 18-100q0-24-7-49t-22-49-39-44-57-35q40-13 66-34t43-47 22-54 7-56q0-57-20-102t-54-75-82-46-103-16q-54 0-101 15t-82 44-55 71-20 96h103q0-32 11-58t31-45 49-28 64-10 64 9 49 28 31 47 11 67q0 38-13 66t-35 46-55 28-71 9h-74v84z","M517 315h114v-85h-114v-189h-103v189h-372v62l365 565h110v-542z m-360 0h257v404l-17-32z","M134 450l41 407h419v-101h-331l-23-218q24 14 57 25t78 11q57 0 102-20t76-55 48-86 17-112q0-58-16-108t-47-86-80-57-113-20q-50 0-94 14t-79 42-57 71-27 99h98q10-69 52-106t107-35q37 0 65 13t48 37 29 59 10 76q0 38-11 71t-31 57-51 39-70 14q-26 0-44-4t-34-10-29-16-27-22z","M479 857v-93h-9q-52 0-92-10t-71-30-53-44-37-55-22-64-10-67q15 17 33 32t42 26 47 18 54 6q61 0 105-23t73-62 42-86 13-98q0-57-16-107t-48-89-79-59-109-22q-44 0-81 13t-66 35-51 52-36 65-22 72-7 75v49q0 56 7 112t24 108 45 97 72 78 103 52 140 19h9z m-135-367q-26 0-51-9t-46-23-38-37-25-47v-34q0-54 13-96t34-70 51-43 60-15q36 0 64 14t47 38 29 59 10 75q0 36-9 70t-27 60-47 42-65 16z","M614 798l-338-757h-109l337 725h-441v91h551v-59z","M599 644q-1-61-33-109t-87-74q31-13 57-34t44-45 28-56 10-65q0-55-21-98t-55-73-82-45-101-15q-55 0-102 15t-83 45-55 72-20 99q0 34 10 65t27 56 43 46 57 33q-27 13-49 32t-37 42-23 51-9 58q0 53 18 95t50 70 75 44 96 15q52 0 96-15t77-44 51-70 18-95z m-85-380q0 34-11 62t-33 49-49 32-63 11q-35 0-64-11t-49-32-31-49-11-62q0-35 11-63t31-47 49-29 65-10q34 0 63 10t49 29 32 47 11 63z m-19 378q0 31-10 57t-29 44-43 29-56 11-55-10-42-28-28-45-10-58 10-57 28-44 43-28 55-10q30 0 55 10t44 28 28 44 10 57z","M209 133q55 0 97 10t73 28 52 42 34 54 19 62 8 67q-13-17-31-32t-39-26-48-18-58-6q-60 0-105 24t-72 62-42 88-14 98q0 58 16 108t48 90 79 61 110 23q47 0 85-13t66-37 50-55 34-68 19-77 6-80v-38q0-52-5-106t-20-106-41-96-70-79-105-53-146-19h-11v92h11z m124 267q26 0 51 8t46 25 37 37 26 48v34q0 54-12 97t-34 72-50 45-60 16q-36 0-65-15t-47-40-30-61-10-75q0-36 9-70t27-61 46-44 66-16z"]


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
      if(info.baseline==undefined) info.baseline=0
      if(info.code=="ean13" && info.baseline==undefined){
        info.baseline=10
      }
      var bl=info.baseline
      var bl2=Math.floor(info.baseline/2)
      var first = item.bars[0]
      var offset = 0
      var st     = ``


      for(var i  = 0; i < item.weights.length; i++ ) {
        var w   = parseInt( item.weights[i] )
        if ( i%2 == first) {
        } else {
          if(item.role=="ctrl") bl=bl2
          if(w>0) {
            st += `M ${offset*100}, ${bl*100} h ${w*100} V ${(info.height)*100} h ${-w*100} z `
            if(info.code=="ean13" && item.role!="ctrl"){
              st+=transformNumbers((bl-1)*100,numbers[item.A])
            }
            if(info.code=="2of5" && item.role!="ctrl"){
              var n = item.ascii[0]
              st+=transformNumbers((bl-1)*100,numbers[n[0]],700,0)
              st+=transformNumbers((bl-1)*100,numbers[n[1]],700,700)
            }
          }
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
    if(info.code=="ean13"){
      numbers.forEach(function(item,index){
        svg+=`<glyph unicode = "${index}" horiz-adv-x = "700" d = "${transformNumbers((info.baseline-1)*100,item)}" />`
      })
    }
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
      testtext=""
      testtextenc = "4*L0G5L4L5G0G3**R0R0R8R6R9R4*"

    }

    var html=`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${info.name} Test Page</title>
        <style>
          @font-face { font-family: '${info.name}'; src: url('./${info.name}.woff'); }
          .barcodeS { font-family: '${info.name}'; font-size:${info.height}px;margin:5px} /* 1 bar is 1px whide */
          .barcodeM { font-family: '${info.name}'; font-size:${info.height*2}px;margin:5px } /* 2 bar is 1px whide */
          .barcodeL { font-family: '${info.name}'; font-size:${info.height*3}px;margin:5px } /* 3 bar is 1px whide */
          .barcodeXL { font-family: '${info.name}'; font-size:${info.height*4}px;margin:5px } /* 4 bar is 1px whide */
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

function transformNumbers(nh,p,nw=700,shift = 0){

  var ow = 700
  var oh = 900
  var sw=nw/ow
  var sh=nh/oh
  var tx=0
  var ty=0

  var scale=1
  if(sw<sh){
    ty = (nh - oh*sw)/2
    scale=sw
  }else{
    tx = (nw -ow*sh)/2
    scale=sh
  }
  var transformed = path(p)
    .scale(scale)
    .translate(tx+shift,ty+20*scale)
    .rel()
    .round(2)
    .toString();
  return transformed
}

function lengthFromWeights(weights){
  var tl=0
  for(var i = 0 ; i < weights.length;i++){
    tl+=parseInt(weights[i])
  }
  return tl
}

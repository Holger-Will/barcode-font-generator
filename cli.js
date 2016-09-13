#!/usr/bin/env node
"use strict";

var Generator = require("./")
var generator=new Generator()
generator.generate({name:"test_font",height:35,code:"code39",output:"test.ttf"})

function main(){
  var info ={}
  for(var i=2;i< process.argv.length;i++){
    switch(process.argv[i]){
      case "-n":
      case "--name":
        info.name=process.argv[i+1]
        i++
      break
      case "-h":
      case "--height":
        info.height=process.argv[i+1]
        i++
      break
      case "-c":
      case "--code":
        info.code=process.argv[i+1]
        i++
      break
      case "-i":
      case "--input":
        info.in=process.argv[i+1]
        i++
      break
      case "-o":
      case "--output":
        info.out=process.argv[i+1]
        i++
      break
    }
  }
  var cf = (info.code!=undefined) ? "./data/"+info.code+".json" : info.input
  if(cf==undefined){
    console.log("no code or input file specified")
    return
  }
  var def = require(cf)
  var codes = def.codes
  console.log(
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
  )
  codes.forEach(function(item,index){
    // shift the start codes by 10 bars to left right to satisfy the requirments of a quite zone
    var first = item.bars[0]
    var offset = 0
    var st     = ``
    for(var i  = 0; i < item.weights.length; i++ ) {
      var w   = parseInt( item.weights[i] )
      if ( i%2 == first) {
      } else {
        if(w>0) st += `M ${offset*100}, 0 h ${w*100} V ${info.height*100} h ${-w*100} z `
      }
      offset += w
    }
    // the horizontal advance is different for the start and end codes because of the required quite zone
    var hax = lengthFromWeights(item.weights)
    item.ascii.forEach(function(a,index){
      console.log(`    <glyph unicode = "&#${a};" horiz-adv-x = "${hax*100}" d = "${st}" />`)
    })
  })
  console.log(
  `  </font>
  </svg>`)
}
function lengthFromWeights(weights){
  tl=0
  for(var i = 0 ; i < weights.length;i++){
    tl+=parseInt(weights[i])
  }
  return tl
}
//main()

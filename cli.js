#!/usr/bin/env node
"use strict";

var Generator = require("./")
var generator=new Generator()


var info ={name:'test_font',height:35,code:"code39"}
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

if(info.output == undefined) info.output = info.name
generator.generate(info)

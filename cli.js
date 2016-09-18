#!/usr/bin/env node
"use strict";

var Generator = require("./")
var generator=new Generator()


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
      info.input=process.argv[i+1]
      i++
    break
    case "-o":
    case "--output":
      info.out=process.argv[i+1]
      i++
    break
    case "-bl":
    case "--baseline":
      info.baseline=process.argv[i+1]
      i++
    break
    case "-wn":
    case "--with-numbers":
      info.numbers=true
    break
  }
}

if(info.output == undefined) info.output = info.name
generator.generate(info)

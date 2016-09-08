const codes=require("./code_table.json").codes
function toDivs(ws){
  var par = `<div style="display:flex;flex-direction:row">`
  var parend= "</div>"
  for(var i  = 0; i < ws.length; i++ ) {
    var bg="white"
    if(i%2==0) bg = "black"
    var bar = `<div style="width:${ws[i]*2}px;height:20px;background:${bg}"></div>`
    par+=bar
  }
  return par+parend
}


console.log(
`| Code | A | ASCII | Symbol | Bars and Spaces | Weights | encoded |
| --- | --- | --- | --- | --- | --- | --- |`
)
codes.forEach(function(item,index){
  console.log(`| ${item.code} | ${item.A} | ${item.ascii} | ${String.fromCharCode(item.ascii[0])} | ${item.bars} | ${item.weights} | ${toDivs(item.weights)} |`)
})

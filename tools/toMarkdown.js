const codes=require("./code_table.json").codes
console.log(
`| Code | A | B | C | ASCII | Bars and Spaces | Weights |
| --- | --- | --- | --- | --- | --- | --- |`
)
codes.forEach(function(item,index){
  console.log(`| ${item.code} | ${item.A} | ${item.B} | ${item.C} | ${item.ascii} | ${item.bars} | ${item.weights} |`)
})

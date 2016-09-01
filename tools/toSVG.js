const codes=require("./code_table.json").codes
console.log(
`<svg xmlns="http://www.w3.org/2000/svg">
  <font id = "code128"
        horiz-adv-x   = "1100"
        vert-origin-x = "0"
        vert-origin-y = "0" >
    <font-face font-family  = "code128"
               font-weight  = "normal"
               units-per-em = "2200"
               cap-height   = "2200"
               x-height     = "2200"
               bbox         = "0 0 2200 2200">
      <font-face-src>
        <font-face-name name="code128"/>
      </font-face-src>
    </font-face>`
)
codes.forEach(function(item,index){
  // sheft the start codes by 10 bars to left right to satisfy the requirments of a quite zone
  var offset = (item.code >= 102 && item.code <= 105) ? 10 : 0
  var st     = `M ${offset*100}, 0`
  for(var i  = 0; i < item.weights.length; i++ ) {
    var w   = parseInt( item.weights[i] )
    offset += w*1
    if ( i%2 == 0 ) {
      st += ` h ${w*100} V 2200 h ${-w*100} z`
    } else {
      st += ` M ${offset*100}, 0`
    }
  }
  // the horizontal advance is different for the start and end codes because of the required quite zone
  var hax = ""
  if (item.code >= 102 && item.code <= 105) hax = `horiz-adv-x="2100"`
  if (item.code == 106) hax = `horiz-adv-x="2300"`
  item.ascii.forEach(function(a,index){
    console.log(`    <glyph unicode = "&#${a};" ${hax} d = "${st}" />`)
  })
})
console.log(
`  </font>
</svg>`)

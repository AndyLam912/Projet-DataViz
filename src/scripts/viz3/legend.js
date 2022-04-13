

export function draw(playerColors) {

  const CIRCLE_WIDTH = 9
  const STROKE_WIDTH = 2
  
  var legend = d3.select("#connected-dot-plot")
    .append("div")
    .attr("class", "legend")
    .style('display', 'flex')
    .style('justify-content', 'center')
    .style('alight-items', 'center')

  playerColors.forEach(player => {
    legend.append('svg')
    .attr('width', (CIRCLE_WIDTH + STROKE_WIDTH) * 2)
    .attr('height', (CIRCLE_WIDTH + STROKE_WIDTH) * 2)
    .style('margin', '0px 5px')
    .append('circle')
    .attr('r', CIRCLE_WIDTH )
    .attr('cx',CIRCLE_WIDTH + STROKE_WIDTH )
    .attr('cy',CIRCLE_WIDTH + STROKE_WIDTH)
    .style('fill', player.color)
    .style('stroke', 'black')
    .style('stroke-width', STROKE_WIDTH)

    legend.append("span").text(player.player).style('margin-right', '20px');

  })
}
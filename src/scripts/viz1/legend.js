import * as constants from '../constants.js'

const Players = [{ player: 'Neymar', color: constants.NEYMAR_COLOR }, { player: 'Baseline', color: constants.ORANGE }];


/**
 * Function used to draw legend for radar chart visualisation
 * Inspired from: https://d3-graph-gallery.com/graph/custom_legend.html
 */
export function draw() {
  var x_axis = 10;
  var y_axis = 130;

  var legend = d3.select(".radar-chart-global")
    .append("svg")
    .attr("class", "legend")
    .attr("height", "300")
    .attr("width", "100");

  Players.forEach(player => {
    legend.append("circle").attr("cx", x_axis).attr("cy", y_axis).attr("r", 6).style("fill", player.color);
    x_axis += 10;
    legend.append("text").attr("x", x_axis).attr("y", y_axis).text(player.player).style("font-size", "15px").attr("alignment-baseline", "middle");

    x_axis -= 10;
    y_axis += 30;
  })
}
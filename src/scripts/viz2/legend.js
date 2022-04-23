import * as constants from '../constants.js'

const SubGroups = [{ SubGroup: 'Statistiques de Neymar', color: constants.NEYMAR_COLOR}, 
                { SubGroup: 'Statistiques attendues', color: constants.ORANGE}];

/**
 * Function used to draw legend for radar chart visualisation
 * Inspired from: https://d3-graph-gallery.com/graph/custom_legend.html
 */
export function draw() {
  var x_axis = 150;
  var rect_y_axis = 5;
  var text_y_axis = 15;

  var legend = d3.select(".multi-set-bar-chart")
    .append("svg")
    .attr("class", "legend")
    .attr("height", "30")
    .attr("width", "600");

    SubGroups.forEach(SubGroup => {
    legend.append("rect").attr("x", x_axis).attr("y", rect_y_axis).attr("width", 15).attr("height", 15).attr("fill", SubGroup.color);
    x_axis += 20;
    legend.append("text").attr("x", x_axis).attr("y", text_y_axis).text(SubGroup.SubGroup).style("font-size", "15px").attr("alignment-baseline", "middle");

    x_axis += 180;
  })
}
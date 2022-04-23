import * as constants from '../constants.js'

const fouls = [{ foul: 'Cartons Rouges', color: constants.RED }, { foul: 'Cartons Jaunes', color: constants.YELLOW }, { foul: 'Avertissements', color: constants.GRAY } ];
// Draw legend of this visualisation
export function draw() {
  var x_axis = 10;
  var y_axis = 130;
  var text_y_axis = 140;

  var legend = d3.select(".stacked-bar-chart")
    .append("svg")
    .attr("class", "legend")
    .attr("height", "300")
    .attr("width", "150");

    fouls.forEach(foul => {
    legend.append("rect").attr("x", x_axis).attr("y", y_axis).attr("width", 15).attr("height", 15).attr("rx", "3").style("fill", foul.color);
    x_axis += 20;
    legend.append("text").attr("x", x_axis).attr("y", text_y_axis).text(foul.foul).style("font-size", "15px").attr("alignment-baseline", "middle");

    x_axis -= 20;
    y_axis += 30;
    text_y_axis += 30;
  })
}
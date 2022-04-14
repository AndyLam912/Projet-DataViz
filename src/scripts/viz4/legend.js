import * as constants from '../constants.js'

const color = d3
.scaleOrdinal(d3.schemePastel1)
.domain(
  ['Completed Pass', 'Attempted Pass', 'GCA Pass', "SCA Pass"]
);

const STATS = [
  { stat: 'Completed Pass', color: color('Completed Pass') },
  { stat: 'Attempted Pass', color: color('Attempted Pass') },
  { stat: 'GCA Pass', color: color('GCA Pass') },
  { stat: 'SCA Pass', color: color('SCA Pass') }
];

export function draw() {
  var x_axis = 10;
  var y_axis = 130;
  var text_y_axis = 140;

  var legend = d3
    .select(".pie-chart")
    .append("svg")
    .attr("class", "legend")
    .attr("height", "300")
    .attr("width", "150");

    STATS.forEach(stat => {
    legend.append("rect").attr("x", x_axis).attr("y", y_axis).attr("width", 15).attr("height", 15).attr("rx", "3").style("fill", stat.color);
    x_axis += 20;
    legend.append("text").attr("x", x_axis).attr("y", text_y_axis).text(stat.stat).style("font-size", "15px").attr("alignment-baseline", "middle");

    x_axis -= 20;
    y_axis += 30;
    text_y_axis += 30;
  });
}
import * as constants from '../constants.js'

const STATS = [
  { stat: 'Completed Pass', color: constants.LIGHT_RED },
  { stat: 'Failed Pass', color: constants.LIGHT_BLUE },
  { stat: 'GCA Pass', color: constants.LIGHT_GREEN },
  { stat: 'SCA Pass', color: constants.LIGHT_PURPLE },
  { stat: 'Remaining SCA Pass', color: constants.LIGHT_PINK },
  { stat: 'Remaining Completed Pass', color: constants.LIGHT_YELLOW }
];

const FRENCH = {
  'Completed Pass': 'Passes complétées',
  'Failed Pass': 'Passes ratées',
  'GCA Pass': 'Passes de type GCA',
  'SCA Pass': 'Passes de type SCA',
  'Remaining SCA Pass': 'Restant des passes SCA',
  'Remaining Completed Pass': 'Restant des passes complétées'
};

export function draw() {
  var x_axis = 0;
  var y_axis = 80;
  var text_y_axis = 90;

  var legend = d3
    .select(".pie-chart")
    .append("svg")
    .attr("class", "legend")
    .attr("height", "300")
    .attr("width", "200");

  STATS.forEach(stat => {
    const DEFAULT = ["Completed Pass", "Failed Pass"]
    if (!DEFAULT.includes(stat.stat)) {
      return;
    }
    legend.append("rect").attr("x", x_axis).attr("y", y_axis).attr("width", 15).attr("height", 15).attr("rx", "3").style("fill", stat.color);
    x_axis += 20;
    legend.append("text").attr("x", x_axis).attr("y", text_y_axis).text(FRENCH[stat.stat]).style("font-size", "15px").attr("alignment-baseline", "middle");

    x_axis -= 20;
    y_axis += 30;
    text_y_axis += 30;
  });
}

export function update(statsToAdd) {
  let legend = d3
  .select(".pie-chart .legend")

  legend
  .selectAll("rect")
  .remove();

  legend
  .selectAll("text")
  .remove();

  var x_axis = 10;
  var y_axis = 80;
  var text_y_axis = 90;

  STATS.forEach(stat => {
    if (!statsToAdd.includes(stat.stat)) {
      return;
    }

    legend.append("rect").attr("x", x_axis).attr("y", y_axis).attr("width", 15).attr("height", 15).attr("rx", "3").style("fill", stat.color);
    x_axis += 20;
    legend.append("text").attr("x", x_axis).attr("y", text_y_axis).text(FRENCH[stat.stat]).style("font-size", "15px").attr("alignment-baseline", "middle");

    x_axis -= 20;
    y_axis += 30;
    text_y_axis += 30;
  });
}
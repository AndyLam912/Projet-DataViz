import * as constants from '../constants.js'

const SubGroups = [{ SubGroup: 'Réceptions de passes réussites (%)', color: constants.GRAY}, 
                { SubGroup: 'Dribbles réussis (%)', color: constants.ORANGE},
                { SubGroup: 'Contrôles de la balle réussis (%)', color: constants.BLUE}];

/**
 * Function used to draw legend for radar chart visualisation
 * Inspired from: https://d3-graph-gallery.com/graph/custom_legend.html
 */
export function draw() {
  var x_axis = 150;
  var rect_y_axis = 5;
  var text_y_axis = 15;

  var legend = d3.select(".multi-set-bar-chart-2")
    .append("svg")
    .attr("class", "legend")
    .attr("height", "30")
    .attr("width", "900");

    var counter = 0;
    SubGroups.forEach(SubGroup => {
        legend.append("rect").attr("x", x_axis).attr("y", rect_y_axis).attr("width", 15).attr("height", 15).attr("fill", SubGroup.color);
        x_axis += 20;
        legend.append("text").attr("x", x_axis).attr("y", text_y_axis)
          .text(SubGroup.SubGroup).style("font-size", "15px")
          .attr("alignment-baseline", "middle")
          .attr("id", `subgroup_${counter}`);

        if(SubGroup.SubGroup === 'Dribbles réussis (%)'){
            x_axis += 140;
        }else{
            x_axis += 230;
        }

        counter += 1;
  })
}
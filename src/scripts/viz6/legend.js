const Players = [{ player: 'Statistiques de Neymar', color: 'rgb(54,185,67)'}, 
                { player: 'Statistiques attendues', color: 'rgb(255, 199, 11)'}];

export function draw() {
  var x_axis = 150;
  var rect_y_axis = 5;
  var text_y_axis = 15;

  var legend = d3.select(".multi-set-bar-chart")
    .append("svg")
    .attr("class", "legend")
    .attr("height", "30")
    .attr("width", "600");

  Players.forEach(player => {
    legend.append("rect").attr("x", x_axis).attr("y", rect_y_axis).attr("width", 15).attr("height", 15).attr("fill", player.color);
    x_axis += 20;
    legend.append("text").attr("x", x_axis).attr("y", text_y_axis).text(player.player).style("font-size", "15px").attr("alignment-baseline", "middle");

    x_axis += 180;
  })
}
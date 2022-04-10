const Players = [{ player: 'Statistiques de Neymar', color: 'rgb(54,185,67)', stroke: 'rgb(1, 32, 14)'}, 
                { player: 'Statistiques attendues', color: 'rgb(255, 199, 11)', stroke: 'rgb(255, 51, 51)' }];

export function draw() {
  var x_axis = 10;
  var y_axis = 130;

  var legend = d3.select(".radarr-chart .legend")

  Players.forEach(player => {
    legend.append("rect").attr("x", x_axis).attr("y", y_axis).attr("width", 5).attr("height", 5).attr("stroke", player.stroke).attr("fill", player.color);
    x_axis += 10;
    legend.append("text").attr("x", x_axis).attr("y", y_axis).text(player.player).style("font-size", "15px").attr("alignment-baseline", "middle");

    x_axis -= 10;
    y_axis += 30;
  })
}
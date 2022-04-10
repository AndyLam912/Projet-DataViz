const Players = [{ player: 'Neymar', color: 'rgb(0,0,255)' }, { player: 'Baseline', color: 'rgb(255, 127, 80)' }];

export function draw() {
  var x_axis = 10;
  var y_axis = 130;

  var legend = d3.select(".radar-chart .legend")

  Players.forEach(player => {
    legend.append("circle").attr("cx", x_axis).attr("cy", y_axis).attr("r", 6).style("fill", player.color);
    x_axis += 10;
    legend.append("text").attr("x", x_axis).attr("y", y_axis).text(player.player).style("font-size", "15px").attr("alignment-baseline", "middle");

    x_axis -= 10;
    y_axis += 30;
  })
}
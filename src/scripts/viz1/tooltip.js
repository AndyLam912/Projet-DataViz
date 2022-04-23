const tooltip = d3.select(".radar-chart .chart .tooltip");
import * as constants from '../constants.js'


// Tooltip on label hover to explain which soccer statistic is being evaluated
export function getLabelsText(data) {
  tooltip.style("opacity", 1);
  const { x, y } = d3.event;
  tooltip.style("top", `${y - 20}px`);
  tooltip.style("left", `${x + 50}px`);
  tooltip.style("color", 'white');

  tooltip.append('p')
  .style('margin', '4px')
  .text(`${data.tooltip[0]}`)

  tooltip.append('p')
  .style('margin', '4px')
  .style('text-decoration', 'underline')
  .text('Statistique impliquée: ')

  tooltip.append('p')
  .style('margin', '4px')
  .text(`${data.tooltip[1]}`)
}

// Tooltip to illustrate value of specific tip on hover
export function getTipValue(data) {
  if(data.color === constants.NEYMAR_COLOR){
    data.color = 'lightgreen';
  }

  tooltip.style("opacity", 1);
  const { x, y } = d3.event;
  tooltip.style("top", `${y - 20}px`);
  tooltip.style("left", `${x + 15}px`);
  tooltip.text(data.value);
  tooltip.style("color", data.color);
}

// Remove tooltip when hover off
export function removeTooltip() {
  tooltip.text("");
  tooltip.style("opacity", 0);
}
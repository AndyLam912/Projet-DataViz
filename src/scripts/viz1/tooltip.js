const tooltip = d3.select(".radar-chart .chart .tooltip");
import * as constants from '../constants.js'


/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
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


export function removeTooltip() {
  tooltip.text("");
  tooltip.style("opacity", 0);
}
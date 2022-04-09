const tooltip = d3.select(".radar-chart .chart .tooltip");


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
  tooltip.text(data.tooltip);
  tooltip.style("color", 'white');
}


export function getTipValue(data) {
  tooltip.style("opacity", 1);
  const { x, y } = d3.event;
  tooltip.style("top", `${y - 20}px`);
  tooltip.style("left", `${x + 15}px`);
  tooltip.text(data.value);
  tooltip.style("color", data.color);
}


export function removeTooltip() {
  tooltip.style("opacity", 0);
}
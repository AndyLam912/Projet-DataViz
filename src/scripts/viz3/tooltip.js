

const tooltip = d3.select("#connected-dot-plot .tooltip");

/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getValueText(data, playerName, pos ) {
  tooltip.style("opacity", 1)
  .style("top", `${pos.y + 10}px`)
  .style("left", `${pos.x + 32}px`)
  .style("color", 'white');

  tooltip.append('h3').append('u')
  .style('margin', '4px')
  .text(`${playerName}`)
  
  tooltip.append('p')
  .style('margin', '4px')
  .text(`Saison : ${data.Season}`)

  tooltip.append('p')
  .style('margin', '4px')
  .text(" Gls/SoT : " + formatData(data[playerName]))

}

function formatData(value) { 
  let percentageValue = value*100
  return `${percentageValue.toFixed(2)} %`
}


export function removeTooltip() {
  tooltip.text("");
  tooltip.style("opacity", 0);
}



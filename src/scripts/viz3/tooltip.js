

const tooltip = d3.select("#connected-dot-plot .tooltip");


// Defines the format of the tooltip 
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
// Format data score 
function formatData(value) { 
  let percentageValue = value*100
  return `${percentageValue.toFixed(2)} %`
}

// Function to hide tooltip
export function removeTooltip() {
  tooltip.text("");
  tooltip.style("opacity", 0);
}



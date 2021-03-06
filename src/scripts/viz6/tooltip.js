

const tooltip = d3.select(".stacked-bar-chart .tooltip");

// Defines the contents of the tooltip.
export function getBarValues(data) {
  const { x, y } = d3.event;
  tooltip.style("opacity", 1)
  .style("top", `${y + 10}px`)
  .style("left", `${x + 10}px`)
  .style("color", 'white');

  tooltip.append('h3').append('u')
  .style('margin', '4px')
  .text(`${data.data.Player}`)

  tooltip.append('p')
  .style('margin', '4px')
  .text(`Cartons Rouges : ${data.data.CrdR} ${formatData(data,data.data.CrdR)}`)

  tooltip.append('p')
  .style('margin', '4px')
  .text(`Cartons Jaunes : ${data.data.CrdY} ${formatData(data,data.data.CrdY)}`)

  tooltip.append('p')
  .style('margin', '4px')
  .text(`Avertissements : ${data.data.Warning} ${formatData(data,data.data.Warning)}`)
}

// Function to format percentage with 2 decimal 
function formatData(data, element) { 
  let total = data.data.Warning + data.data.CrdY + data.data.CrdR;
  let pourcentage  = (element/total)*100
  return `(${pourcentage.toFixed(2)} %)`
}

// Function to hide tooltip tip 
export function removeTooltip() {
  tooltip.text("");
  tooltip.style("opacity", 0);
}



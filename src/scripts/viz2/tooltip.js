const tooltip = d3.select(".multi-set-bar-chart .chart .tooltip");

const GROUPS_HEPLER = {
  "(+/-)": "Le succès de l'équipe, +/-, comparée par le succès d’équipe attendue, soit xG+/-. ", 
  "Assistes": "Le nombre d'assiste aux buts commis par Neymar (Ast) comparé au nombre d'assistés attendu de sa part (xA)",
  "Buts": "Le nombre de buts total commis par Neymar (Gls) comparé au nombre de buts attendus par le joueur (xG)",
};

// Tooltip to illustrate the soccer statistic being evaluated in chart
export function getGroupText(key) {
  tooltip.style("opacity", 1);
  const { x, y } = d3.event;
  tooltip.style("top", `${y - 20}px`);
  tooltip.style("left", `${x + 50}px`);
  tooltip.style("color", 'white');

  tooltip.append('h3')
  .style('margin', '4px')
  .text(`${key}`)

  tooltip.append('p')
  .style('margin', '4px')
  .text(GROUPS_HEPLER[key])
}

// Remove tooltip when hover off
export function removeTooltip() {
  tooltip.text("");
  tooltip.style("opacity", 0);
}
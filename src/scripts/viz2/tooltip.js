const tooltip = d3.select(".multi-set-bar-chart .chart .tooltip");

/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */

const GROUPS_HEPLER = {
  "(+/-)": "La  statistique +/- est utilisée pour mesurer l'impact d'un joueur sur le jeu. Elle est calculée en prenant la valeur du nombre de buts effectué par l’équipe (onG) et le soustrayant par le nombre de buts alloué par l’équipe (onGA) lorsque le joueur est sur le terrain. Cette valeur est comparée par le succès d’équipe attendue (onxG soustrait avec onxGA), soit xG+/-. ", 
  "Assistes": "Le nombre d'assists au buts commis par Neymar (Ast) comparé au nombre d'assists attendu de sa part (xA)",
  "Buts": "Le nombre de buts total commis par Neymar (Gls) comparé au nombre de buts attendus par le joueur (xG)",
};


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

export function removeTooltip() {
  tooltip.text("");
  tooltip.style("opacity", 0);
}
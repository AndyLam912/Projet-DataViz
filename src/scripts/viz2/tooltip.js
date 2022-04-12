const tooltip = d3.select(".multi-set-bar-chart .chart .tooltip");

/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */

const GROUPS_HEPLER = {
  "(+/-)": "La  statistique plus/minus est utilisée pour mesurer l'impact d'un joueur sur le jeu. Elle est calculée en prenant la valeur du nombre de buts effectué par l’équipe (onG) et le soustrayant par le nombre de buts alloué par l’équipe (onGA) lorsque le joueur est sur le terrain. Cette valeur est comparée par le succès d’équipe attendue (onxG soustrait avec onxGA), soit xG+/-. ", 
  "Assists": "Le nombre d'assists au buts commis par Neymar (Ast) comparé au nombre d'assists attendu de sa part (xA)",
  "Goals": "Le nombre de buts total commis par Neymar (Gls) comparé au nombre de buts attendus par le joueur (xG)",
};


export function getGroupText(key) {
  tooltip.style("opacity", 1);
  const { x, y } = d3.event;
  tooltip.style("top", `${y - 20}px`);
  tooltip.style("left", `${x + 50}px`);
  tooltip.text(GROUPS_HEPLER[key]);
  tooltip.style("color", 'white');
}

export function removeTooltip() {
  tooltip.text("");
  tooltip.style("opacity", 0);
}
/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */

const GROUPS_HEPLER = [
  "La statistique mesure la performance au niveau des passes du joueur. Elle est calculée en prenant le ratio Nombre de passes complétées / Nombre de tentatives de passes.", 
  "La statistique mesure la performance des passes complétées. Elle est calculée en prenant le ratio Nombre de passes qui a mené à un tir / Nombre de passes complétées.",
  "La statistique mesure la performance des passes de type SCA. Elle est calculée en prenant le ratio Nombre de passes qui a mené à un but / Nombre de passes qui a mené à un tir."
];

const tooltip = d3.select("#radio-button .tooltip");
const region_tooltip = d3.select(".pie-chart .tooltip");

function getTooltipText(key) {
  tooltip.style("opacity", 1);
  const { x, y } = d3.event;
  tooltip.style("top", `${y - 150}px`);
  tooltip.style("left", `${x}px`);
  tooltip.text(GROUPS_HEPLER[key]);
  tooltip.style("color", 'white');
}

export function getRegionTooltipText(text) {
  region_tooltip.style("opacity", 1);
  const { x, y } = d3.event;
  region_tooltip.style("top", `${y - 20}px`);
  region_tooltip.style("left", `${x}px`);
  region_tooltip.text(text);
  region_tooltip.style("color", 'white');
}

export function showToolTip() {
  for (let i = 0; i < 3; i++) {
    d3
    .select("#Capa_" + i)
    .style("cursor", "pointer")
    .on("mouseenter", function() { d3.select("#Capa_" + i).attr("style", "fill: silver"); getTooltipText(i); })
    .on("mouseleave", function() { d3.select("#Capa_" + i).attr("style", "fill: black"); removeTooltip(); });
  }
}

export function showRegionToolTip(slice, text) {
  slice
  .style("cursor", "pointer")
  .on("mouseenter", function() { getRegionTooltipText(text); })
  .on("mouseleave", function() { removeRegionToolTip(); });
}

export function removeTooltip() {
  tooltip.text("");
  tooltip.style("opacity", 0);
}

export function removeRegionToolTip() {
  region_tooltip.text("");
  region_tooltip.style("opacity", 0);
}
// set tooltip text
const GROUPS_HEPLER = [
    "Pourcentage de fois que le joueur a reçu une passe avec succès, sans se faire intercepter ou voler par un adversaire",
    "Pourcentage de dribbles réussis",
    "Pourcentage du contrôle de la balle sans la perdre à un adversaire"
  ];
  
  const tooltip = d3.select(".multi-set-bar-chart-2 #bar-chart .tooltip");
  
  // Function to get tooltip text for a given key
  function getTooltipText(key) {
    tooltip.style("opacity", 1);
    const { x, y } = d3.event;
    tooltip.style("top", `${y - 20}px`);
    tooltip.style("left", `${x + 50}px`);
    tooltip.text(GROUPS_HEPLER[key]);
    tooltip.style("color", 'white');
  }

  // Function to set tooltip to the legend input
  export function showToolTip() {
    for (let i = 0; i < 3; i++) {
      d3
      .select("#subgroup_" + i)
      .style("cursor", "pointer")
      .on("mouseenter", function() { d3.select("#subgroup_" + i).attr("style", "fill: silver"); getTooltipText(i); })
      .on("mouseleave", function() { d3.select("#subgroup_" + i).attr("style", "fill: black"); removeTooltip(); });
    }
  }
   
  // Function to remove legend tooltip
  export function removeTooltip() {
    tooltip.text("");
    tooltip.style("opacity", 0);
  }
  

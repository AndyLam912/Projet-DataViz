/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
 export function setCanvasSize (width, height) {
    d3.select('#connected-dot-plot').select('svg')
      .attr('width', width)
      .attr('height', height)
  }

  export function findMinScore(seasonScoreObj){ 
    let scores = [seasonScoreObj.Neymar, seasonScoreObj.Messi, seasonScoreObj.Ronaldo]
    return d3.min(scores)
  }

  export function findMaxScore(seasonScoreObj){ 
    let scores = [seasonScoreObj.Neymar, seasonScoreObj.Messi, seasonScoreObj.Ronaldo]
    return d3.max(scores)
  }
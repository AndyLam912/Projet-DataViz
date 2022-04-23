
// Find the minimum score between all three players for one season
export function findMinScore(seasonScoreObj){ 
  let scores = [seasonScoreObj.Neymar, seasonScoreObj.Messi, seasonScoreObj.Ronaldo]
  return d3.min(scores)
}

// Find the maximum score between all three players for one season
export function findMaxScore(seasonScoreObj){ 
  let scores = [seasonScoreObj.Neymar, seasonScoreObj.Messi, seasonScoreObj.Ronaldo]
  return d3.max(scores)
}
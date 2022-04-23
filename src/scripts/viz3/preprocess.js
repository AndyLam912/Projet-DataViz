
//Regroup all scores from each player by season
export function preprocessData (data) { 
    
    let groupedData = d3.group(data, d => d.Season)
    let listSeasonsScores = []
    groupedData.forEach(element => {
        listSeasonsScores.push(
            createSeasonScoresObj(element)
        )
    });
    return listSeasonsScores
}

// Create an object structure to group all 3 players' score for each season
function createSeasonScoresObj(seasonData) { 
    let seasonScoresObj = {Season : seasonData[0].Season}
    seasonData.forEach(playerData =>{
        seasonScoresObj[playerData.Player] = playerData["Gls"]/playerData["SoT"]
    })
    return seasonScoresObj
}

// Return a list containing all seasons
export function getAllSeasonSorted( data) { 
    let seasonDomain = d3.set(data.map(d => d.Season)).values()
    return seasonDomain.sort()
}
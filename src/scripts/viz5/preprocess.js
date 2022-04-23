// Function used to filter out unwanted data from csv
export function FilterOutUnwantedData(data) {
    var filteredData = [];

    const wantedStats = ["Player", "Carries", "Dis", "Rec%", "Succ%"];

    for (var i = 0; i < data.length; i++) {
        var stats ={};
        for (var j = 0; j < wantedStats.length; j++) {
            stats[wantedStats[j]] = data[i][wantedStats[j]];
        }
        filteredData.push(stats);
    }
    return filteredData;
}

// Function used to calculate ball control statistic ((carries - dis) / carries)
export function CalculateBallControlStat(data) {

    for (var i = 0; i < data.length; i++) {
        var Carries = data[i]["Carries"];
        var Dis = data[i]["Dis"];

        var ballControl = ((Carries - Dis)/Carries)*100;
        ballControl = Math.round(ballControl * 10) / 10;

        delete data[i]["Carries"];
        delete data[i]["Dis"];

        data[i]["Ball-ctrl%"] = ballControl;
    }
    return data;
}

// Function change percentages to decimals
export function ChangetoDecimal(data) {
    var keys = Object.keys(data[0]);
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < keys.length; j++) {
            if(keys[j] !== "Player"){
                data[i][keys[j]] /= 100;
                data[i][keys[j]] = Math.round(data[i][keys[j]] * 1000) / 1000;
            }
        }
    }
    return data;
}

// Function to get the groups
export function getGroups(data) {
    var groups = []
    for (var i = 0; i < data.length; i++) {
        groups.push(data[i]["Player"]);
    }
    return groups;
}

// Function to get the subgroups
export function getSubGroups(data) {
    var keys = Object.keys(data[0]);
    var subgroups = [];
    for (var i = 0; i < keys.length; i++) {
        if(keys[i] !== "Player"){
            subgroups.push(keys[i]);
        }
    }
    return subgroups;
}
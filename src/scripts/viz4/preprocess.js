export function getPlayerCompletedPassData(player, data) {
    let parsedData = d3.map(data, d => d.Player)
    return [
        {
            "label": "Completed Pass",
            "value": parsedData.get(player).Cmp
        },
        {
            "label": "Failed Pass",
            "value": (parsedData.get(player).Att - parsedData.get(player).Cmp)
        }
    ];
}

export function getPlayerEffectiveGCAPassData(player, data) {
    let parsedData = d3.map(data, d => d.Player)
    let GCAPass = parsedData.get(player).GCAPassLive + parsedData.get(player).GCAPassDead
    let SCAPass = parsedData.get(player).SCAPassLive + parsedData.get(player).SCAPassDead
    return [
        {
            "label": "GCA Pass",
            "value": GCAPass
        },
        {
            "label": "Remaining SCA Pass",
            "value": SCAPass - GCAPass
        }
    ];
}

export function getPlayerEffectiveSCAPassData(player, data) {
    let parsedData = d3.map(data, d => d.Player)
    let SCAPass = parsedData.get(player).SCAPassLive + parsedData.get(player).SCAPassDead
    return [
        {
            "label": "SCA Pass",
            "value": SCAPass
        },
        {
            "label": "Remaining Completed Pass",
            "value": parsedData.get(player).Cmp - SCAPass
        }
    ];
}
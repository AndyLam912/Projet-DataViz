export function getPlayerCompletedPassData(player, data) {
    let parsedData = d3.map(data, d => d.Player)
    return [
        {
            "label": "Completed Pass",
            "value": parsedData.get(player).Cmp
        },
        {
            "label": "Attempted Pass",
            "value": parsedData.get(player).Att
        }
    ];
}

export function getPlayerEffectiveGCAPassData(player, data) {
    let parsedData = d3.map(data, d => d.Player)
    return [
        {
            "label": "GCA Pass",
            "value": parsedData.get(player).GCAPassLive + parsedData.get(player).GCAPassDead
        },
        {
            "label": "SCA Pass",
            "value": parsedData.get(player).Cmp + parsedData.get(player).Cmp
        }
    ];
}

export function getPlayerEffectiveSCAPassData(player, data) {
    let parsedData = d3.map(data, d => d.Player)
    return [
        {
            "label": "SCA Pass",
            "value": parsedData.get(player).SCAPassLive + parsedData.get(player).SCAPassDead
        },
        {
            "label": "Completed Pass",
            "value": parsedData.get(player).GCAPassLive + parsedData.get(player).GCAPassDead
        }
    ];
}
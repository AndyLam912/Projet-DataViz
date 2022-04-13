export function getGroups(data) {
    return d3.map(data, function(d){return(d.Group)}).keys();
}

export function getSubGroups(data) {
    return data.columns.slice(1);
}
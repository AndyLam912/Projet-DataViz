// Function to get the groups
export function getGroups(data) {
    return d3.map(data, function(d){return(d.Group)}).keys();
}

// Function to get the subgroups
export function getSubGroups(data) {
    return data.columns.slice(1);
}
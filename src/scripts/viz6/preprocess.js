export function filterData(data) {
    const validKeys = ['Player', 'CrdY', 'CrdR', 'Fls'];
    for (var i = 0; i < data.length; i++){
        Object.keys(data[i]).forEach((key) => validKeys.includes(key) || delete data[i][key]);
    }
    return data;
}

export function updateData(filter_data) {
    for (var i = 0; i < filter_data.length; i++){
        filter_data[i].Warning = filter_data[i].Fls - (filter_data[i].CrdY + filter_data[i].CrdR);
        delete filter_data[i].Fls;
    }
    return filter_data;
}

export function getGroups(updated_data) {
    var groups = [];
    for (var i = 0; i < updated_data.length; i++){
        groups.push(updated_data[i].Player);
    }
    return groups;
}

export function getSubGroups(updated_data) {
    var sub_groups = [];
    
    for (var i = 0; i < updated_data.length; i++){
        sub_groups.push(
            {
              Warning: updated_data[i].Warning,
              CrdY: updated_data[i].CrdY,
              CrdR: updated_data[i].CrdR
            }
        );
    }
    
    return Object.keys(sub_groups[0]);
}
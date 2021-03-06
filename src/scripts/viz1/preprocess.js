// Function to create our baseline from 8 strikers
 export function createBaseline(data) {
  var baseline = {};
  var keys = Object.keys(data[0]);

  for (var i = 0; i < keys.length; i++) {
    if (keys[i] !== 'Player') {
      baseline[keys[i]] = 0;
    }
  }
  var keys = Object.keys(baseline)
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < keys.length; j++) {
      baseline[keys[j]] += data[i][keys[j]];
    };
  };
  for (var i = 0; i < keys.length; i++) {
    baseline[keys[i]] /= data.length;
  };
  return (baseline);
}

// Function to pull only Neymar's data
export function getNeymarData(data) {
  var neymar = {};
  for (var i = 0; i < data.length; i++) {
    if (data[i].Player === 'Neymar') {
      neymar = data[i];
      delete neymar['Player']
      return (neymar);
    }
  }
  return (neymar);
}

// Function to round number to 2 numbers avec dot
export function roundStats(stats1, stats2) {
  var keys = Object.keys(stats1)
  for (var i = 0; i < keys.length; i++) {
    stats1[keys[i]] = Math.round(stats1[keys[i]] * 100) / 100
    stats2[keys[i]] = Math.round(stats2[keys[i]] * 100) / 100
  }
  return (stats1, stats2);
}

// Function to generateData used for visualisation
export function generateData(stats, length) {
  const data = [];
  const labels = ['Passes', 'Tirs', 'Dribbles', 'pression', 'Défense', 'Temps de jeu'];

  var stats_keys = Object.keys(stats)
  for (let i = 0; i < length; i++) {
    data.push(
      {
        name: labels[i],
        value: stats[stats_keys[i]]
      }
    );

  }
  return data;
}

/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
 export function cleanNames (data) {
  // TODO: Clean the player name data
  function capitalizePlayerName(playerName) {
    let name_segments = playerName.split(' ')
    let cap_name_segments = []
    name_segments.forEach((name) => {
      cap_name_segments.push(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    })
    return cap_name_segments.join(' ');
  }
  //Le split ainsi que le map sont utile au cas ou le player est plusieur mots, genre Lady Capulet.
  data.forEach((element) => element.Player = capitalizePlayerName(element.Player));
  
  return data;
}

/**
 * Finds the names of the 5 players with the most lines in the play.
 *
 * @param {object[]} data The dataset containing all the lines of the play
 * @returns {string[]} The names of the top 5 players with most lines
 */
export function getTopPlayers (data) {
  // TODO: Find the five top players with the most lines in the play
  let topFivePlayers = [];

  // Chaque element du map playerData contient le nom du joueur comme clé associé au nombre de lignes
  let playerData = new Map();
  data.forEach((element) => {
      if (playerData.has(element.Player)) {
        playerData.set(element.Player, playerData.get(element.Player) + 1);
      } else {
        playerData.set(element.Player, 1);
      }
  });

  for(let i = 0; i < 5; i++) {
    let playerNames = Array.from(playerData.keys());
    let playerLines = Array.from(playerData.values());
    
    let index = playerLines.indexOf(Math.max(...playerLines));
    let player = playerNames[index];

    topFivePlayers.push(String(player));
    playerData.delete(player);
  }
  return topFivePlayers
}

/**
 * Transforms the data by nesting it, grouping by act and then by player, indicating the line count
 * for each player in each act.
 *
 * The resulting data structure ressembles the following :
 *
 * [
 *  { Act : ___,
 *    Players : [
 *     {
 *       Player : ___,
 *       Count : ___
 *     }, ...
 *    ]
 *  }, ...
 * ]
 *
 * The number of the act (starting at 1) follows the 'Act' key. The name of the player follows the
 * 'Player' key. The number of lines that player has in that act follows the 'Count' key.
 *
 * @param {object[]} data The dataset
 * @returns {object[]} The nested data set grouping the line count by player and by act
 */
export function summarizeLines (data) {
  // TODO : Generate the data structure as defined above
  let acts = new Map();
  let summarizedData = [];

  //Pour initialiser les acts
  data.forEach((element) => {
    if(!acts.has(element.Act)) {
      acts.set(element.Act, []);
    } 
  });

  //remplir le tableau de joueurs et leur nombre de lignes respectif pour chaque acte
  data.forEach((element) => {
    let playersArray = acts.get(element.Act);

    if(playersArray.length <= 0){
      playersArray.push({'Player':element.Player, 'Count': 1});
    }else{
      let playerAlreadyExists = false;
      playersArray.forEach((elem) => {
        if(elem['Player'] == element.Player) {
          playerAlreadyExists = true
          elem['Count'] += 1
        }
      });
      if(!playerAlreadyExists) {
        playersArray.push({'Player':element.Player, 'Count': 1});
      }
    }
  });

  //remplir le tableau de summarized data
  let actskeys = Array.from(acts.keys());
  actskeys.forEach((key) => {
    summarizedData.push({'Act': key, 'Players': acts.get(key)});
  });

  return summarizedData
}

/**
 * For each act, replaces the players not in the top 5 with a player named 'Other',
 * whose line count corresponds to the sum of lines uttered in the act by players other
 * than the top 5 players.
 *
 * @param {object[]} data The dataset containing the count of lines of all players
 * @param {string[]} top The names of the top 5 players with the most lines in the play
 * @returns {object[]} The dataset with players not in the top 5 summarized as 'Other'
 */
export function replaceOthers (data, top) {
  // TODO : For each act, sum the lines uttered by players not in the top 5 for the play
  // and replace these players in the data structure by a player with name 'Other' and
  // a line count corresponding to the sum of lines
  let dataset = [];

  data.forEach((element) => {
    let newPlayersList = []
    let otherCount = 0

    element['Players'].forEach((player) => {
      if (top.includes(player['Player'])){
        newPlayersList.push({'Player':player['Player'], 'Count': player['Count']});

      } else {
        otherCount += player['Count'];
      }
    });

    newPlayersList.push({'Player': 'Other', 'Count': otherCount});
    dataset.push({'Act': element['Act'], 'Players': newPlayersList});
  });

  return dataset
}

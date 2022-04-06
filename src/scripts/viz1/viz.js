
/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateGroupXScale (scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  const domainValues  = data.map((element) => parseInt(element.Act))
  scale.domain(domainValues).range([0, width])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (scale, data, height) {
  // TODO : Set the domain and range of the graph's y scale
  var maxValue = 0
  data.forEach(act => {
    // Find the maximum Count on the current act
    var actMaxValue = Math.max(...act.Players.map(player => player.Count))
    if(maxValue < actMaxValue) { 
      maxValue = actMaxValue
    }
  })
  scale.domain([0, maxValue]).range([height,0 ])
}

/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
export function createGroups (data, x) {
  // TODO : Create the groups
  d3.select('#graph-g')
  .selectAll(".act_group")
  .data(data)
  .join('g')
  .attr('transform', (actElement) => "translate(" + x(actElement.Act) + ", 0)") 
  .attr('class', "act_group") 

}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function drawBars (y, xSubgroup, players, height, color, tip) {
  // TODO : Draw the bars

  d3.select('#graph-g')
  .selectAll('.act_group')
  .selectAll('rect')
  .data((actElement) => {
    // Add the Act Information for each player (needed for the tooltip)
    actElement.Players.forEach(player => { 
      player.Act = actElement.Act
    }) 
    return actElement.Players
  })

  .join('rect')
  .attr('x', (playerElement) => xSubgroup(playerElement.Player))
  .attr('y', (playerElement) => y(playerElement.Count))
  .attr('fill', (playerElement) => color(playerElement.Player))
  .attr('width', xSubgroup.bandwidth())
  .attr('height', (playerElement) => height - y(playerElement.Count))
  // Add all the event listeners for the tooltip
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide)
  
}

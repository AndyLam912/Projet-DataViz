/**
 * Draws a legend in the area at the bottom of the screen, corresponding to the bars' colors
 *
 * @param {string[]} data The data to be used to draw the legend elements
 * @param {*} color The color scale used throughout the visualisation
 */
export function draw (data, color) {
  // TODO : Generate the legend in the div with class "legend". Each SVG rectangle
  // should have a width and height set to 15.
  // Tip : Append one div per legend element using class "legend-element".
  const RECT_WIDTH = 15
  const RECT_HEIGHT = 15
  data.forEach(playerName => {
    // Create a div with the class "legend-element"
    const divElement = d3.select('.legend')
    .append('div')
    .attr('class', 'legend-element')
    
    // Create the colored rectangle
    divElement
    .append('svg')
    .attr('width', RECT_WIDTH)
    .attr('height', RECT_HEIGHT)
    .style('margin', '0px 2px')
    .append('rect')
    .attr('width', RECT_WIDTH)
    .attr('height', RECT_HEIGHT)
    .style('fill', color(playerName))
    .style('stroke', 'black')
    
    // Create the span to show the player's name 
    divElement
    .append('span')
    .text(playerName)
  })
}

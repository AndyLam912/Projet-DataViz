
import * as preproc from './preprocess.js'
import * as helper from './helper.js'
import * as tooltip from './tooltip.js'
import * as constant from '../constants.js'
import * as legend from './legend.js'

const CIRCLE_RADIUS = 14
const margin = { top: 40, right: 100, bottom: 40, left: 100 }
const sizeGraph = {height: 500, width: 1000}
const PLAYER_COLORS = [
  {player: 'Neymar', color: constant.NEYMAR_COLOR}, 
  {player: 'Ronaldo', color: constant.RONALDO_COLOR},
  {player: 'Messi' , color: constant.MESSI_COLOR}
]

// Main function to generate the connected dot plot (viz3)
export function createConnectedDotPlot(data) { 

  let dataProcessed = preproc.preprocessData(data)
  let allSeasons = preproc.getAllSeasonSorted(data)

  legend.draw(PLAYER_COLORS)
  createGraphElement()

  // Draw x axis
  let xScale = d3.scaleLinear().domain([0.0, 0.8]).range([0, sizeGraph.width])
  drawXAxis(xScale)

  // Draw y axis
  let yScale = d3.scaleBand().domain(allSeasons).range([0, sizeGraph.height ])
  drawYAxis(yScale)
  
  drawGridLines(xScale, sizeGraph);

  joinData(dataProcessed, yScale)

  drawConnectionLines(xScale, yScale)
  drawPlayerCircles('Neymar', constant.NEYMAR_COLOR, xScale, yScale)
  drawPlayerCircles('Messi', constant.MESSI_COLOR, xScale, yScale)
  drawPlayerCircles('Ronaldo', constant.RONALDO_COLOR, xScale, yScale)

}

// create the graph element in which all graph's elements will be drawn
export function createGraphElement() { 
  d3.select("#connected-dot-plot")
  .append("svg")
  .attr("width", sizeGraph.width + margin.left + margin.right)
  .attr("height", sizeGraph.height + margin.top + margin.bottom)
  .append("g")
  .attr('id', 'graphConnectedDotPlot')
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
}

// Function to join data
export function joinData(dataProcessed, yScale) { 
  d3.select('#graphConnectedDotPlot')
  .selectAll('seasonData')
  .data(dataProcessed)
  .join('g')
  .attr('transform', (seasonData) => "translate(0, " + (yScale(seasonData.Season)) + ")")
  .attr('class', 'seasonData')
}

// Function to draw a circle corresponding to the score of one player for a particular season
export function drawPlayerCircles(playerName, circleColor, xScale, yScale) { 
  d3.select('#graphConnectedDotPlot')
  .selectAll('.seasonData')
  .append('circle')
  .attr('transform', (seasonData) => "translate(" + xScale(seasonData[playerName]) + "," + ( yScale.bandwidth()/2) + ")")
  .attr('r', CIRCLE_RADIUS)
  .attr('fill', circleColor)
  .attr('stroke', '#000000')
  .attr('stroke-width', '3')
  .on('mouseenter', function(seasonData) {
    tooltip.getValueText(seasonData, playerName, d3.select(this).node().getBoundingClientRect())
    d3.select(this).attr('r',CIRCLE_RADIUS + 2)
  })
  .on('mouseleave', function() {
    tooltip.removeTooltip()
    d3.select(this).attr('r', CIRCLE_RADIUS)
  })
}

// Function to draw connection between all circles within a season
export function drawConnectionLines(xScale, yScale) { 
  var lineGenerator = d3.line()
  d3.select('#graphConnectedDotPlot')
  .selectAll('.seasonData')
  .append("path")
  .attr('d', d =>  lineGenerator([[ xScale(helper.findMinScore(d)), yScale.bandwidth()/2], [ xScale(helper.findMaxScore(d)),yScale.bandwidth()/2 ]]))
  .attr('stroke-width', 10)
  .attr('opacity', 0.2)
  .attr('stroke', 'black')
}

// Function to draw a gridline vertically
export function drawGridLines(xScale) { 
  var lineGenerator = d3.line()
  d3.select('#graphConnectedDotPlot')
  .selectAll('.gridline')
  .data(xScale.ticks())
  .join('path')
  .attr('class', 'gridline')
  .attr('d', (tick) => {
    return lineGenerator([[xScale(tick), 0], [xScale(tick), sizeGraph.height]])
  })
  .attr('stroke-width', 2)
  .attr('opacity', 0.1)
  .attr('stroke', 'black')
}

// Function to draw x axis
export function drawXAxis(xScale) { 
  let decimalFormatter = d3.format('.0%')
  let xAxis = d3.axisTop().scale(xScale).tickFormat(decimalFormatter)
  d3.select('#connected-dot-plot')
  .select('#graphConnectedDotPlot')
  .append('g')
  .call(xAxis)
  .style("stroke", "black")
}

// Function to draw y axis
export function drawYAxis(yScale) { 
  let yAxis = d3.axisLeft().scale(yScale)
  d3.select('#connected-dot-plot')
  .select('#graphConnectedDotPlot').append('g')
  .call(yAxis)
  .style("stroke", "black")
}

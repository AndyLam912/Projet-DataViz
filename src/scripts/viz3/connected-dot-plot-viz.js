
import * as preproc from './preprocess.js'
import * as helper from './helper.js'
import * as tooltip from './tooltip.js'
import * as constant from '../constants.js'

export function createConnectedDotPlot(data) { 
    const margin = { top: 40, right: 100, bottom: 40, left: 100 }
    const sizeGraph = {height: 500, width: 1000}
    
    const CIRCLE_RADIUS = 14

    let dataProcessed = preproc.preprocessData(data)
    let allSeasons = preproc.getAllSeasonSorted(data)


    let svg =  d3.select("#connected-dot-plot")
    .append("svg")
    .attr("width", sizeGraph.width + margin.left + margin.right)
    .attr("height", sizeGraph.height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    let decimalFormatter = d3.format('.0%')
    let xScale = d3.scaleLinear().domain([0.0, 0.8]).range([0, sizeGraph.width])
    let xAxis = d3.axisTop().scale(xScale).tickFormat(decimalFormatter)

    svg.append('g')
    .call(xAxis)
    .style("stroke", "#000000")
    
    console.log(allSeasons)
    let yScale = d3.scaleBand().domain(allSeasons).range([0, sizeGraph.height ])
    let yAxis = d3.axisLeft().scale(yScale)
    
    svg.append('g')
    .call(yAxis)
    .style("stroke", "#000000")

    console.log(xScale.ticks())

    let graphG = svg.append('g')
    .attr('class', 'graphConnectedDotPlot')
    
    var lineGenerator = d3.line()
    
    graphG
    .selectAll('.gridline')
    .data(xScale.ticks())
    .join('path')
    .attr('class', 'gridline')
    .attr('d', (tick) => {
      return lineGenerator([[xScale(tick), 0], [xScale(tick), sizeGraph.height]])
    })
    .attr('stroke-width', 2)
    .attr('opacity', 0.1)
    .attr('stroke', '#000000')

    graphG.selectAll('seasonData')
    .data(dataProcessed)
    .join('g')
    .attr('transform', (seasonData) => "translate(0, " + (yScale(seasonData.Season)) + ")")
    .attr('class', 'seasonData')

    
    graphG.selectAll('.seasonData')
    .append("path")
    .attr('d', d =>  lineGenerator([[ xScale(helper.findMinScore(d)), yScale.bandwidth()/2], [ xScale(helper.findMaxScore(d)),yScale.bandwidth()/2 ]]))
    .attr('stroke-width', 10)
    .attr('opacity', 0.2)
    .attr('stroke', '#000000')

  
    graphG.selectAll('.seasonData')
    .append('circle')
    .attr('transform', (seasonData) => "translate(" + xScale(seasonData.Neymar) + "," + ( yScale.bandwidth()/2) + ")")
    .attr('r', CIRCLE_RADIUS)
    .attr('fill', constant.NEYMAR_COLOR)
    .attr('stroke', '#000000')
    .attr('stroke-width', '3')
    .attr('class', 'neymarData')
    .on('mouseenter', console.log())
    .on('mouseleave', console.log())
    
    
    graphG.selectAll('.seasonData')
    .append('circle')
    .attr('transform', (seasonData) => "translate(" + xScale(seasonData.Ronaldo) + "," + ( yScale.bandwidth()/2) + ")")
    .attr('r', CIRCLE_RADIUS)
    .attr('fill', constant.RONALDO_COLOR)
    .attr('stroke', '#000000')
    .attr('stroke-width', '3')
    .attr('class', 'ronaldoData')
    
    graphG.selectAll('.seasonData')
    .append('circle')
    .attr('transform', (seasonData) => "translate(" + xScale(seasonData.Messi) + "," + ( yScale.bandwidth()/2) + ")")
    .attr('r', CIRCLE_RADIUS)
    .attr('fill', constant.MESSI_COLOR)
    .attr('stroke', '#000000')
    .attr('stroke-width', '3')
    .attr('class', 'messiData')

}
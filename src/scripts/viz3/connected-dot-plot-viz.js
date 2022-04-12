
import * as preproc from './preprocess.js'
import * as helper from './helper.js'

export function createConnectedDotPlot(data) { 
    const margin = { top: 40, right: 0, bottom: 80, left: 100 }
    const sizeGraph = {height: 500, width: 1000}
    let bounds
    let svgSize
    let graphSize
    
    const CIRCLE_RADIUS = 11

    let dataProcessed = preproc.preprocessData(data)
    let allSeasons = preproc.getAllSeasonSorted(data)


    let svg =  d3.select("#connected-dot-plot")
    .append("svg")
    .attr("width", sizeGraph.width)
    .attr("height", sizeGraph.height)
    

    //
    let xScale = d3.scaleLinear().domain([0.0, 0.8]).range([margin.left, sizeGraph.width])
    let xAxis = d3.axisTop().scale(xScale)

    svg.append('g')
    .attr("transform", "translate(0," + margin.top +")")
    //.attr('class', 'x axis')
    .call(xAxis)
    .style("stroke", "#000000")
    
    console.log(allSeasons)
    let yScale = d3.scaleBand().domain(allSeasons).range([margin.top, sizeGraph.height ])
    let yAxis = d3.axisLeft().scale(yScale)
    
    svg.append('g')
    .attr("transform", "translate("+ margin.left+", 0)")
    //.attr('class', 'y axis')
    .call(yAxis)
    .style("stroke", "#000000")


    let graphG = svg.append('g')
    .attr('class', 'graphConnectedDotPlot')
    
    graphG.selectAll('seasonData')
    .data(dataProcessed)
    .join('g')
    .attr('transform', (seasonData) => "translate(0, " + (yScale(seasonData.Season)) + ")")
    .attr('class', 'seasonData')

    var lineGenerator = d3.line()
    graphG.selectAll('.seasonData')
    .append("path")
    .attr('d', d =>  lineGenerator([[ xScale(helper.findMinScore(d)), yScale.bandwidth()/2], [ xScale(helper.findMaxScore(d)),yScale.bandwidth()/2 ]]))
    .attr('stroke-width', 4)
    .attr('opacity', 0.4)
    .attr('stroke', '#000000')

    graphG.selectAll('.seasonData')
    .append('circle')
    .attr('transform', (seasonData) => "translate(" + xScale(seasonData.Neymar) + "," + ( yScale.bandwidth()/2) + ")")
    .attr('r', CIRCLE_RADIUS)
    .attr('fill', '#00FF00')
    .attr('stroke', '#000000')
    .attr('stroke-width', '3')
    .attr('class', 'neymarData')
    
    graphG.selectAll('.seasonData')
    .append('circle')
    .attr('transform', (seasonData) => "translate(" + xScale(seasonData.Ronaldo) + "," + ( yScale.bandwidth()/2) + ")")
    .attr('r', CIRCLE_RADIUS)
    .attr('fill', '#FF0000')
    .attr('stroke', '#000000')
    .attr('stroke-width', '3')
    .attr('class', 'ronaldoData')
    
    graphG.selectAll('.seasonData')
    .append('circle')
    .attr('transform', (seasonData) => "translate(" + xScale(seasonData.Messi) + "," + ( yScale.bandwidth()/2) + ")")
    .attr('r', CIRCLE_RADIUS)
    .attr('fill', '#0000FF')
    .attr('stroke', '#000000')
    .attr('stroke-width', '3')
    .attr('class', 'messiData')

    function setSizing () {
        bounds = d3.select('.graph').node().getBoundingClientRect()
  
        svgSize = {
          width: bounds.width,
          height: 550
        }
  
        graphSize = {
          width: svgSize.width - margin.right - margin.left,
          height: svgSize.height - margin.bottom - margin.top
        }
  
        helper.setCanvasSize(svgSize.width, svgSize.height)
      }
}
import * as tooltip from './tooltip.js'
import * as constants from '../constants.js'


// Draw title of the stacked bar chart
export function DrawTitle(){
    d3.select('.multi-set-bar-chart .viz-title')
      .attr("width", "100%")
      .text('Perfomance de Neymar par rapport aux attentes')
}
// Set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 50},
width = 900 - margin.left - margin.right,
height = 560 - margin.top - margin.bottom;

// Draw the stacked bar chart for the visualisation number 6
export function drawStackedBarChart(updated_data, groups, subgroups) {

    // append the svg object to the body of the page
    createGraphElement()
    const mouseEnterbar = d => {
        tooltip.getBarValues(d);
    };
    const mouseLeaveBar = d => {
        tooltip.removeTooltip();
    };

    // Create X axis
    var xScale = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])

    drawXAxis(xScale)
        
    // Create Y axis
    var yScale = d3.scaleLinear()
        .domain([0, 300])
        .range([ height, 0 ]);
    drawYAxis(yScale)
    
    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range([constants.GRAY, constants.YELLOW, constants.RED]);
    
    //stack the data? --> stack per subgroup
    var stackedData = d3.stack()
        .keys(subgroups)
        (updated_data)

    // Create stacked bars
    d3.select('#graphStackedBarChart')
    .append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function(d) { return d; })
        .enter().append("rect")
            .attr("x", function(d) { return xScale(d.data.Player); })
            .attr("y", function(d) { return yScale(d[1]); })
            .attr("height", function(d) { return (yScale(d[0]) - yScale(d[1])); })
            .attr("width", xScale.bandwidth())
        .on("mouseenter", mouseEnterbar)
        .on("mouseleave", mouseLeaveBar);
}

// Function to create graph element
export function createGraphElement() { 
    d3.select("#stacked-bar-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr('id', 'graphStackedBarChart')
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
}

// Function to draw x axis
export function drawXAxis(xScale) { 
    d3.select('#graphStackedBarChart')
    .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .selectAll("text")
            .style("font-size", "medium");
}

// Function to draw y axis
export function drawYAxis(yScale) { 
    d3.select('#graphStackedBarChart').
    append("g")
    .call(d3.axisLeft(yScale))
    .selectAll("text")
    .style("font-size", "small");
}
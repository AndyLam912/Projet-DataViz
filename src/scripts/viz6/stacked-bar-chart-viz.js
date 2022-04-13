import * as tooltip from './tooltip.js'
import * as constants from '../constants.js'

export function DrawTitle(){
    // Add Title
    d3.select('.multi-set-bar-chart .viz-title')
      .attr("width", "100%")
      .text('Perfomance de Neymar par rapport aux attentes')
}

export function addBars(updated_data, groups, subgroups) {
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 900 - margin.left - margin.right,
    height = 560 - margin.top - margin.bottom;


    // append the svg object to the body of the page
    var svg = d3.select("#stacked-bar-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    const mouseEnterbar = d => {
        tooltip.getBarValues(d);
    };

    const mouseLeaveBar = d => {
        tooltip.removeTooltip();
    };


    // Add X axis
    var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .selectAll("text")
            .style("font-size", "medium");
        
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 300])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
            .style("font-size", "small");
    
    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range([constants.GRAY, constants.YELLOW, constants.RED]);
    
    //stack the data? --> stack per subgroup
    var stackedData = d3.stack()
        .keys(subgroups)
        (updated_data)

    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
            .attr("fill", function(d) { return color(d.key); })
            .selectAll("rect")
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function(d) { return d; })
            .enter().append("rect")
                .attr("x", function(d) { return x(d.data.Player); })
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return (y(d[0]) - y(d[1])); })
                .attr("width", x.bandwidth())
            .on("mouseenter", mouseEnterbar)
            .on("mouseleave", mouseLeaveBar);
}
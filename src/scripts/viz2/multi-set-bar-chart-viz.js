import * as tooltip from './tooltip.js'

export function DrawTitle(){
    // Add Title
    d3.select('.multi-set-bar-chart .viz-title')
      .attr("width", "100%")
      .text('Perfomance de Neymar par rapport aux attentes')
}

export function addBars(data, groups, subgroups) {
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 900 - margin.left - margin.right,
    height = 560 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#bar-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    const mouseEnterCategory = d => {
        console.log(d);
        d3.selectAll(".viz2-groups-axis .tick").style("cursor", "pointer");
        tooltip.getGroupText(d); 
    };

    const mouseLeaveCategory = d => {
        console.log(d);
        d3.selectAll(".viz2-groups-axis .tick").style("cursor", "default");
        tooltip.removeTooltip();
    };

    const mouseEnterbar = d => {
        var id = '#viz2-bar-' + d.value.toFixed().toString();
        d3.select(id).select('rect')
            .attr("height", ySubgroup.bandwidth() + 2)
            .attr("fill", function(d) { return hoverColor(d.key); })
            .style("cursor", "pointer"); 
        d3.select(id).select('text').style("opacity", "1.0");
    };

    const mouseLeaveBar = d => {
        var id = '#viz2-bar-' + d.value.toFixed().toString();
        d3.select(id).select('rect')
            .attr("height", ySubgroup.bandwidth() - 2)
            .attr("fill", function(d) { return color(d.key); })
            .style("cursor", "default"); 
        d3.select(id).select('text').style("opacity", "0")
    };


    // Add X axis
    var x = d3.scaleLinear()
      .domain([0, 400])
      .range([0, width])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
            .style("font-size", "small")
        
    // Add Y axis
    var y = d3.scaleBand()
        .domain(groups)
        .range([ 0, height ])
        .padding(.3);
    svg.append("g").attr('class', 'viz2-groups-axis')
        .call(d3.axisLeft(y))
        .selectAll("text")
            .style("font-size", "large")
            .style("font-weight", "500");


    d3.selectAll(".viz2-groups-axis .tick")
        .data(groups)
        .on("mouseenter", mouseEnterCategory)
        .on("mouseleave", mouseLeaveCategory);

    // Another scale for subgroup position?
    var ySubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, y.bandwidth()])
        .padding([0.05])
    
    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#70ad47','#ffc000'])

    var hoverColor = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#378805','#f79500'])
    

    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .enter()
        .append("g")
            .attr("transform", function(d) { return "translate(1, " + y(d.Group) + ")"; })
        .selectAll("g")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter()
        .append("g").attr("class", 'viz2-bar').attr("id", function(d) { return ('viz2-bar-' + d.value.toFixed().toString());})
        .append("rect").attr("x", x(0))
            .attr("y", function(d) { return ySubgroup(d.key); })
            .attr("width", function(d) { return x(d.value);})
            .attr("height", ySubgroup.bandwidth())
            .attr("fill", function(d) { return color(d.key); })
        .on("mouseenter", mouseEnterbar)
        .on("mouseleave", mouseLeaveBar);


    d3.selectAll('.viz2-bar').append('text')
        .attr("x", function(d) { return (x(d.value)*0.99);})
        .attr("y", function(d) { return (ySubgroup(d.key)+(ySubgroup.bandwidth()/2));})
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .attr("fill", "white")
        .style("opacity", "0")
        .text(function(d) { return d.value;})
}
// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 700 - margin.left - margin.right,
    height = 560 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bar-chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

export function addBars(data) {
    
    // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(1);
    console.log(subgroups);

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function(d){return(d.Group)}).keys();
    console.log(groups)

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
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
            .style("font-size", "large")
            .style("font-weight", "500");

    // Another scale for subgroup position?
    var ySubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, y.bandwidth()])
        .padding([0.05])
    
    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#70ad47','#ffc000'])
    
    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .enter()
        .append("g")
            .attr("transform", function(d) { return "translate(1, " + y(d.Group) + ")"; })
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
            .attr("x", x(0))
            .attr("y", function(d) { return ySubgroup(d.key); })
            .attr("width", function(d) { return x(d.value);})
            .attr("height", ySubgroup.bandwidth())
            .attr("fill", function(d) { return color(d.key); });
   
}
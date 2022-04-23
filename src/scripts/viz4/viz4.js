import { getRegionTooltipText, removeRegionToolTip } from './tooltip.js'
import * as legend from './legend.js'
import * as constants from '../constants.js'

/**
 * This file is used to create and illustrate the radar chart with Neymar vs Baseline
 * Inspired from this website: https://bl.ocks.org/rshaker/225c6df494811f46f6ea53eba63da817
 * and modifying it to suit our needs
 */

// set the dimensions and margins of the pie chart
const MARGIN = {top: 20, right: 30, bottom: 40, left: 90},
WIDTH = 250,
HEIGHT = 250,
RADIUS = Math.min(WIDTH, HEIGHT) / 2;

// associate every stats to a color
const STATS = {
    'Completed Pass': constants.LIGHT_RED,
    'Failed Pass': constants.LIGHT_BLUE,
    'GCA Pass': constants.LIGHT_GREEN,
    'SCA Pass': constants.LIGHT_PURPLE,
    'Remaining SCA Pass': constants.LIGHT_PINK,
    'Remaining Completed Pass': constants.LIGHT_YELLOW
};

// Function to draw title for all 3 pie chart
export function drawTitle() {
    // Add Title
    const TITLE = ['Neymar', 'Messi', 'Ronaldo']
    for (let i = 0; i < TITLE.length; i++) {
        d3
        .select('#viz-title-' + i)
        .text(TITLE[i]);
    }
}

// Function to load radio button set
export function loadRadioButton(datasets) {
    d3
    .selectAll("#radio-button input")
    .on("change", function() {
        update(datasets[(this.value == "cmp") ? 0 : (this.value == "sca") ? 1 : 2]);
        let statsToShow = []
        switch(this.value) {
            case "cmp":
                statsToShow.push("Completed Pass")
                statsToShow.push("Failed Pass")
                break;
            case "sca":
                statsToShow.push("SCA Pass")
                statsToShow.push("Remaining Completed Pass")
                break;
            case "gca":
                statsToShow.push("GCA Pass")
                statsToShow.push("Remaining SCA Pass")
                break;
        }
        legend.update(statsToShow);
    })
}

// Function to append and load initial pie chart to the page
export function initialLoad(dataset) {
    for (let i = 0; i < dataset.length; i++) {
        // append the svg object to the body of the page
        var svg = d3
        .select("#pie-chart-" + i)
        .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .append("g")
        .attr(
            "transform",
            "translate(" + WIDTH/2 + "," + HEIGHT/2 + ")"
        )

        // append g element to the newly created svg object
        svg
        .append("g")
        .attr("id", "slice-" + i);
    }

    // update pie chart with default dataset
    update(dataset);
}

// Function to compute and return transition state
function getTransitionDataSet(oldDataSet, newDataSet) {
    var newData = d3.set();

    newDataSet.forEach(function(d) { newData.add(d.label); });

    var oldData = oldDataSet
    .filter(function(d) { return !newData.has(d.label); })
    .map(function(d) { return {label: d.label, value: 0}; });

    var transitionDataSet = d3.merge([ newDataSet, oldData ])
    .sort(function(a, b) {
        return d3.ascending(a.label, b.label);
    });

    return transitionDataSet;
}

// Function to create new pie chart shell for newDataSet and transition the old one
export function update(newDataSet) {
    for (let i = 0; i < newDataSet.length; i++) {
        // CONST variables
        const DURATION = 1000;
        const TOTAL = newDataSet[i][0].value + newDataSet[i][1].value;

        // local function instanciation
        var key = function(d) { return d.data.label; };

        // create pie chart shell
        var pie = d3
        .pie()
        .sort(null)
        .value(function(d) {
            return d.value;
        });

        // set arc inner and outer radius
        var arc = d3
        .arc()
        .outerRadius(RADIUS * 1.0)
        .innerRadius(RADIUS * 0.0);
        
        // get current(old) pie chart dataset
        var oldDataSet = d3
        .select("#slice-" + i)
        .selectAll("path")
        .data()
        .map(function(d) { return d.data });

        if (oldDataSet.length == 0) oldDataSet = newDataSet[i];

        // get transition datasets
        var firstTransitionDataSet = getTransitionDataSet(newDataSet[i], oldDataSet);
        var SecondTransitionDataSet = getTransitionDataSet(oldDataSet, newDataSet[i]);

        // first state transition without duration
        var slice = d3
        .select("#slice-" + i)
        .selectAll("path")
        .data(pie(firstTransitionDataSet), key);

        slice
        .enter()
        .insert("path")
        .attr("id", "slice-" + i)
        .style("fill", function(d) { return STATS[d.data.label]; })
        .each(function(d) {
            this._current = d;
        });

        // second state transition with duration
        slice = d3
        .select("#slice-" + i)
        .selectAll("path")
        .data(pie(SecondTransitionDataSet), key);

        slice
        .transition()
        .duration(DURATION)
        .attrTween("d", function(d) {
            var interpolate = d3.interpolate(this._current, d);
            var _this = this;
            return function(t) {
                _this._current = interpolate(t);
                return arc(_this._current);
            };
        });

        // set tooltip for each slice region
        slice = d3
        .select("#slice-" + i)
        .selectAll("path")
        .data(pie(newDataSet[i]), key)
        .style("cursor", "pointer")
        .on("mouseover", function(d) {
            getRegionTooltipText(d.data.value + " (" + parseFloat(d.data.value/TOTAL * 100).toFixed(2) + "%)");
        })  
        .on("mouseout", function(d) {
            removeRegionToolTip();
        });
    }
}
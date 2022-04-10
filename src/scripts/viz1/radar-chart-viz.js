import * as tooltip from './tooltip.js'


const NUM_OF_SIDES = 6;
const NUM_OF_LEVEL = 5,

    size = Math.min(window.innerWidth, window.innerHeight, 600),
    offset = Math.PI,
    polyangle = (Math.PI * 2) / NUM_OF_SIDES,
    r = 0.8 * size,
    r_0 = r / 2,
    center =
    {
        x: size / 2,
        y: size / 2
    };

const wrapper = d3.select(".radar-chart .chart")
    .append("svg")
    .attr("width", size)
    .attr("height", size);

const g = d3.select(".radar-chart .chart svg").append("g");

const scale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, r_0])
    .nice();



const labels_text = 
["Pourcentage de passes complétées (Cmp%)", 
"Pourcentage de bons tirs effectués sur le but adverse (SoT%)", 
"Pourcentage des dribbles réussis sur une adversaire (Succ%)", 
"Pourcentage de fois où l'équipe a pris possession du ballon suivant l'application de la pression par le joueur sur un adversaire en possession du ballon (%)", 
"Pourcentage de défense réussi contre un dribbleur adverse (Tkl%)", 
"Pourcentage du nombre total de minutes de l'équipe pendant lesquelles le joueur était sur le terrain"]



const labels_tooltip = []



export function generatePoint({ length, angle }) {
    const point =
    {
        x: center.x + (length * Math.sin(offset - angle)),
        y: center.y + (length * Math.cos(offset - angle))
    };
    return point;
};


export function drawPath(points, parent) {
    const lineGenerator = d3.line()
        .x(d => d.x)
        .y(d => d.y);

    parent.append("path")
        .attr("d", lineGenerator(points));
};


export function genTicks() {
    const ticks = [];
    const step = 100 / NUM_OF_LEVEL;
    for (let i = 0; i <= NUM_OF_LEVEL; i++) {
        const num = step * i;
        if (Number.isInteger(step)) {
            ticks.push(num);
        }
        else {
            ticks.push(num.toFixed(2));
        }


    }
    return ticks;
}


export function generateAndDrawLevels() {

    for (let level = 1; level <= NUM_OF_LEVEL; level++) {
        const hyp = (level / NUM_OF_LEVEL) * r_0;

        const points = [];
        for (let vertex = 0; vertex < NUM_OF_SIDES; vertex++) {
            const theta = vertex * polyangle;

            points.push(generatePoint({ length: hyp, angle: theta }));

        }
        const group = g.append("g").attr("class", "levels");
        drawPath([...points, points[0]], group);
    }
};


export function generateAndDrawLines() {

    const group = g.append("g").attr("class", "grid-lines");
    for (let vertex = 1; vertex <= NUM_OF_SIDES; vertex++) {
        const theta = vertex * polyangle;
        const point = generatePoint({ length: r_0, angle: theta });

        drawPath([center, point], group);
    }

};


export function drawAxis(ticks) {

    const groupL = g.append("g").attr("class", "tick-lines");
    const point = generatePoint({ length: r_0, angle: 0 });
    drawPath([center, point], groupL);

    const groupT = g.append("g").attr("class", "ticks");

    ticks.forEach((d, i) => {
        const r = (i / NUM_OF_LEVEL) * r_0;
        const p = generatePoint({ length: r, angle: 0 });
        const points =
            [
                p,
                {
                    ...p,
                    x: p.x - 10
                }

            ];
        drawPath(points, groupL);
        drawText(d, p, true, groupT);


    });
};


export function drawText(text, point, isAxis, group) {
    const mouseEnter = d => {
        tooltip.getLabelsText(d);
    };

    const mouseLeave = d => {
        tooltip.removeTooltip();
    };

    if (isAxis) {
        const xSpacing = text.toString().includes(".") ? 30 : 22;
        group.append("text")
            .attr("x", point.x - xSpacing)
            .attr("y", point.y + 5)
            .html(text)
            .style("text-anchor", "middle")
            .attr("fill", "darkgrey")
            .style("font-size", "12px")
            .style("font-family", "sans-serif")
    }
    else {
        group.selectAll("text")
            .data(labels_tooltip)
            .enter()
            .append("text")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .html(d => d.label)
            .style("text-anchor", "middle")
            .attr("fill", "darkgrey")
            .style("font-size", "12px")
            .style("font-family", "sans-serif")
            .on("mouseenter", mouseEnter)
            .on("mouseleave", mouseLeave);
    }

};


export function drawCircles(points, n) {
    const mouseEnter = d => {
        tooltip.getTipValue(d);
    };

    const mouseLeave = d => {
        tooltip.removeTooltip();
    };

    if (n === 0) {
        g.append("g")
            .attr("class", "indicebaseline")
            .selectAll("circle")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 3)
            .on("mouseenter", mouseEnter)
            .on("mouseleave", mouseLeave);
    } else {
        g.append("g")
            .attr("class", "indiceNeymar")
            .selectAll("circle")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 3)
            .on("mouseenter", mouseEnter)
            .on("mouseleave", mouseLeave);
    }
};


export function drawData(dataset, dataset2) {
    const mouseEnterBaseline = d => {
        d3.select(".shapeBaseline path").style("opacity", 0.90);
    };

    const mouseLeaveBaseline = d => {
        d3.select(".shapeBaseline path").style("opacity", 0.5)
    };

    const mouseEnterNeymar = d => {
        d3.select(".shapeNeymar path").style("opacity", 0.90);
    };

    const mouseLeaveNeymar = d => {
        d3.select(".shapeNeymar path").style("opacity", 0.5)
    };

    const points = [];
    dataset.forEach((d, i) => {
        const len = scale(d.value);
        const theta = i * (2 * Math.PI / NUM_OF_SIDES);

        points.push(
            {
                ...generatePoint({ length: len, angle: theta }),
                value: d.value,
                color: 'orange'
            });
    });
    const group = g.append("g").attr("class", "shapeBaseline").on("mouseenter", mouseEnterBaseline).on("mouseleave", mouseLeaveBaseline);
    drawPath([...points, points[0]], group);

    var points1 = [];
    dataset2.forEach((d, i) => {
        const len = scale(d.value);
        const theta = i * (2 * Math.PI / NUM_OF_SIDES);

        points1.push(
            {
                ...generatePoint({ length: len, angle: theta }),
                value: d.value,
                color: 'cyan'
            });
    });
    var group1 = g.append("g").attr("class", "shapeNeymar").on("mouseenter", mouseEnterNeymar).on("mouseleave", mouseLeaveNeymar);;
    drawPath([...points1, points1[0]], group1);

    drawCircles(points, 0);
    drawCircles(points1, 1);
};


export function drawLabels(dataset) {
    const groupL = g.append("g").attr("class", "labels");
    for (let vertex = 0; vertex < NUM_OF_SIDES; vertex++) {

        var angle = vertex * polyangle;
        var label = dataset[vertex].name;
        var point = generatePoint({ length: 0.9 * (size / 2), angle });
        labels_tooltip.push({ x: point.x, y: point.y, label: label, tooltip: labels_text[vertex] })
    }
    drawText(label, point, false, groupL);
};
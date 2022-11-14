/* Ring chart totals by gender */

d3.json("a3cleanedonly2015.json").then(data => {
    // Always start by console.logging the data
    console.log(data);

    // Create a new object to transform data
    let newData = [
        { "Gender": "Male", "Totals": 0 },
        { "Gender": "Female", "Totals": 0 },
        { "Gender": "Other", "Totals": 0 },
    ]

    for (let d of data) {
        if (d.Gender === "Male") {
            newData[0].Totals += 1; // newData[0] is Male (line 6)
        } else if (d.Gender === "Female") {
            newData[1].Totals += 1; // newData[1] is Female (line 10)
        } else {
            newData[2].Totals += 1; // newData[2] is Other (line 14)
        }
    };

    console.log(newData); // view transformed data

    const height = 500,
    width = 600,
    innerRadius = 125,
    outerRadius = 175,
    labelRadius = 200;

    const arcs = d3.pie().value(d => d.Totals)(newData);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const svg = d3.select("#chart2")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("stroke-linejoin", "round")
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr("fill", (d, i) => d3.schemeCategory10[i])
        .attr("d", arc);

    svg.append("g")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .selectAll("tspan")
        .data(d => {
            return [d.data.Gender, d.data.Totals];
          })
        .join("tspan")
        .attr("x", 0)
        .attr("y", (newData, i) => `${i * 1.1}em`)
        .attr("font-weight", (newData, i) => i ? null : "bold")
        .text(newData => newData);

    svg.append("text")
        .attr("font-size", 30)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text("2015")
        .style("font-size", 20);
});
/* D3 Bar Chart */
d3.json("a3cleanedonly2015.json").then(data => {
    // Always start by console.logging the data
    // console.log(data);
    
    
  
    let calculatedResult = new Object()
    data.forEach((d) => {
      calculatedResult[d.State] = calculatedResult[d.State]
        ? ++calculatedResult[d.State]
      : 1
    })
    console.log(calculatedResult)

    var freq = []

    for (const property in calculatedResult) {
        var obj = {state: property, count: calculatedResult[property]}
        freq.push(obj)
    }
  
    console.log(freq)

    const height = 400,
        width = 600,
        margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#chart3")
                .append("svg")
                .attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleBand()
                .domain(freq.map(d => d.state))
                .range([margin.left, width - margin.right])
                .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(freq, d => d.count)]).nice()
                .range([height - margin.bottom, margin.top]);

    const xAxis = (g) => g
        .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x))
        .attr("font-size", 6);

    const yAxis = (g) => g
        .attr("transform", `translate(${margin.left - 5}, 0)`)
        .call(d3.axisLeft(y))
        .attr("font-size", 6);

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    let bar = svg.selectAll(".bar")
        .append("g")
        .data(freq)
        .join("g")
        .attr("class", "bar");

    bar.append("rect")
    .attr("fill", "steelblue")
    .attr("x", d => x(d.state))
    .attr("width", x.bandwidth())
    .attr("y", d => y(d.count))
    .attr("height", d => y(0) - y(d.count));

    bar.append('text')
        .text(d => d.count)
        .attr('x', d => x(d.state) + (x.bandwidth()/2))
        .attr('y', d => y(d.count) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', '#black')
        .attr('font-size', 6);

});
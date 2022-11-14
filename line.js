/* D3 Line Chart */
d3.json("a3cleanedonly2015.json").then(data => {
  // Always start by console.logging the data
  // console.log(data);
  
  

  let calculatedResult = new Object()
  data.forEach((d) => {
    calculatedResult[d.Date] = calculatedResult[d.Date]
      ? ++calculatedResult[d.Date]
    : 1
  })
  // console.log(calculatedResult)

  var freq = []

  for (const property in calculatedResult) {
    var obj = {date: property, count: calculatedResult[property]}
    freq.push(obj)
  }
  
  // console.log(freq)

  let timeParse = d3.timeParse("%m/%d/%Y"); // parse time to JS format so code can read it

  freq.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });


  // console.log(freq)

  var dates = [];
  for (let obj of freq) {
  dates.push(timeParse(obj.date));
}

  for (let d of freq) {
        d.date = timeParse(d.date); // using timeParse function we created above
    }

  // console.log(d3.max(freq, d => d.count))

  const height = 600,
        width = 800,
        margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

  const svg = d3.select("#chart1")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  let x = d3.scaleTime()
      .domain(d3.extent(dates)) // returns an array
      .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
      .domain([0,d3.max(freq, d => d.count)]).nice() // nice to round up axis tick
      .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis") // adding a class to y-axis for scoping
    .call(d3.axisLeft(y)
      .tickSizeOuter(0)
      .tickSize(-width + margin.right + margin.left) // modified to meet at end of axis
    );

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  svg.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", width - margin.right)
    .attr("y", height)
    .attr("dx", "0.5em")
    .attr("dy", "-0.5em") 
    .text("Month")
    .attr("font-size", 12);

  svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "end")
    .attr("x", -margin.top/2)
    .attr("dx", "-0.5em")
    .attr("y", 10)
    .attr("transform", "rotate(-90)")
    .text("Count")
    .attr("font-size", 12);

  let line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.count))
      .curve(d3.curveNatural); // more: https://observablehq.com/@d3/d3-line#cell-244


  svg.append("path")
    .datum(freq)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "steelblue");

});




// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left},${margin.top})`);

// get the data
d3.csv("t.csv").then( function(data) {

  // X axis: scale and draw:
  const x = d3.scaleLinear()
      .domain([0, 10])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
      

  // Y axis: initialization
  const y = d3.scaleLinear()
      .range([height, 0]);
  const yAxis = svg.append("g")

  
  svg.selectAll(".text")  		
  .data(data)
  .enter()
  .append("text")
  .attr("class","label")
  .attr("x", (function(d) { return x(d.date); }  ))
  .attr("y", function(d) { return y(d.value) - 20; })
  .attr("dy", ".75em")
  .text(function(d) { return d.value; }); 
     
  // A function that builds the graph for a specific value of bin
  function update(nBin) {

    // set the parameters for the histogram
    const histogram = d3.histogram()
        .value(function(d) { return d.Ag; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(nBin)); // then the numbers of bins

    // And apply this function to data to get the bins
    const bins = histogram(data);

    // Y axis: update now that we know the domain
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));

    // Join the rect with the bins data
    const u = svg.selectAll("rect")
        .data(bins)

    // Manage the existing bars and eventually the new ones:
    u
        .join("rect") // Add a new rect for each new elements
        .transition() // and apply changes to all of them
        .duration(1000)
          .attr("x", 1)
          .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill", "#B87333")

    }


  // Initialize with 20 bins
  update(20)


  // Listen to the button -> update if user change it
  d3.select("#nBin").on("input", function() {
    update(+this.value);
  });
});






const svg2 = d3.select("#my_dataviz2")
  .append("svg2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left},${margin.top})`);

// get the data
d3.csv("t.csv").then( function(data) {

  // X axis: scale and draw:
  const x1 = d3.scaleLinear()
      .domain([0, 10])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg2.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x1));
      

  // Y axis: initialization
  const y1 = d3.scaleLinear()
      .range([height, 0]);
  const yAxis = svg2.append("g")

  
  svg2.selectAll(".text")  		
  .data(data)
  .enter()
  .append("text")
  .attr("class","label")
  .attr("x", (function(d) { return x1(d.date); }  ))
  .attr("y", function(d) { return y1(d.value) - 20; })
  .attr("dy", ".75em")
  .text(function(d) { return d.value; }); 
     
  // A function that builds the graph for a specific value of bin
  function update(nBin) {

    // set the parameters for the histogram
    const histogram = d3.histogram()
        .value(function(d) { return d.Ag; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(nBin)); // then the numbers of bins

    // And apply this function to data to get the bins
    const bins = histogram(data);

    // Y axis: update now that we know the domain
    y1.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y1));

    // Join the rect with the bins data
    const u = svg2.selectAll("rect")
        .data(bins)

    // Manage the existing bars and eventually the new ones:
    u
        .join("rect") // Add a new rect for each new elements
        .transition() // and apply changes to all of them
        .duration(1000)
          .attr("x", 1)
          .attr("transform", function(d) { return `translate(${x1(d.x0)}, ${y(d.length)})`})
          .attr("width", function(d) { return x1(d.x1) - x1(d.x0) -1 ; })
          .attr("height", function(d) { return height - y1(d.length); })
          .style("fill", "#B87333")

    }


  // Initialize with 20 bins
  update(20)


  // Listen to the button -> update if user change it
  d3.select("#nBin").on("input", function() {
    update(+this.value);
  });
});

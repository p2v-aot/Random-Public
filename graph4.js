
var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 2024 - margin.left - margin.right,
  height = 1024 - margin.top - margin.bottom;

var svg = d3.select('#my_dataviz')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .call(responsivefy)
    .append("g")
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

//Read the data
d3.csv("Results-Vol-P-Neg.csv",function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([d3.extent(data, function(d) { return d.StrikePrice; })])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([d3.extent(data, function(d) { return d.Volume; })])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.StrikePrice); } )
      .attr("cy", function (d) { return y(d.Volume); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2")

})

function responsivefy(svg) {
    const container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width'), 10),
        height = parseInt(svg.style('height'), 10),
        aspect = width / height;

    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize);

    d3.select(window).on(
        'resize.' + container.attr('id'), 
        resize
    );

    function resize() {
        const w = parseInt(container.style('width'));
        svg.attr('width', w);
        svg.attr('height', Math.round(w / aspect));
    }
  }
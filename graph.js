
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 2024 - margin.left - margin.right,
        height = 1024 - margin.top - margin.bottom;

    // append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("Results-OI.csv",

    function(d){
        return { TradingDate : d3.timeParse("%Y-%m-%d")(d.TradingDate), StrikePrice : d.StrikePrice, CallPut : d.CallPut, Quantity: d.Quantity }
    },

    function(data) {

    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.StrikePrice; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    var y0 = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.Quantity}))
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y0))
      .text("Strike Price");

    var color = d3.scaleOrdinal()
      .domain(["C","P"])
      .range([ "#ff2812", "#afc065"])

    // Add the tooltip container to the vis container
    // it's invisible and its position/contents are defined during mouseover
    var tooltip = d3.select("#my_dataviz").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // tooltip mouseover event handler
    var tipMouseover = function(d) {
      var html  = d.TradingDate + "<br/>" +
      "<span>" + d.CallPut + "</span><br/>" +
      "<b>" + d.StrikePrice + "</b> sugar, <b/>" + d.Quantity + "</b> calories";

    tooltip.html(html)
      .style("left", (d3.event.pageX + 15) + "px")
      .style("top", (d3.event.pageY - 28) + "px")
      .transition()
      .duration(200)
      .style("opacity", .9)

    };
    
    // tooltip mouseout event handler
    var tipMouseout = function(d) {
      tooltip.transition()
      .duration(300) // ms
      .style("opacity", 0); // don't care about position!
    };

    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(d.StrikePrice); } )
        .attr("cy", function (d) { return y0(d.Quantity); } )
        .attr("r", 5)
        .style("fill", function (d) { return color(d.CallPut) } )
        .on("mouseover", tipMouseover)
        .on("mouseout", tipMouseout);
});

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

    var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.StrikePrice; }))
        .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.Quantity}))
        .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y))
            .text("Strike Price");

    var color = d3.scaleOrdinal()
        .domain(["C","P"])
        .range([ "#ff3333", "#66ff33"])

    var tooltip = d3.select("#my_dataviz").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var tipMouseover = function(d) {
        var html  = d.TradingDate + "<br/>" +
        "<span>" + d.CallPut + "</span><br/>" +
        "<b>" + d.StrikePrice + "</b> Strike, <b/>" + d.Quantity;

        tooltip.html(html)
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
            .transition()
            .duration(200)
            .style("opacity", .9)
    };

    var tipMouseout = function(d) {
        tooltip.transition()
        .duration(300) // ms
        .style("opacity", 0);
    };

    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.StrikePrice); } )
            .attr("cy", function (d) { return y(d.Quantity); } )
            .attr("r", 5)
            .style("fill", function (d) { return color(d.CallPut) } )
            .on("mouseover", tipMouseover)
            .on("mouseout", tipMouseout);
});
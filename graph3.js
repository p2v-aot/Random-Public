
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
    d3.csv("Results-Vol.csv",

    function(d){
        return { TradingDate : d3.timeParse("%Y-%m-%d")(d.TradingDate), StrikePrice : d.StrikePrice, CallPut : d.CallPut, Volume: d.Volume, AVGPrice : d.AVGPrice }
    },

    function(data) {

    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.TradingDate; }))
        .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

    var y0 = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.AVGPrice}))
        .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y0));

    var y1 = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.Volume}))
        .range([ height, 0 ]);
        svg.append("g")
            .attr("transform", "translate(0," + width + ")")
            .call(d3.axisRight(y1));

    var color = d3.scaleOrdinal()
        .domain(["C","P"])
        .range([ "#ff3333", "#66ff33"])

    var tooltip = d3.select("#my_dataviz").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var tipMouseover = function(d) {
        var html  = d.TradingDate + "<br/>" +
        "<span>" + d.CallPut + "</span><br/>" +
        "<b>" + d.StrikePrice + "</b> Strike, <b>" + d.AVGPrice + "</b>";

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
            .attr("cx", function (d) { return x(d.TradingDate); } )
            .attr("cy", function (d) { return y0(d.AVGPrice); } )
            .attr("r", 5)
            .style("fill", function (d) { return color(d.CallPut) } )
            .on("mouseover", tipMouseover)
            .on("mouseout", tipMouseout);

    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
            .attr("x", function(d) { return x(d.TradingDate); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y1(d.Volume); })
            .attr("height", function(d) { return height - y(d.Volume); })
            .style("fill", function (d) { return color(d.CallPut) } );

});
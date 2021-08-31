
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 70, bottom: 70, left: 100},
        width = 2048 - margin.left - margin.right,
        height = 1024 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 300 300")
        .classed("svg-content", true);

    //Read the data
    d3.csv("Results-Vol-P-Neg.csv",

    function(d){
        return { TradingDate : d3.timeParse("%Y-%m-%d")(d.TradingDate), StrikePrice : d.StrikePrice, Volume: d.Volume }
    },

    function(data) {

    var strike = d3.nest()
        .key(function(d) { return d.TradingDate})
        .entries(data);

    var x = d3.scaleBand()
        .domain(data.map(function(d) { return d.StrikePrice; }))
        .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.Volume}))
        .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

    var res = strike.map(function(d){ return d.key})

    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("height", function(d) { return height - y(d.Volume); })
            .attr("fill", function(d){ return color(d.key) })
            .attr("x", function(d) { return x(d.StrikePrice); })
            .attr("y", function(d) { return y(d.Volume); })
});
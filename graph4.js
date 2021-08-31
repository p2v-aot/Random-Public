
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 70, bottom: 70, left: 100},
        width = 2048 - margin.left - margin.right,
        height = 1024 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 300 300")
        .classed("svg-content", true)
        .append("g");

    //Read the data
    d3.csv("Results-Vol-P-Neg.csv",

    function(d){
        return { TradingDate : d3.timeParse("%Y-%m-%d")(d.TradingDate), StrikePrice : d.StrikePrice, Volume: d.Volume }
    },

    function(data) {

    var x = d3.scaleBand()
        .domain(d3.extent(data, function(d) { return d.StrikePrice; }));
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)]);
        svg.append("g")
            .call(d3.axisLeft(y));

    svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return x(d.StrikePrice); })
            .attr("cy", function(d) { return y(d.Volume); })
            .attr("r", 5);
});
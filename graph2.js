
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

    var strike = d3.nest()
        .key(function(d) { return d.StrikePrice})
        .entries(data);

    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.TradingDate; }))
        .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.Quantity}))
        .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

    var res = strike.map(function(d){ return d.key})

    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

    svg.selectAll(".line")
        .data(strike)
        .enter()
        .append("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return color(d.key) })
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
              return d3.line()
                .x(function(d) { return x(d.Timestamp); })
                .y(function(d) { return y(+d.Quantity); })
                (d.values)
            })
});
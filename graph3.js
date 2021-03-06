
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 70, bottom: 70, left: 100},
        width = 2048 - margin.left - margin.right,
        height = 1024 - margin.top - margin.bottom;

    // append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("Results-AVGPrice.csv",

    function(d){
        return { TradingDate : d3.timeParse("%Y-%m-%d")(d.TradingDate), StrikePrice : d.StrikePrice, CallPut : d.CallPut, Volume: d.Volume, AVGPriceDiff: d.AVGPriceDiff }
    },

    function(data) {

    var strike = d3.nest()
        .key(function(d) { return d.StrikePrice})
        .entries(data);

    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.TradingDate; }))
        .range([ 0, width ])
        .nice();
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([-100, 100])
        .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

    // gridlines in x axis function
    function make_x_gridlines() {		
        return d3.axisBottom(x)
            .ticks(5)
    }

    // gridlines in y axis function
    function make_y_gridlines() {		
        return d3.axisLeft(y)
            .ticks(5)
    }

    var res = strike.map(function(d){ return d.key})

    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

    // add the X gridlines
    svg.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        )

    // add the Y gridlines
    svg.append("g")			
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        )

    svg.selectAll(".line")
        .data(strike)
        .enter()
        .append("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return color(d.key) })
            .attr("stroke-width", 2)
            .attr("d", function(d){
              return d3.line()
                .x(function(d) { return x(d.TradingDate); })
                .y(function(d) { return y(+d.AVGPriceDiff); })
                (d.values)
            })
});
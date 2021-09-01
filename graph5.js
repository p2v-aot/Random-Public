
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 2024 - margin.left - margin.right,
    height = 1024 - margin.top - margin.bottom;

    var svg = d3.select('#my_dataviz')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .call(responsivefy)
        .append("g")
        .attr('transform', "translate(" + margin.left + ", " + margin.top + ")");

    //Read the data
    d3.json("Results-Vol.json",

    function(d){
        return { TradingDate : d3.timeParse("%Y-%m-%d")(d.TradingDate), StrikePrice : d.StrikePrice, Volume : d.Volume }
    },

    function(data) {
        console.log(d3.extent(data, function(d) { return d.TradingDate; }))
    });
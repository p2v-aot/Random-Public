var dataTable = dc.dataTable("table#list");
var dispatch = d3.dispatch('load','filterDate','filterHeight');

d3.json('Results-Vol.json',function(json){
    dispatch.load(json)
});

dispatch.on('load',function(json) {
    var formatNumber = d3.format( ",d"); //What is this for?
    var facts = crossfilter(json);
    var tradingDate = facts.dimension(function(d) {
        return +d.TradingDate;
    });
    var accessorDate = function(d) {
        return d.TradingDate;
    };
//			xf.add(json);
    var range = d3.extent(json, accessorDate);
    var all = facts.groupAll();

    d3.select("div#slider")
        .call(d3.slider().axis(true).min(range[0]).max(range[1]).value(range)
        .on("slide", function(evt,value) {
            dispatch.filterDate(value);
            d3.select("#slidertextmin").text(Math.floor(value[0]));
            d3.select("#slidertextmax").text(Math.floor(value[1]))
        }))

    FieldNames = [
        "",
        "TradingDate",
        "StrikePrice",
        "Volume"
    ];

    d3.select("tr#FieldNames").selectAll("th")
        .data(FieldNames)
        .enter()
        .append("th") 
        .append("text")
        .text(function(d){ 
            return d;
        });

    dataTable
        .dimension(tradingDate)
        .columns([
            function(d) {return "";},
            function(d) {return d.TradingDate;},
            function(d) {return d.StrikePrice;},
            function(d) {return d.Volume;}
        ]);   

    dispatch.on('filterDate',function(value){
        dataTable.replaceFilter(dc.filters.RangedFilter(value[0], value[1]));
        dataTable.redrawGroup();
    })

    dc.dataCount(".dc-data-count")
        .dimension(facts)
        .group(all);

    dc.renderAll();

});
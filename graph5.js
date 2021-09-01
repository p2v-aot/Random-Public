
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
        d3.selectAll("p")
            .data(data)
            .enter()
            .append("p")
            .text(function(d) {
                return d.TradingDate + ", " + d.Volume;
            })
    });

    
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
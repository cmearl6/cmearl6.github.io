
function streamgraph() {
// Trying a streamgraph in JavaScript source code
d3.csv("dataset/stream_salary.csv").then(function (dataset) {

    svgstream.selectAll("*").remove();

    console.log(dataset)
    var teams = ["ATL", "BOS", "CLE", "NOP", "CHI", "DAL", "DEN", "GSW", "HOU", "LAC", "LAL", "MIA", "MIL", "MIN", "BKN", "NYK", "ORL", "IND", "PHI", "PHX", "POR", "SAC", "SAS", "OKC", "TOR", "UTA", "MEM", "WAS", "DET", "CHA"]
    var team_colors = ["#C8102E", "#007A33", "#860038", "#0C2340", "#CE1141", "#00538C", "#0E2240", "#FFC72C", "#FFFFFF", "#1D428A", "#552583", "#98002E", "#00471B", "#0C2340", "#000000", "#F58426", "#C4CED4", "#FDBB30", "#006BB6", "#1D1160", "#000000", "#63727A", "#C4CED4", "#EF3B24", "#CE1141", "#002B5C", "#5D76A9", "#002B5C", "#C8102E", "#00788C"]
    var team_colors2 = ["#FFCD00", "#BA9653", "#041E42", "#C8102E", "#000000", "#002B5E", "#FEC524", "#1D428A", "#CE1141", "#C8102E", "#FDB927", "#F9A01B", "#EEE1C6", "#236192", "#FFFFFF", "#006BB6", "#0077C0", "#002D62", "#ED174C", "#E56020", "#E03A3E", "#5A2D81", "#000000", "#007AC1", "#000000", "#00471B", "#12173F", "#E31837", "#1D42BA", "#1D1160"]

    var season = "Season Start";

    //var years = Array.from(d3.group(dataset, d => d[season]));

    var xAccessor = d => +d.Year
    var years = [... new Set(dataset.map(xAccessor))]

    var xScale = d3.scaleLinear()
        .domain(d3.extent(years))
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

    var yScale = d3.scaleLinear()
        .domain([0, 4])
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

    var colorScale1 = d3.scaleOrdinal()
        .domain(teams)
        .range(team_colors)
    var colorScale2 = d3.scaleOrdinal()
        .domain(teams)
        .range(team_colors2)

    var streamGraph = d3.stack()
        .offset(d3.stackOffsetNone)
        .keys(teams)
        (dataset)


    var sizes = d3.area()
        .x(d => xScale(+d.data.Year))
        .y0(d => yScale(d[0]/1000000000))
        .y1(d => yScale(d[1]/1000000000))

    console.log(streamGraph[0][0][1]/1000)

    var graph = svgstream.selectAll("path")
        .data(streamGraph)
        .enter()
        .append("path")
        .attr("d", sizes)
        .style("fill", d => colorScale1(d.key))
        .on('click', function (e, d) {
            
        })


    var xAxisgen = d3.axisBottom().scale(xScale)
    var yAxisgen = d3.axisLeft().scale(yScale) 

    var xAxis = svgstream.append("g")
        .call(d3.axisBottom(xScale)
            .tickValues(years.filter(function (d, i) { return !(i % 2) }))
            .tickFormat(d3.format("d")))
        .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")

    console.log(xScale.domain())
    console.log(yScale.domain())

    svgstream.append("text")
        .attr("x", (dimensions.width - dimensions.margin.right) / 2)
        .attr("y", dimensions.height - dimensions.margin.bottom*0.25)
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Year")

    var yAxis = svgstream.append("g")
        .call(yAxisgen)
        .style("transform", `translateX(${dimensions.margin.left}px)`)

    svgstream.append("text")
        .attr("transform", "translate("+ (dimensions.margin.left/3)+"," + (dimensions.height / 2) + ")rotate(-90)")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Salary");

    var title = svgstream
        .append('text')
        .attr("id", 'playersalarytext')
        .attr("x", 200)
        .attr("y", 20)
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("font-family", "sans-serif")
        .text("Salary by Team (billions)");
})

}


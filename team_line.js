// Team Line chart that can drill down to player JavaScript source code


d3.csv("dataset/stream_salary.csv").then(function (dataset) {


    var dimensions = {
        width: 600,
        height: 500,
        margin: {
            top: 30,
            bottom: 100,
            right: 50,
            left: 150
        }
    }

    var svg_line = d3.select("#teamLine")
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .style("background-color", "#9ec0ff")
        .style("border", "2px solid #c9082a");

    var teams = ["ATL", "BOS", "CLE", "NOP", "CHI", "DAL", "DEN", "GSW", "HOU", "LAC", "LAL", "MIA", "MIL", "MIN", "BKN", "NYK", "ORL", "IND", "PHI", "PHX", "POR", "SAC", "SAS", "OKC", "TOR", "UTA", "MEM", "WAS", "DET", "CHA"]
    var team_colors = ["#C8102E", "#007A33", "#860038", "#0C2340", "#CE1141", "#00538C", "#0E2240", "#FFC72C", "#FFFFFF", "#1D428A", "#552583", "#98002E", "#00471B", "#0C2340", "#000000", "#F58426", "#C4CED4", "#FDBB30", "#006BB6", "#1D1160", "#000000", "#63727A", "#C4CED4", "#EF3B24", "#CE1141", "#002B5C", "#5D76A9", "#002B5C", "#C8102E", "#00788C"]
    var team_colors2 = ["#FFCD00", "#BA9653", "#041E42", "#C8102E", "#000000", "#002B5E", "#FEC524", "#1D428A", "#CE1141", "#C8102E", "#FDB927", "#F9A01B", "#EEE1C6", "#236192", "#FFFFFF", "#006BB6", "#0077C0", "#002D62", "#ED174C", "#E56020", "#E03A3E", "#5A2D81", "#000000", "#007AC1", "#000000", "#00471B", "#12173F", "#E31837", "#1D42BA", "#1D1160"]

    //var sumstat = d3.group(dataset,d => d.Team)


    // Reformat the data: we need an array of arrays of {x, y} tuples
    var sumstat = teams.map(function (teamName) { // .map allows to do something for each element of the list
        return {
            team: teamName,
            values: dataset.map(function (d) {
                return { year: +d.Year, value: +d[teamName] };
            })
        };
    });

    console.log(sumstat)


    var xAccessor = d=> +d.Year

    var years = [... new Set(dataset.map(xAccessor))]


    var xScale = d3.scaleBand()
        .domain(years)
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right]);

    var yScale = d3.scaleLinear()
        .domain([0, 150000000])
        .range([dimensions.height - dimensions.margin.bottom, 30])


    var colorScale1 = d3.scaleOrdinal()
        .domain(teams)
        .range(team_colors)

    var colorScale2 = d3.scaleOrdinal()
        .domain(teams)
        .range(team_colors2)

    svg_line.selectAll("line")
        .data(sumstat)
        .enter()
        .append('g')
        .style("stroke", function (d) { return colorScale1(d.team) })
        // Second we need to enter in the 'values' part of this group
        .selectAll("line")
        .data(function (d) { return d.values })
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(xScale(d => d.year))
            .y(yScale(d => d.value))
        )

    svg_line
        // First we need to enter in a group
        .selectAll("myDots")
        .data(sumstat)
        .enter()
        .append('g')
        .style("fill", function (d) { return colorScale1(d.team) })
        // Second we need to enter in the 'values' part of this group
        .selectAll("myPoints")
        .data(function (d) { return d.values })
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.year) })
        .attr("cy", function (d) { return yScale(d.value) })
        .attr("r", 5)



    svg_line.append('g')
        .call(d3.axisLeft(yScale))
        .style("transform", `translateX(${dimensions.margin.left}px)`)

    // create x axis with a tick every 5 years and 65 degree rotation
    svg_line.append('g')
        .call(d3.axisBottom(xScale)
            .tickValues(xScale.domain().filter(function (d, i) { return !(i % 2) })))
        .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")

    svg_line.append("text")
        .attr("x", (dimensions.width - dimensions.margin.right) / 2)
        .attr("y", dimensions.height - 10)
        .style("text-anchor", "middle")
        .style("margin-top", 20)
        .text("Year")

    svg_line.append("text")
        .attr("transform", "translate(30," + (dimensions.height / 2) + ")rotate(-90)")
        .style("text-anchor", "middle")
        .text("Salary")
})


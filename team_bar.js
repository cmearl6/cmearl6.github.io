// Cole Earl
var team = "ATL";

var dimensions = {
    width: 500,
    height: 318,
    margin: {
        top: 50,
        bottom: 80,
        right: 30,
        left: 80
    }
}

var svgteam = d3.select("#teamcontainer")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 500 318")
            .classed("teambar", true)
            .style("background-color", "#9ec0ff")
            .style("border", "2px solid #c9082a");

function initializeTeamChart() {
    team = "";

    console.log(team)


    d3.csv("dataset/salaries.csv").then(function(dataset) {



        var playername = "Team";

        svgteam.selectAll("*").remove();
        
        var season = "Year";

        var years = Array.from(d3.group(dataset, d => d[season]));

        var salary = dataset.filter(d => d[playername] == team);

        var newyear = salary.map(d => d[season]);

        salary.forEach(d => d.Salary = parseInt(d.Salary))

        var xScale = d3.scaleBand()
                    .domain(newyear)
                    .range([dimensions.margin.left,dimensions.width - dimensions.margin.right]);

        var yScale = d3.scaleLinear()
                    .domain([0, d3.max(salary, d => d.Salary)])
                    .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

        svgteam.append('g')
            .call(d3.axisLeft(yScale))
            .style("transform", `translateX(${dimensions.margin.left}px)`)
            
        // create x axis with a tick every 5 years and 65 degree rotation
        svgteam.append('g')
            .call(d3.axisBottom(xScale)
            .tickValues(xScale.domain().filter(function(d,i){return ! (i%2)})))
            .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")

        svgteam.append("text")
        .attr("x", (dimensions.width - dimensions.margin.right) / 2)
        .attr("y", dimensions.height - 10)
        .style("text-anchor", "middle")
        .style("margin-top", 20)
        .text("Year")

        svgteam.append("text")
        .attr("transform", "translate(30," + (dimensions.height / 2) + ")rotate(-90)")
        .style("text-anchor", "middle")
        .text("Salary")
            
        var bars = svgteam.selectAll("rect")
            .data(salary)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d[season]))
            .attr("y", d => yScale(d.Salary))
            .attr("width", xScale.bandwidth())
            .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d.Salary))
            .attr("fill", "green")

        console.log(salary)

    })

}

function updateTeam(newplayer, color, outline) {
    team = newplayer;

    d3.csv("dataset/salaries.csv").then(function(dataset) {



        var playername = "Team";

        svgteam.selectAll("*").remove();
        
        var season = "Year";

        var years = Array.from(d3.group(dataset, d => d[season]));

        var salary = dataset.filter(d => d[playername] == team);

        var newyear = salary.map(d => d[season]);

        salary.forEach(d => d.Salary = parseInt(d.Salary))

        var xScale = d3.scaleBand()
                    .domain(newyear)
                    .range([dimensions.margin.left,dimensions.width - dimensions.margin.right]);

        var yScale = d3.scaleLinear()
                    .domain([0, (d3.max(salary, d => d.Salary) / 1000000)])
                    .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

        svgteam.append('g')
            .call(d3.axisLeft(yScale))
            .style("transform", `translateX(${dimensions.margin.left}px)`)
            
        // create x axis with a tick every 5 years and 65 degree rotation
        svgteam.append('g')
            .call(d3.axisBottom(xScale)
            .tickValues(xScale.domain().filter(function(d,i){return ! (i%2)})))
            .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")

        svgteam.append("text")
        .attr("x", (dimensions.width - dimensions.margin.right) / 2)
        .attr("y", dimensions.height - 10)
        .style("text-anchor", "middle")
        .text("Year")

        svgteam.append("text")
        .attr("transform", "translate(30," + (dimensions.height / 2) + ")rotate(-90)")
        .style("text-anchor", "middle")
        .text("Salary");

        var text = svgteam
        .append('text')
        .attr("id", 'playersalarytext')
        .attr("x", 200)
        .attr("y", 20)
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("font-family", "sans-serif")
        .text(newplayer + "'s Salary (millions)");
            
        var bars = svgteam.selectAll("rect")
            .data(salary)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d[season]))
            .attr("y", d => yScale(d.Salary / 1000000))
            .attr("width", xScale.bandwidth())
            .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d.Salary / 1000000))
            .attr("fill", color)
            .attr("stroke", outline)

        console.log(salary)

    })

}
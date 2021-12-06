// Cole Earl
var player = "LeBron James";

var svg = d3.select("#teambar")
            .style("width", dimensions.width)
            .style("height", dimensions.height)
            .style("background-color", "#9ec0ff")
            .style("border", "2px solid #c9082a");

var svgstream = d3.select('#stream')
            .style("width", dimensions.width)
            .style("height", dimensions.height)
            .style("background-color", "#9ec0ff")
            .style("border", "2px solid #c9082a");

function initializeChart() {
    player = "";

    console.log(player)


    d3.csv("dataset/playersalaries.csv").then(function(dataset) {



        var playername = "Player Name";

        svg.selectAll("*").remove();
        
        var season = "Season Start";

        var years = Array.from(d3.group(dataset, d => d[season]));

        var salary = dataset.filter(d => d[playername] == player);

        var newyear = salary.map(d => d[season]);

        salary.forEach(d => d.Salary = parseInt(d.Salary))

        var xScale = d3.scaleBand()
                    .domain(newyear)
                    .range([dimensions.margin.left,dimensions.width - dimensions.margin.right]);

        var yScale = d3.scaleLinear()
                    .domain([0, d3.max(salary, d => d.Salary)])
                    .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

        svg.append('g')
            .call(d3.axisLeft(yScale))
            .style("transform", `translateX(${dimensions.margin.left}px)`)
            
        // create x axis with a tick every 5 years and 65 degree rotation
        svg.append('g')
            .call(d3.axisBottom(xScale)
            .tickValues(xScale.domain()))
            .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")

        svg.append("text")
        .attr("x", (dimensions.width - dimensions.margin.right) / 2)
        .attr("y", dimensions.height - 10)
        .style("text-anchor", "middle")
        .text("Year")

        svg.append("text")
        .attr("transform", "translate(30," + (dimensions.height / 2) + ")rotate(-90)")
        .style("text-anchor", "middle")
        .text("Salary")
            
        var bars = svg.selectAll("rect")
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

function updatePlayer(newplayer) {
    player = newplayer;

    console.log(player)


    d3.csv("dataset/playersalaries.csv").then(function(dataset) {



        var playername = "Player Name";

        svg.selectAll("*").remove();
        
        var season = "Season Start";

        var years = Array.from(d3.group(dataset, d => d[season]));

        var salary = dataset.filter(d => d[playername] == player);

        var newyear = salary.map(d => d[season]);

        salary.forEach(d => d.Salary = parseInt(d.Salary))

        var xScale = d3.scaleBand()
                    .domain(newyear)
                    .range([dimensions.margin.left,dimensions.width - dimensions.margin.right]);

        var yScale = d3.scaleLinear()
                    .domain([0, d3.max(salary, d => d.Salary)])
                    .range([dimensions.height - dimensions.margin.bottom, 30])

        svg.append('g')
            .call(d3.axisLeft(yScale))
            .style("transform", `translateX(${dimensions.margin.left}px)`)
            
        // create x axis with a tick every 5 years and 65 degree rotation
        svg.append('g')
            .call(d3.axisBottom(xScale)
            .tickValues(xScale.domain()))
            .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")

        svg.append("text")
        .attr("x", (dimensions.width - dimensions.margin.right) / 2)
        .attr("y", dimensions.height - 10)
        .style("text-anchor", "middle")
        .text("Year")

        svg.append("text")
        .attr("transform", "translate(30," + (dimensions.height / 2) + ")rotate(-90)")
        .style("text-anchor", "middle")
        .text("Salary")

        var text = svg
        .append('text')
        .attr("id", 'playersalarytext')
        .attr("x", 200)
        .attr("y", 20)
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("font-family", "sans-serif")
        .text(newplayer + "'s Salary");
            
        var bars = svg.selectAll("rect")
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


function addLine(newplayer, statistic) {
    d3.csv("dataset/Seasons_Stats.csv").then(function(dataset) {

        var statdesc = "Points";

        if (statistic == "PPG") {
            statdesc = "Points";
        } else if (statistic == "RPG") {
            statdesc = "Rebounds";
        } else if (statistic == "APG") {
            statdesc = "Assists";
        }

        svgstream.selectAll("*").remove();

        var yearlystats = dataset.filter(d => d.Player == newplayer);
        yearlystats.forEach(d => d[statistic] = parseInt(d[statistic]))
    
        console.log(yearlystats);

        var season = yearlystats.map(d => d.Year);

        var xScale = d3.scaleBand()
                    .domain(season)
                    .range([dimensions.margin.left,dimensions.width - dimensions.margin.right]);

        var yScale = d3.scaleLinear()
                    .domain([0, d3.max(yearlystats, d => d[statistic])])
                    .range([dimensions.height - dimensions.margin.bottom, 30])

        svgstream.append('g')
            .call(d3.axisLeft(yScale))
            .style("transform", `translateX(${dimensions.margin.left}px)`)
            
        // create x axis with a tick every 5 years and 65 degree rotation
        svgstream.append('g')
            .call(d3.axisBottom(xScale)
            .tickValues(xScale.domain()))
            .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")

        svgstream.append("text")
        .attr("x", (dimensions.width - dimensions.margin.right) / 2)
        .attr("y", dimensions.height - 10)
        .style("text-anchor", "middle")
        .text("Year")

        svgstream.append("text")
        .attr("transform", "translate(30," + (dimensions.height / 2) + ")rotate(-90)")
        .style("text-anchor", "middle")
        .text(statdesc)

        var text = svgstream
        .append('text')
        .attr("id", 'playersalarytext')
        .attr("x", 200)
        .attr("y", 20)
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("font-family", "sans-serif")
        .text(newplayer + "'s " + statdesc);

        svgstream.append("path")
           .datum(yearlystats)
           .attr("fill", "none")
           .attr("stroke", "steelblue")
           .attr("stroke-width", 1.5)
           .attr("d", d3.line()
                .x(function(d) {return xScale(d.Year)})
                .y(function(d) {return yScale(d[statistic])}) 
           )
    
    })
}

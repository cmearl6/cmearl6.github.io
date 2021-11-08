// Cole Earl
var player = "LeBron James";

function updatePlayer(newplayer) {
    player = newplayer;
    updateBar();
}

d3.csv("dataset/salaries.csv").then(function(dataset) {

    var dimensions = {
        width: 1000,
        height: 500,
        margin: {
            top: 10,
            bottom: 50,
            right: 100,
            left: 150
        }
    }

    var playername = "Player Name";

    var svg = d3.select("#line")
                .style("width", dimensions.width)
                .style("height", dimensions.height)
    
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
       .attr("y", dimensions.height)
       .style("text-anchor", "middle")
       .text("Year")

    svg.append("text")
       .attr("transform", "translate(" + (dimensions.margin.left / 2) + "," + (dimensions.height / 2) + ")rotate(-90)")
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

    function updateBar() {
        xScale = d3.scaleBand()
                   .domain(newyear)
                   .range([dimensions.margin.left,dimensions.width - dimensions.margin.right]);

        yScale = d3.scaleLinear()
                   .domain([0, d3.max(salary, d => d.Salary)])
                   .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top]);

        salary = dataset.filter(d => d[playername] == player);

        newyear = salary.map(d => d[season]);

        salary.forEach(d => d.Salary = parseInt(d.Salary));

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
            .attr("transform", "rotate(-65)");

        var bars = svg.selectAll("rect")
                    .data(salary)
                    .enter()
                    .append("rect")
                    .attr("x", d => xScale(d[season]))
                    .attr("y", d => yScale(d.Salary))
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d.Salary))
                    .attr("fill", "green");

    }

})
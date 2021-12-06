// JavaScript source code

d3.csv("stream_salary.csv").then(function (dataset) {
    console.log(dataset)
    // I have no idea why dataset.year won't give me what I need
    var dimensions = {
        width: 400,
        height: 400,

    }

    var svg = d3.select("#line")
        .style("width", 400)
        .style("height", 400)
        .style("background-color", "#9ec0ff")
        .style("border", "2px solid red");

    var xAccessor = d => +d.Year
    var yAccessor = d => +d.Number

    var years = [...new Set(dataset.map(xAccessor))]

    var names = dataset.columns.slice(1)
    console.log(names)

    console.log(dataset[0])

    var xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.width])

    var yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .range([dimensions.height, 0])

    console.log(d3.extent(dataset, xAccessor))

    var xAxis = d3.scaleTime()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.width])
    svg.append("g")
        .attr("transform", "translate(0, " + dimensions.height + ")")
        .call(d3.axisBottom(xAxis))

    var yAxis = d3.scaleLinear()
        .domain([0, d3.max(dataset, yAccessor)])
        .range([dimensions.height, 0]);
    svg.append("g")
        .call(d3.axisLeft(yAxis));


    svg.append("path")
        .data([dataset])
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(d => xScale(xAccessor(d)))
            .y(d => yScale(yAccessor(d)))
        )



})

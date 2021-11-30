// Trying a streamgraph in JavaScript source code
d3.csv("dataset/salaries.csv").then(function (dataset) {
    var dimensions = {
        width: 1200,
        height: 800,
        margin: {
            top: 50,
            bottom: 100,
            right: 100,
            left: 150
        }
    }

    var svg = d3.select('#stream')
        .style("width", dimensions.width)
        .style("height", dimensions.height)
        .style("background-color", "lightgrey")

    console.log(dataset)
    var teams = ["ATL", "BOS", "CLE", "NOP", "CHI", "DAL", "DEN", "GSW", "HOU", "LAC", "LAL", "MIA", "MIL", "MIN", "BKN", "NYK", "ORL", "IND", "PHI", "PHX", "POR", "SAC", "SAS", "OKC", "TOR", "UTA", "MEM", "WAS", "DET", "CHA"]
    var team_colors = ["#C8102E", "#007A33", "#860038", "#0C2340", "#CE1141", "#00538C", "#0E2240", "#FFC72C", "#FFFFFF", "#1D428A", "#552583", "#98002E", "#00471B", "#0C2340", "#000000", "#F58426", "#C4CED4", "#FDBB30", "#006BB6", "#1D1160", "#000000", "#63727A", "#C4CED4", "#EF3B24", "#CE1141", "#002B5C", "#5D76A9", "#002B5C", "#C8102E", "#00788C"]
    var team_colors2 = ["#FFCD00", "#BA9653", "#041E42", "#C8102E", "#000000", "#002B5E", "#FEC524", "#1D428A", "#CE1141", "#C8102E", "#FDB927", "#F9A01B", "#EEE1C6", "#236192", "#FFFFFF", "#006BB6", "#0077C0", "#002D62", "#ED174C", "#E56020", "#E03A3E", "#5A2D81", "#000000", "#007AC1", "#000000", "#00471B", "#12173F", "#E31837", "#1D42BA", "#1D1160"]

    var season = "Season Start";

    var years = Array.from(d3.group(dataset, d => d[season]));

    var xAccessor = d => +d[season]

    var xScale = d3.scaleLinear()
        .domain()
        .range()

})
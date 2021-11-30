d3.csv("dataset/player_attributes.csv").then(function(dataset) {
    var width = 400
    var height = 300

    var svg = d3.select("#bubble")
                .style("width", width)
                .style("height", height)

    var team = "ATL"
    let activeplayers = dataset.filter(d => d.ROSTERSTATUS == "Active" && d.TEAM_ABBREVIATION == team)
    var stat = "PTS"

    var teams = ["ATL","BOS","CLE","NOP","CHI","DAL","DEN","GSW","HOU","LAC","LAL","MIA","MIL","MIN","BKN","NYK","ORL","IND","PHI","PHX","POR","SAC","SAS","OKC","TOR","UTA","MEM","WAS","DET","CHA"]
    var stats = [{"Label": "Points", "Value": "PTS"}, {"Label": "Rebounds", "Value": "REB"}, {"Label": "Assists", "Value": "AST"}]

    d3.select("#team")
      .selectAll('options')
      .data(teams)
      .enter()
      .append('option')
      .text(d => d)
      .attr("value", d => d)

    d3.select("#stat")
      .selectAll('options')
      .data(stats)
      .enter()
      .append('option')
      .text(d => d.Label)
      .attr("value", d => d.Value)


    function update(selected) {
        activeplayers = dataset.filter(d => d.ROSTERSTATUS == "Active" && d.TEAM_ABBREVIATION == selected)

        layout = d3.forceSimulation(activeplayers)
                   .force('center', d3.forceCenter(width/2, height/2))
                   .force('collisions', d3.forceCollide(4).radius(d => d[stat] * 2))
                   .on('tick', ticked);

        svg.select("g").remove();

        node = svg.append("g")
                  .selectAll("circle")
                  .data(activeplayers)
                  .enter()
                  .append("circle")
                  .attr('cx', d => d.x)
                  .attr('cy', d => d.y)
                  .attr("fill", "black")
                  .attr("opacity", 0.4)
                  .attr("r", d => d[stat] * 2)
                  .on('mouseover', function(e, d) {
                    document.getElementById("player").innerHTML = d.DISPLAY_FIRST_LAST;
                  })
                  .on('click', function(e, d){
                    updatePlayer(d.DISPLAY_FIRST_LAST);
                  });

    }

    function updateStat(newstat) {

        stat = newstat;

        layout = d3.forceSimulation(activeplayers)
                   .force('center', d3.forceCenter(width/2, height/2))
                   .force('collisions', d3.forceCollide().radius(d => d[stat] * 2))
                   .on('tick', ticked);

        svg.select("g").remove();

        node = svg.append("g")
                  .selectAll("circle")
                  .data(activeplayers)
                  .enter()
                  .append("circle")
                  .attr('cx', d => d.x)
                  .attr('cy', d => d.y)
                  .attr("fill", "black")
                  .attr("opacity", 0.4)
                  .attr("r", d => d[stat] * 2)
                  .on('mouseover', function(e, d) {
                    document.getElementById("player").innerHTML = d.DISPLAY_FIRST_LAST;
                  })
                  .on('click', function(e, d){
                    updatePlayer(d.DISPLAY_FIRST_LAST);
                  });
        dots.transition().duration(5000)
            .attr('cy', d => d[stat])
    }

    d3.select("#team").on("change", function(d){
        var selectedOption = d3.select(this).property("value")
        update(selectedOption)

    });
    
    d3.select("#stat").on("change", function(d){
        var selectedStat = d3.select(this).property("value")
        updateStat(selectedStat)
    })

    var layout = d3.forceSimulation(activeplayers)
                   .force('center', d3.forceCenter(width/2, height/2))
                   .force('collisions', d3.forceCollide(4).radius(d => d[stat] * 2))
                   .on('tick', ticked);

    let node = svg.append("g")
                  .selectAll("circle")
                  .data(activeplayers)
                  .enter()
                  .append("circle")
                  .attr('cx', d => d.x)
                  .attr('cy', d => d.y)
                  .attr("fill", "black")
                  .attr("opacity", 0.4)
                  .attr("r", d => d[stat] * 2)
                  .on('mouseover', function(e, d) {
                    document.getElementById("player").innerHTML = d.DISPLAY_FIRST_LAST;
                  })
                  .on('click', function(e, d){
                    console.log("click")
                    updatePlayer(d.DISPLAY_FIRST_LAST);
                  });

    function ticked(){
        node
           .attr('cx', d => d.x)
           .attr('cy', d => d.y)       
    }


})
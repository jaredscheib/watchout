// start slingin' some d3 here.

// create variables for height and width of eventual svg
var height = 480;
var width = 940;
// select body and append svg element (canvas)
  // set svg height and width
var svg = d3.select('body').append('svg')
          .attr('width', width)
          .attr('height', height)
        .append('g');

var highScoreSelector = d3.selectAll('.high span');
var highScore = 0;
var currentScoreSelector = d3.selectAll('.current span');
var currentScore = 0;
var collisionsSelector = d3.selectAll('.collisions span');
var collisions = 0;

var createPlayer = function() {
  var drag = d3.behavior.drag()
      .on('drag', function(d) {
        d3.select(this).attr('cx', d3.event.x)
                       .attr('cy', d3.event.y);
      });

  svg.selectAll('#player')
     .data(['player'])
     .enter().append('circle')
     .attr('cx', width / 2)
     .attr('cy', height / 2)
     .attr('r', 10)
     .attr('fill', 'orange')
     .attr('id', 'player')
     .call(drag);
};

// create function for creating enemies - input data (array of indices)
var createEnemies = function(numEnemies) {
  var randomCoords = function(){
    // create data array of enemies with random coordinates
    var data = [];
    for (var i = 0; i < numEnemies; i ++) {
      var x = Math.floor(Math.random() * width);
      var y = Math.floor(Math.random() * height);
      data.push({'x': x, 'y': y});
    }
    return data;
  };

  // create variable to refer to selection of all circles in svg
  svg.selectAll('.enemy')
  // bind data to circles collection
     .data(randomCoords())
  // select empty nodes among circles, append circle svg to each node
     .enter().append('circle')
  // set coordinates per node
     .attr('cx', function(d) {return d.x;})
     .attr('cy', function(d) {return d.y;})
     .attr('r', 6)
     .attr('class', 'enemy');
  // (no return; result is side effect of data-bound circle nodes visible in canvas)
  // set an interval to move all enemies every second
  setInterval( function () {
    // select all circles in svg
    svg.selectAll('.enemy')
    // move each circle to its new coordinate
       .data(randomCoords())
       .transition().duration(1000)
       .attr('cx', function(d) {return d.x;})
       .attr('cy', function(d) {return d.y;});
  }, 1000);
};

createPlayer();
// call createEnemies function on any number of enemies
createEnemies(25);

// call update scores function
var updateScores = function() {
  console.log('collide');
  currentScoreSelector.data([currentScore++]).text(function(d){return d;});
  console.log(collide);
  if( !collide() ) {
    // update scoreboard data
    // rewrite the below variables to actually reflect the respective span text data
    // if( currentScore > highScore ) { highScore = currentScore; }
    // currentScore = 0;
    // collisions++;
  }
};
// call collide
var collide = function() {
// create function for collision detection
  // assign player node to variable
  // assign enemies collection to variable
  // iterate over enemies
    // collission algorithm for circles
      // check conditions:
      // Math.sqrt((p.x - e.x)^2 + (p.y - e.y)^2) < (p.r + e.r)
    // collision algorithm for squares
        // p.top = p.y - p.r
        // p.bottom = p.y + p.r
        // p.left = p.x - p.r
        // p.right = p.x + p.r
      // Check 4 conditions:
        // p.top < e.top < p.bottom OR p.top < e.bottom < p.bottom
        // AND
        // p.left < e.left < p.right OR p.left < e.right < p.right
      // if collision with player, return true
};

// create interval to check for collisions
setInterval(updateScores, 10);

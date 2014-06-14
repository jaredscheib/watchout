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

// function to generate random x coordinate
var randomXCoord = function() {
  return Math.floor(Math.random() * width);
};

// function to generate random y coordinate
var randomYCoord = function() {
  return Math.floor(Math.random() * height);
};

var highScore = 0;
var currentScore = 0;
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
var createEnemies = function() {
  // create data array
  var data = [];
  // iterate through range (how many enemies we want)
  for( var i = 0; i < 1; i++ ){
    // push array item
    data.push(i);
  }
  // create variable to refer to selection of all circles in svg
  svg.selectAll('.enemy')
  // bind data to circles collection
     .data(data)
  // select empty nodes among circles, append circle svg to each node
     .enter().append('circle')
  // set coordinates per node
     .attr('cx', randomXCoord)
     .attr('cy', randomYCoord)
     .attr('r', 6)
     .attr('class', 'enemy');
  // (no return; result is side effect of data-bound circle nodes visible in canvas)
};

// create ticking function and listeners by binding svg to "tick"
  // currentScore++;
  // // call collide
  // if( !collide() )
  // //
  // // call update scores function
  //   if( currentScore > highScore ) { highScore = currentScore; }
  //   currentScore = 0;
  //   collisions++;

// create function for collision detection
  // iterate over enemies
    // collision algorithm
        // p.top = p.y - p.r
        // p.bottom = p.y + p.r
        // p.left = p.x - p.r
        // p.right = p.x + p.r
      // Check 4 conditions:
        // p.top < e.top < p.bottom
        // p.top < e.bottom < p.bottom
        // p.left < e.left < p.right
        // p.left < e.right < p.right
      // if collision with player, return true



createPlayer();
// call createEnemies function
createEnemies();

// set an interval to move all enemies every second
setInterval( function () {
  // select all circles in svg
  svg.selectAll('.enemy')
  // move each circle to its new coordinate
     .transition().duration(1000)
     .attr('cx', randomXCoord)
     .attr('cy', randomYCoord);
}, 1000);

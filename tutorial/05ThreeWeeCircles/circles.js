var svg = d3.select('svg');
var circle = svg.selectAll('circle');
var data = [32, 57, 112];

circle.attr('r', 30);
circle.attr('cx', function() { return 720 * Math.random(); });
circle
  .data(data)
  .attr('r', function(d, i) { return Math.sqrt(100 * i + d); })
  .attr('cy', function(d, i) { return 10 * i + 50; });

// Add new data/elements
data.push(293);
circle = svg.selectAll('circle')
  .data(data);

//var circleEnter =
circle.enter().append('circle')
// attributes are only applied to new/entering elements
  .attr('cy', 60)
  .attr('cx', function(d, i) { return i * 100 + 30; })
  .attr('r', function(d, i) { return Math.sqrt(100 * i + d); });

// Remove elements
data.pop();
data.pop();

circle = svg.selectAll('circle')
  .data(data)
  .exit().remove();

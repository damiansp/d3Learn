var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var svg = d3.select('svg'),
  w = +svg.attr('width'),
  h = +svg.attr('height'),
  g = svg.append('g').attr('transform', 'translate(32,' + (h/2) + ')');

function update(data) {
  var t = d3.transition().duration(750);
  
  /** Data Join **/
  // Join new data with old elements, if any.
  var text = g.selectAll('text')
    .data(data, function(d) { return d; });

  /** Exit **/
  // Remove old elements as needed
  text.exit()
    .attr('class', 'exit')
    .transition(t)
    .attr('y', 60)
    .style('fill-opacity', 1e-6)
    .remove()

  /** Update **/
  // Update old elements as needed
  text.attr('class', 'update')
    .attr('y', 0)
    .style('fill-opacity', 1)
    .transition(t)
    .attr('x', function(d, i) { return i * 32 });
  
  /** Enter **/
  // Create new elements as needed
  text.enter().append('text')
    .attr('class', 'enter')
    .attr('dy', '0.35em')
    .attr('y', -60)
    .attr('x', function(d, i) { return i * 32; })
    .style('fill-opacity', 1e-6)
    .text(function(d) { return d; })
    .transition(t)
    .attr('y', 0)
    .style('fill-opacity', 1);
}

// Initial display
update(alphabet);

// Grab a random sample of the letters, in alphabetical order
d3.interval(function() {
    update(d3.shuffle(alphabet)
             .slice(0, Math.floor(26 * Math.random()))
             .sort());
}, 1000);

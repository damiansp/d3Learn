var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var svg = d3.select('svg'),
  w = +svg.attr('width'),
  h = +svg.attr('height'),
  g = svg.append('g').attr('transform', 'translate(32,' + (h/2) + ')');

function update(data) {
  /** Data Join **/
  // Join new data with old elements, if any.
  var text = g.selectAll('text')
    .data(data, function(d) { return d; });

  /** Update **/
  // Update old elements as needed
  text.attr('class', 'update');

  /** Enter **/
  // Create new elements as needed

  /** Enter + Update **/
  // After merging the entered elements with the update selection, apply
  // operations to both
  text.enter().append('text')
    .attr('class', 'enter')
    .attr('dy', '0.35em')
    .text(function(d) { return d; })
    .merge(text)
    .attr('x', function(d, i) { return i * 32; })

  /** Exit **/
  // Remove old elements as needed
  text.exit().remove();
}

// Initial display
update(alphabet);

// Grab a random sample of the letters, in alphabetical order
d3.interval(function() {
    update(d3.shuffle(alphabet)
             .slice(0, Math.floor(26 * Math.random()))
             .sort());
}, 1000);

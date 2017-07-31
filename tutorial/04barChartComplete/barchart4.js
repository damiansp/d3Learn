var margin = {top: 20, right: 30, bottom: 30, left: 40},
  w = 960 - margin.left - margin.right,
  h = 500 - margin.top - margin.bottom;

// Scaling
var x = d3.scale.ordinal()
  .rangeRoundBands([0, w], 0.1); // includes 10% padding 
var y = d3.scale.linear()
  .range([h, 0]); // note: domain assigned in d3.csv()

// Axes
var xAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom');
var yAxis = d3.svg.axis()
  .scale(y)
  .orient('left')
  .ticks(10);

var chart = d3.select('.chart')
  .attr('width', w + margin.left + margin.right)
  .attr('height', h + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

d3.csv('../data/rainfall.csv', function(error, data) {
    x.domain(data.map(function(d) { return d.month; }));
    y.domain([0, d3.max(data, function(d) { return +d.rainfall; })]);
    
    chart.append('g')
      .attr('class', 'x axis') // note: 2 classes are being added
      .attr('transform', 'translate(0, ' + h + ')')
      .call(xAxis);
    chart.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .style('text-anchor', 'end')
      .text('Rainfall (mm)')
      .attr('dy', '-20px')
      .attr('dx', '10px');
    chart.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return x(d.month); })
      .attr('y', function(d) { return y(+d.rainfall); })
      .attr('height', function(d) { return h - y(+d.rainfall); })
      .attr('width', x.rangeBand());
});


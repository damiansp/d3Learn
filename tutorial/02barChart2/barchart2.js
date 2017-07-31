var data = [4, 8, 16, 32, 24];
var body = d3.select('body');
var div = body.append('div');
div.html('Hello, World!');

body.style('color', 'white')
  .style('background-color', '#000044');

/**
d3.selectAll('div')
  .attr('class', 'special')
  .append('div') // returns NEW div elements, not original so..
    .html('And hello again!'); // additional indentation is Bostock's rec
*/

/** Chart 1 */
d3.select('.chart1')
  .selectAll('div')
    .data(data)
  .enter().append('div')
    .style('width', function(d) { return d * 10 + 'px'; })
    .style('background-color', '#444488')
    .text(function(d) { return d; });

/** Chart 2 */
// Scaling 
var x = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, 420]);

d3.select('.chart2')
  .selectAll('div')
    .data(data)
  .enter().append('div')
  .style('width', function(d) { return x(d) + 'px'; })
    .style('background-color', '#8888CC')
    .text(function(d) { return d; });

/** Chart 3 */
var w = 420,
  barH = 20;
var x2 = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, w]);
var chart = d3.select('.chart3')
  .attr('width', w)
  .attr('height', barH * data.length);
var bar = chart.selectAll('g')
    .data(data)
  .enter().append('g')
    .attr('transform', function(d, i) {
        return 'translate(0, ' + i * barH + ')';
    });
bar.append('rect')
  .attr('width', x2)
  .attr('height', barH - 1);
bar.append('text')
  .attr('x', function(d) { return x2(d) - 3; })
  .attr('y', barH / 2)
  .attr('dy', '0.35em')
  .text(function(d) { return d; });

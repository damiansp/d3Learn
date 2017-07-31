// 1. Code here runs first, before data download
var w = 800,
  barH = 40;
var x = d3.scale.linear()
  .range([0, w]); // note: domain assigned in d3.csv()
var chart = d3.select('.chart')
  .attr('width', w);

d3.csv('../data/barData.csv', function(error, data) {
    // 3. Code here runs last, after download completes
    x.domain([0, d3.max(data, function(d) { return +d.age; })]);
    chart.attr('height', barH * data.length);

    var bar = chart.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
          return 'translate(0, ' + i * barH + ')';
      });

    bar.append('rect')
      .attr('width', function(d) { return x(+d.age); })
      .attr('height', barH - 1); // 1px margin
    bar.append('text')
      .attr('x', function(d) { return x(+d.age) - 6; }) // pad by 6px
      .attr('y', barH / 2)
      .attr('dy', '0.35em')
      .text(function(d) { return d.age; });
});

// 2. Code here runs second, while data is downloading


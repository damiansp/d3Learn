var data = [30, 88, 166, 280, 303, 365];

d3.select('.chart')
  .selectAll('div')
  .data(data)
  .enter()  // creates placeholder(s)
  .append('div')  // makes the placeholder a div element
  .style('width', function(d) {
      return d + 'px'; // d is current elem in data
    })  
  .text(function(d) { return d; });

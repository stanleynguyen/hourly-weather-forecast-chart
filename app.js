// var distinctColorsSet = '{2,63,165},{125,135,185},{190,193,212},{214,188,192},{187,119,132},{142,6,59},{74,111,227},{133,149,225},{181,187,227},{230,175,185},{224,123,145},{211,63,106},{17,198,56},{141,213,147},{198,222,199},{234,211,198},{240,185,141},{239,151,8},{15,207,192},{156,222,214},{213,234,231},{243,225,235},{246,196,225},{247,156,212}';
// String.prototype.splice = function(idx, rem, str) {
//     return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
// }
// var i = 0, prevVal;
// while (i < distinctColorsSet.length) {
//     if (distinctColorsSet[i] === '{') {
//         distinctColorsSet = distinctColorsSet.splice(i+1, 0, 'r: ');
//         i++;
//         prevVal = '{';
//     } else if (distinctColorsSet[i] === '}') {
//         i++;
//         prevVal = '}';
//     } else if (distinctColorsSet[i] === ',') {
//         switch (prevVal) {
//             case '{':
//                 distinctColorsSet = distinctColorsSet.splice(i+1, 0, 'g: ');
//                 break;
//             case ',':
//                 distinctColorsSet = distinctColorsSet.splice(i+1, 0, 'b: ');
//                 break;
//             default:
//                 break;
//         }
//         i++;
//         prevVal = ',';
//     } else {
//         i++;
//     }
// }
//
// console.log(distinctColorsSet);
var distinctColorsSet = [{r: 2,g: 63,b: 165},{r: 125,g: 135,b: 185},{r: 190,g: 193,b: 212},{r: 214,g: 188,b: 192},{r: 187,g: 119,b: 132},{r: 142,g: 6,b: 59},{r: 74,g: 111,b: 227},{r: 133,g: 149,b: 225},{r: 181,g: 187,b: 227},{r: 230,g: 175,b: 185},{r: 224,g: 123,b: 145},{r: 211,g: 63,b: 106},{r: 17,g: 198,b: 56},{r: 141,g: 213,b: 147},{r: 198,g: 222,b: 199},{r: 234,g: 211,b: 198},{r: 240,g: 185,b: 141},{r: 239,g: 151,b: 8},{r: 15,g: 207,b: 192},{r: 156,g: 222,b: 214},{r: 213,g: 234,b: 231},{r: 243,g: 225,b: 235},{r: 246,g: 196,b: 225},{r: 247,g: 156,b: 212}];


var lineData = [{
  x: 0,
  y: 10
}, {
  x: 20,
  y: 20
}, {
  x: 40,
  y: 10
}, {
  x: 60,
  y: 40
}, {
  x: 80,
  y: 5
}, {
  x: 100,
  y: 60
}];
var vis = d3.select('#graph'),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },
    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, d3.max(lineData, function(d) {
      return d.x;
    })]),
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, d3.max(lineData, function(d) {
      return d.y;
    })]),
    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient('left')
      .tickSubdivide(true);

vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
  .call(xAxis);

vis.append('svg:g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
  .call(yAxis);

var lineFunc = d3.svg.line()
    .x(function(d) {
      return xRange(d.x);
    })
    .y(function(d) {
      return yRange(d.y);
    })
    .interpolate('linear');

vis.append('svg:path')
  .attr('d', lineFunc(lineData))
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

$(document).on('submit', '#form--add-city', function(event) {
    event.preventDefault();
    var $this = $(event.target);
    var data = {
        key: 'c54944da22b147b48ec152033160205',
        q: $this.find('input[name="city"]').val()};
    console.log(data);
    $this[0].reset();
    $.ajax({
        url: 'https://api.apixu.com/v1/forecast.json',
        type: 'GET',
        data: data
    }).done(function(response) {
        console.log(response);
    }).fail(function() {
        alert('what the hell');
    });
});

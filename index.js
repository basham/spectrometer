var chroma = require('chroma-js');

function colorName(lum, range, steps) {
  return Math.round(lum * steps) * range / steps;
}

function colorScale(color, range, steps) {
  var s = {};
  range = range || 1000;
  steps = steps || 20;

  var colors = ['#fff', color, '#000'];
  var scale = chroma.scale(colors).mode('lab').correctLightness(true);

  // Exclude the first (black) and last (white).
  for( var i = 1; i < steps; i++ ) {
    var lum = i / steps;
    var name = colorName(lum, range, steps).toString();
    var hex = scale(lum).hex();
    s[name] = {
      name: name,
      lum: lum,
      hex: hex
    };
  }

  var lum = chroma(color).lab()[0];
  lum = (100 - lum) / 100;
  var name = colorName(lum, range, steps).toString();

  // Override the closest matching derivative color with the source color.
  s[name] = {
    name: name,
    lum: lum,
    hex: chroma(color).hex()
  };

  return s;
}

var source = {
  cream: '#E1D8B7',
  crimson: '#7D110C',
  majestic: '#4B306A'
};

var colors = colorScale(source.majestic, 1000, 10);

console.log(colors);

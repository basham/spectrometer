// Import npm dependencies.
var chroma = require('chroma-js'); // Version 0.6.x
// Settings.
var scaleSourceHex = 'green'; // #008000
// Prepare color scale.
var lightness = chroma(scaleSourceHex).lab()[0];
var luminance = chroma(scaleSourceHex).luminance();

console.log('Color:', scaleSourceHex, '| Lightness:', lightness, '| Luminance:', luminance);

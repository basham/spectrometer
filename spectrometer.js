// Import npm dependencies.
var chroma = require('chroma-js'); // Version 0.6.x
// Settings.
var scaleSourceHex = 'green'; // #008000
var scaleVarName = '@color-Green';
var scaleVarNameDelimiter = '--';
var useBezierInterpolation = true;
var useLightnessCorrection = true;
// Prepare color scale.
var colors = ['#fff', scaleSourceHex, '#000'];
if(useBezierInterpolation) {
  colors = chroma.interpolate.bezier(colors);
}
var scale = chroma.scale(colors).mode('lab').correctLightness(useLightnessCorrection);
// Output source color.
console.log(scaleVarName + ': ' + scaleSourceHex + ';');
// Interpolate colors, skipping the generation of
// white (luminance of 0) and black (luminance of 1).
for(var i = 1, steps = 10; i < steps; i++) {
  var luminance = i / steps;
  // Convert luminance value to numbering system value.
  var name = Math.round(luminance * 1000);
  // Generate RGB color from luminance location along scale.
  var hex = scale(luminance).hex();
  //var hex = chroma(scaleSourceHex).luminance(1 - luminance).hex();
  //var hex = scale(luminance).luminance(1 - luminance).hex();
  var lum = chroma(hex).luminance();
  // Output.
  var varName = scaleVarName + scaleVarNameDelimiter + name;
  var comment = '// luminance ' + luminance;
  console.log(varName + ': ' + hex + '; ' + comment, lum);
}

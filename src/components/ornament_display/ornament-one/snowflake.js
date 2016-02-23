
var styleGenerator = require('./style-generator.js');
var styleOptions = require('./style-options.js');
var randomizer = require('./randomizer.js');

function Snowflake(total_eles, odd_eles, even_eles, cont_height) {
  this.total_eles = total_eles;
  this.odd_eles = odd_eles;
  this.even_eles = even_eles;
  this.cont_height = cont_height;
}

Snowflake.prototype = {
  styleGenerator: styleGenerator,
  styleOptions: styleOptions,
  randomizer: randomizer
}

module.exports = Snowflake;


var randomizer = require('./randomizer.js');

/**
 *
 * Ornament Style Options
 *
 */

var styleOptions = {
  createRangeOfWidthItems: function(start, stop, increment) {
    var widthArray = [];
    for (var i = start; i < stop; i += increment) {
      widthArray.push("" + i + "px");
    }
    return widthArray;
  },
  createRangeOfHeightItems: function(start, stop, inc) {
    var heightArr = [];
    for(var i = start; i < stop; i += inc) {
      var defHeight = "" + i + "px";
      heightArr.push(defHeight);
    }
    return heightArr;
  },
  oddContainerWidths: function(evenEles, oddEles) {
    var evenWidthStop = (evenEles * 2) + 2;
    var oddWidthStop = (oddEles * 2) + evenWidthStop;
    var oddContainerWidths = this.createRangeOfWidthItems(evenWidthStop, oddWidthStop, 2);
    return oddContainerWidths;
  },
  evenContainerWidths: function(evenEles, oddEles) {
    var evenWidthStop = (evenEles * 2) + 2;
    return this.createRangeOfWidthItems(2, evenWidthStop, 2);
  },
  heights: function() {
    return this.createRangeOfHeightItems(50, 250, 10);
  },
  rotationDegrees: function(numberOfContainers) {
    var degreeList = [];
    for(var i = 0; i < numberOfContainers; i++) {
      degreeList.push(randomizer.getRandomInt(180));
    }
    return degreeList;
  },
  colorSchemes: [
    {
      id: 'greens',
      dark: '#007241',
      med: '#00ff92',
      light: '#70ffc2'
    },
    {
      id: 'blues',
      dark: '#002c6e',
      med: '#1774ff',
      light: '#7db1ff'
    },
    {
      id: 'reds',
      dark: '#990024',
      med: '#ff003b',
      light: '#ff7091'
    }
  ],
  opacities: ['0.75', '0.50', '0.25']
};

module.exports = styleOptions; 

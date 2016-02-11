
var randomizer = require('./randomizer.js');
var styleOptions = require('./style-options.js');

/**
 *
 * Amount of Line Containers to produce
 *
 */

/*
var TOTAL_LINE_CONTAINERS = 11;
var ODD_LINE_CONTAINERS = 4;
var EVEN_LINE_CONTAINERS = 5;
var ART_BOX_HEIGHT = 300;
*/

/**
 *
 * Ornament Style Generator
 *
 */

var styleGenerator = {
  config: {
    totalEles: 0,
    oddEles:  0 ,
    evenEles: 0,
    containerHeight: 0,
    totalColorSchemes: 3,
    totalOpac: 3
  },
  getRandomOddWidths: function() {
    var evenEles = this.config.evenEles;
    var oddEles = this.config.oddEles;
    var oddWidthList = styleOptions.oddContainerWidths(evenEles, oddEles);
    var indexList = randomizer.getIndexList(
      this.config.oddEles,
      this.config.oddEles
    );
    return randomizer.generateRandomList(oddWidthList, indexList);
  },
  getRandomEvenWidths: function() {
    var evenEles = this.config.evenEles;
    var oddEles = this.config.oddEles;
    var evenWidthList = styleOptions.evenContainerWidths(evenEles, oddEles);
    var indexList = randomizer.getIndexList(
      this.config.evenEles,
      this.config.evenEles
    );
    return randomizer.generateRandomList(evenWidthList, indexList);
  },
  getAlternatingWidths: function() {
    var evenWidths = this.getRandomEvenWidths();
    var oddWidths = this.getRandomOddWidths();
    var alternatingWidths = [];
    var iterations = (this.config.evenEles > this.config.oddEles) ? this.config.evenEles : this.config.oddEles;
      var pushWidths = function(iterations, counter) {
        if(iterations > 0) {
          if(evenWidths[counter])
            alternatingWidths.push(evenWidths[counter]);
          if(oddWidths[counter])
            alternatingWidths.push(oddWidths[counter]);
          counter++;
          pushWidths(iterations - 1, counter);
        }
        else {
          return false;
        }
      }
      pushWidths(iterations, 0);
      return alternatingWidths;
  },
  getRandomHeights: function() {
    var oddHeightSelection = styleOptions.heights();
    var indexList = randomizer.getIndexList(
      this.config.totalEles,
      oddHeightSelection.length
    );
    return randomizer.generateRandomList(oddHeightSelection, indexList);
  },
  getBgColorSet: function() {
    var index = randomizer.getRandomInt(this.config.totalColorSchemes);
    var colorSchemes = styleOptions.colorSchemes;
    var bgColorSet = [];
    for(var key in colorSchemes[index]) {
      if(key !== 'id') {
        bgColorSet.push(colorSchemes[index][key]);
      }
    }
    return bgColorSet;
  },
  getBgColorList: function() {
    var bgColorSet = this.getBgColorSet();
    var bgColorList = [];
    var j = 0;
    for(var i = 0; i < this.config.totalEles; i++) {
      bgColorList.push(bgColorSet[j]);
      if(j === 2)
        j = 0
      else
        j++
    }
    return bgColorList;
  },
  getOpacityList: function() {
    var opacitySet = styleOptions.opacities;
    var opacityList = [];
    var j = 0;
    for(var i = 0; i < this.config.totalEles; i++) {
      opacityList.push(opacitySet[j]);
      if (j === this.config.totalOpac - 1) 
        j = 0
      else 
        j++
    }
    return opacityList; 
  },
  getRotationList: function() {
    var rotations = styleOptions.rotationDegrees(this.config.totalEles);
    var rotationList = [];
    for(var i = 0; i < this.config.totalEles; i++) {
      rotationList.push('rotate\(' + rotations[i] + 'deg\)') 
    };
    return rotationList;
  },
  getTopPositionList: function(heights) {
    var topPositionList = [];
    var heightsListLength = heights.length;
    for(var i = 0; i < heightsListLength; i++) {
      var heightString = heights[i].split(/px/)[0];
      var topPosition = (this.config.containerHeight - heightString) / 2;
      topPositionList.push(topPosition.toString() + "px"); 
    };
    return topPositionList;
  },
  configure: function(TOTAL_ELES, ODD_ELES, EVEN_ELES, CONT_HEIGHT) {
    this.config.totalEles = TOTAL_ELES;
    this.config.oddEles = ODD_ELES;
    this.config.evenEles = EVEN_ELES;
    this.config.containerHeight = CONT_HEIGHT;
  },
  getStylesList: function(TOTAL_ELES, ODD_ELES, EVEN_ELES, CONT_HEIGHT) {
    this.configure(TOTAL_ELES, ODD_ELES, EVEN_ELES, CONT_HEIGHT);
    var widths = this.getAlternatingWidths();
    var heights = this.getRandomHeights();
    var rotations = this.getRotationList();
    var topPositions = this.getTopPositionList(heights);
    var bgColors = this.getBgColorList();
    var opacities = this.getOpacityList();
    var containerStylesList = [];
    var innerLineStylesList = [];
    for(var i = 0; i < TOTAL_ELES; i++) {
      containerStylesList.push({
        width: widths[i],
        height: heights[i],
        transform: rotations[i],
        top: topPositions[i]
      });
      innerLineStylesList.push({
        backgroundColor: bgColors[i],
        opacity: opacities[i]
      });
    }
    return {
      containerStylesList: containerStylesList,
      innerLineStylesList: innerLineStylesList
    };
  }
};

module.exports = styleGenerator;

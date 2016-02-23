
var randomizer = require('./randomizer.js');
var styleOptions = require('./style-options.js');


/**
 *
 * Ornament Style Generator
 *
 */

var styleGenerator = function() {
  var total_eles = this.total_eles,
      odd_eles = this.odd_eles,
      even_eles = this.even_eles,
      cont_height = this.cont_height;
  return {
    config: {
      totalEles: total_eles,
      oddEles:  odd_eles,
      evenEles: even_eles,
      containerHeight: cont_height,
      totalColorSchemes: function() {
        return styleOptions.colorSchemes.length;
      },
      totalOpac: function() {
        return styleOptions.opacities.length;
      }
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
      var index = randomizer.getRandomInt(this.config.totalColorSchemes());
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
      var totalOpacities = this.config.totalOpac();
      var j = 0;
      for(var i = 0; i < this.config.totalEles; i++) {
        opacityList.push(opacitySet[j]);
        if (j === totalOpacities - 1) 
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
    getStylesList: function() {
      var widths = this.getAlternatingWidths();
      var heights = this.getRandomHeights();
      var rotations = this.getRotationList();
      var topPositions = this.getTopPositionList(heights);
      var bgColors = this.getBgColorList();
      var opacities = this.getOpacityList();
      var containerStylesList = [];
      var innerLineStylesList = [];
      for(var i = 0; i < total_eles; i++) {
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
  }
};

module.exports = styleGenerator;

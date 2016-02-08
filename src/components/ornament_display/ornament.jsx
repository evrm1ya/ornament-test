
var React = require('react');
var LineContainer = require('./line-container.jsx');

/**
 *
 * Amount of Line Containers to produce
 *
 */

var TOTAL_LINE_CONTAINERS = 9;
var ODD_LINE_CONTAINERS = 4;
var EVEN_LINE_CONTAINERS = 5;
var ART_BOX_HEIGHT = 300;

/**
 *
 * Create Randomized ints, indices, lists
 *
 */

var randomizer = {
  getRandomInt: function(max) {
    return Math.floor(Math.random() * max);
  },
  getIndexList: function(listLength, intMax) {
    var indexList = [this.getRandomInt(intMax)]; 
    var addIndices = function(listLength, intMax) {
      var index = this.getRandomInt(intMax);
      var check = true;
      for(var i = 0; i < indexList.length; i++) {
        if(index === indexList[i]) {
          check = false;
          break;
        } 
      }
      if(listLength > 1 && check) {
        indexList.push(index);
        addIndices(listLength - 1, intMax);
      }
      else if(listLength > 1 && !check) {
        addIndices(listLength, intMax);
      }
    }.bind(this); 
    addIndices(listLength, intMax);
    return indexList;
  },
  generateRandomList: function(styleList, randomIndexList) {
    var randomList = [];
    var randomIndexListLength = randomIndexList.length;
    for(var i = 0; i < randomIndexListLength; i++) {
      randomList.push(styleList[randomIndexList[i]]);
    };
    return randomList;
  }
};

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
  oddContainerWidths: function() {
    return this.createRangeOfWidthItems(12, 20, 2);
  },
  evenContainerWidths: function() {
    return this.createRangeOfWidthItems(2, 12, 2);
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

/**
 *
 * Ornament Style Generator
 *
 */

var styleGenerator = {
  config: {
    totalEles: TOTAL_LINE_CONTAINERS,
    oddEles: ODD_LINE_CONTAINERS,
    evenEles: EVEN_LINE_CONTAINERS,
    totalColorSchemes: 3,
    totalOpac: 3
  },
  getRandomOddWidths: function() {
    var oddWidthList = styleOptions.oddContainerWidths();
    var indexList = randomizer.getIndexList(
      this.config.oddEles,
      this.config.oddEles
    );
    return randomizer.generateRandomList(oddWidthList, indexList);
  },
  getRandomEvenWidths: function() {
    var evenWidthList = styleOptions.evenContainerWidths();
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
    var iterations = (this.config.evenEles > this.config.oddEles) ||
      (this.config.evenEles === this.config.oddEles) ? this.config.evenEles : this.config.oddEles;
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
    for(var i = 0; i < TOTAL_LINE_CONTAINERS; i++) {
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
    for(var i = 0; i < TOTAL_LINE_CONTAINERS; i++) {
      opacityList.push(opacitySet[j]);
      if (j === this.config.totalOpac - 1) 
        j = 0
      else 
        j++
    }
    return opacityList; 
  },
  getRotationList: function() {
    var rotations = styleOptions.rotationDegrees(TOTAL_LINE_CONTAINERS);
    var rotationList = [];
    for(var i = 0; i < TOTAL_LINE_CONTAINERS; i++) {
      rotationList.push('rotate\(' + rotations[i] + 'deg\)') 
    };
    return rotationList;
  },
  getTopPositionList: function(heights) {
    var topPositionList = [];
    var heightsListLength = heights.length;
    for(var i = 0; i < heightsListLength; i++) {
      var heightString = heights[i].split(/px/)[0];
      var topPosition = (ART_BOX_HEIGHT - heightString) / 2;
      topPositionList.push(topPosition.toString() + "px"); 
    };
    return topPositionList;
  },
  getContainerStylesList: function() {
    var widths = this.getAlternatingWidths();
    var heights = this.getRandomHeights();
    var rotations = this.getRotationList();
    var topPositions = this.getTopPositionList(heights);
    var containerStylesList = [];
    for(var i = 0; i < TOTAL_LINE_CONTAINERS; i++) {
      containerStylesList.push({
        width: widths[i],
        height: heights[i],
        transform: rotations[i],
        top: topPositions[i]
      });
    }
    return containerStylesList;
  },
  getInnerLineStylesList: function() {
    var bgColors = this.getBgColorList();
    var opacities = this.getOpacityList();
    var innerLineStyles = [];
    for(var i = 0; i < TOTAL_LINE_CONTAINERS; i++) {
      innerLineStyles.push({
        backgroundColor: bgColors[i],
        opacity: opacities[i]
      });
    }
    return innerLineStyles;
  }
};

/**
 *
 * Ornament Component
 *
 */

module.exports = React.createClass({
  getInitialState: function() {
    return {
      click: false,
    }
  },
  render: function() {
    return <div className='col-xs-6 col-md-4'>
      <div className='ornament'>
        <div className='art-box'>
          {this.addText()}
          {this.generateLineContainers()}
        </div>
        <div className='btn-box'> 
          <a 
            onClick={this.handleClick} 
            href='javascript:void(0);'
            >
            <i className='fa fa-cog'></i>
          </a>
        </div>
      </div>
    </div>
  },
  handleClick: function() {
    var click = (this.state.click) ? false : true;
    this.setState({click: click});
  },
  addText: function() {
    if(this.state.click) {
      return 'true';
    }
    else {
      return 'false';
    }
  },
  generateLineContainers: function() {
    var lineContainers = [];
    var containerStyles = styleGenerator.getContainerStylesList();
    var innerLineStyles = styleGenerator.getInnerLineStylesList();
    for(var i = 0; i < TOTAL_LINE_CONTAINERS; i++) {
      lineContainers.push(
        <LineContainer
          key={'cont_' + (i+1)}
          containerStyle={containerStyles[i]}
          innerLineStyle={innerLineStyles[i]}
        />
      );
    }
    return lineContainers;
  }
});

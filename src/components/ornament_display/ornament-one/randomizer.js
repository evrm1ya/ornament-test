
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

module.exports = randomizer;


var React = require('react');
var LineContainer = require('./line-container.jsx');
var StyleGenerator = require('./ornament-one/style-generator.js');

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
          {this.generateLineContainers()}
        </div>
        <div className='btn-box'> 
          <div className='btn-wrapper'>
            <a 
              onClick={this.handleClick} 
              href='javascript:void(0);'
              >
              <i className='fa fa-cog'></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  },
  handleClick: function() {
    var click = (this.state.click) ? false : true;
    this.setState({click: click});
  },
  generateLineContainers: function() {
    var lineContainers = [];
    var stylesList = StyleGenerator.getStylesList(10, 5, 5, 300);
    for(var i = 0; i < 10; i++) {
      lineContainers.push(
        <LineContainer
          key={'cont_' + (i+1)}
          containerStyle={stylesList.containerStylesList[i]}
          innerLineStyle={stylesList.innerLineStylesList[i]}
        />
      );
    }
    return lineContainers;
  }
});


var React = require('react');
var LineContainer = require('./line-container.jsx');
var StyleGenerator = require('./ornament-one/style-generator.js');
var Snowflake = require('./ornament-one/snowflake.js');

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
    var snowflake = new Snowflake(5, 3, 2, 200);
    console.log(snowflake.styleGenerator);
    console.log(snowflake.styleGenerator());
    var lineContainers = [];
    var stylesList = snowflake.styleGenerator().getStylesList();
    for(var i = 0; i < 9; i++) {
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

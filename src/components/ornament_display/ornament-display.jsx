
var React = require('react');
var Ornament = require('./ornament.jsx');

module.exports = React.createClass({
  render: function() {
    return <div className='row'>
      {this.renderOrnaments()}
    </div>
  },
  renderOrnaments: function() {
    var ornaments = [];
    for(var i = 0; i < 3; i++) {
      ornaments.push(
        <Ornament 
          key={'ornament_' + (i+1)}
          ornamentNum={i+1}
        />
      );
    }
    return ornaments;
  }
});


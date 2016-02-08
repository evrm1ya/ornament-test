
var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <div 
      style={this.props.containerStyle}
      className='line-container'
      >
      <div 
        className='inner-div-one'
        style={this.props.innerLineStyle}
        >
      </div>
      <div
        className='inner-div-two'
        style={this.props.innerLineStyle}
        >
      </div>
    </div>
  }
});

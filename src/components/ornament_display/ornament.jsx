
var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    }
  },
  render: function() {
    return <div className='col-xs-6 col-md-4'>
      <div className='ornament'>
        <div 
          id={'art-orn' + this.props.ornamentNum} 
          className='art-box'
          >
          {this.state.text}
        </div>
        <div className='btn-box'> 
          <a 
            id={'btn-orn' + this.props.ornamentNum}
            onClick={this.handleClick} 
            href='javascript:void(0);'
            >
            <i className='fa fa-cog'></i>
          </a>
        </div>
      </div>
    </div>
  },
  handleClick: function(event) {
    var artBoxes = document.querySelectorAll('.art-box');
    var currentBtn = event.currentTarget.id.split('-')[1];
    var boxLength = artBoxes.length;
    for(var i = 0; i < boxLength; i++) {
      var checkArtId = artBoxes[i].id.split('-')[1];
      if(checkArtId === currentBtn) {
        console.log('niiiiiiice');
      }
    }
  }
});

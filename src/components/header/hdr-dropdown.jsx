
var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      clicked: false,
    }
  },
  listStyles: {
    hideList: {display: 'none'},
    showList: {display: 'block'},
    inactBtn: {color: '#333'},
    activeBtn: {color: '#06ff72'}
  },
  render: function() {
    return <div className='dropdown'>
      <button
        className="btn btn-default"
        onClick={this.toggleList}
        type='button'
        >
        <span
          className="glyphicon glyphicon-align-justify"
          style={this.activeBtnColor()}
          >
        </span>
      </button>
      <ul className="dropdown-menu dropdown-menu-right"
          style={(this.state.clicked) ? this.listStyles.showList : this.listStyles.hideList}
        >
        <li><a href="#">Links</a></li>
        <li><a href="#">Will</a></li>
        <li><a href="#">Go</a></li>
        <li><a href="#">Here</a></li>
      </ul>
    </div>
  },
  toggleList: function() {
    if(!(this.state.clicked)) {
      this.setState({clicked: true});
    }
    else {
      this.setState({clicked: false});
    }
  },
  activeBtnColor: function() {
    if(this.state.clicked) {
      return this.listStyles.activeBtn;
    }
  }
});


var React = require('react');
var HeaderDropdown = require('./hdr-dropdown.jsx');

module.exports = React.createClass({
  render: function() {
    return <div className='page-header'>
      <h1>Ornament Test</h1>
      <HeaderDropdown />
    </div>
  }
});

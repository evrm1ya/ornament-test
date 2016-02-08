
var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./components/header/header.jsx');
var OrnamentDisplay = require('./components/ornament_display/ornament-display.jsx');

var rootURL = "https://ornament-test.firebaseIO.com/";

var App = React.createClass({
  mixins: [ReactFire],
  componentWillMount: function() {
    this.userComments = new Firebase(rootURL + "comments/");
  },
  render: function() {
    return <div className='ornament-test-app'>
      <Header />
      <main>
        <OrnamentDisplay />
      </main>
    </div>
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.ornament-app-container'));

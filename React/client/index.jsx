const {
  RouteHandler
} = ReactRouter;

const {
  AppBar,
  RaisedButton
} = mui;

injectTapEventPlugin();
ThemeManager = new mui.Styles.ThemeManager();

App = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState: function () {
    return {
      selectedPlayerId: null  
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getMeteorData() {
    return {
      players: Players.find({}, { sort: { score: -1, name: 1 } }).fetch()
    }
  },

  render() {
    return (
      <div className="outer">
        <AppLeftNav ref="leftNav"/>
        <div className="content">
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more" 
            onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}/>
          <RouteHandler/>
        </div>
      </div>
    )
  },

  _onLeftIconButtonTouchTap () {
    this.refs.leftNav.toggle()
  }
})

Meteor.startup(function () {
  var WebFontConfig = {
    google: { families: [ 'Roboto:400,300,500:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  injectTapEventPlugin();
});

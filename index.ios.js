var React = require("react");
var ReactNative = require("react-native");
var {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  Navigator
} = ReactNative;
var realm = require('./src/class');
var Home = require('./src/home');
var Signup = require('./src/signup');
var ROUTES = {
  home: Home,
  signup: Signup
}

//Component
var Gains = React.createClass({
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name]; // ROUTES['signin'] => Signin
    return <Component route={route} navigator={navigator} />;
  },
  render: function() {
    var route
    if (realm.objects('User').length > 0) {
      route = 'home'
    } else { route = 'signup'}

    // realm.write(() => {
    //    realm.delete(realm.objects('User')); // Deletes all users
    // });
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: route}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('gains', ()=>Gains);
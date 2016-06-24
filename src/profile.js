var ReactNative = require('react-native');
var React = require('react');
var Header = require('./common/header');
var {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput
} = ReactNative;

var Button = require('./common/button');
var realm = require('./database/class');
var search = require('./common/search');

module.exports = React.createClass({
  getInitialState: function() {
    var user = realm.objects('User')[0];
    return {
      edit: false,
      name: user.name,
      age: user.age,
      height: user.height,
      weight: user.weight
    }
  },
  render: function() {
    var user = realm.objects('User')[0];
    var currentSeries = search.findLastElement(user.series) ? search.findLastElement(user.series) : null;

    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          {this.renderProfile()}

          <View style={styles.seriesWrapper}>
            <Text style={styles.h2}>Current Series</Text>
            {this.renderCurrentSeries(currentSeries)}
            <Button
              text={this.seriesButton()}
              style={styles.button}
              onPress={() => this.props.changeState()} />
          </View>
        </View>
      </View>
    );
  },
  onEditProfilePress: function() {
    if (isNaN(this.state.age) || isNaN(this.state.height)  || isNaN(this.state.weight) || this.state.age === '' || this.state.height === '' || this.state.weight === '' ) {

      return <Text>Check Fields</Text>
    } else {
      var user = realm.objects('User')[0];
      realm.write(() => {
        user.name = this.state.name;
        user.age = parseInt(this.state.age);
        user.height = parseInt(this.state.height);
        user.weight = parseInt(this.state.weight);
      });
    }
    return  <Button
            text={'Save'}
            style={styles.button}
            onPress={() => this.setState({edit: !this.state.edit})} />
  },
  onEditSaveProfilePress: function() {
    return  <Button
            text={'Edit'}
            style={styles.button}
            onPress={() => this.setState({edit: !this.state.edit})} />
  },
  renderProfile: function() {
    if(this.state.edit) {
      return <View style={styles.profile}>
        <Text style={styles.h2}>Edit Profile</Text>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.userInfo}>Name: </Text>
            <Text style={styles.userInfo}>Age: </Text>
            <Text style={styles.userInfo}>Height(inches): </Text>
            <Text style={styles.userInfo}>Weight(lbs):  </Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              value={this.state.name}
              returnKeyType='done'
              onChangeText={(text) => this.setState({name: text})}/>

            <TextInput
              style={styles.input}
              value={this.state.age.toString()}
              keyboardType='numeric'
              returnKeyType='done'
              onChangeText={(text) => this.setState({age: text})}/>

            <TextInput
              style={styles.input}
              value={this.state.height.toString()}
              keyboardType='numeric'
              returnKeyType='done'
              onChangeText={(text) => this.setState({height: text})}/>

            <TextInput
              style={styles.input}
              value={this.state.weight.toString()}
              keyboardType='numeric'
              returnKeyType='done'
              onChangeText={(text) => this.setState({weight: text})}/>
          </View>
        </View>
        {this.state.edit? this.onEditProfilePress() : this.onEditSaveProfilePress()}
      </View>
    } else {
      return <View style={styles.profile}>
        <Text style={styles.h2}>Profile</Text>
        <Text style={styles.userInfo}>Name: {this.state.name}</Text>
        <Text style={styles.userInfo}>Age: {this.state.age}</Text>
        {this.convertInchesToHeight(this.state.height)}
        <Text style={styles.userInfo}>Weight(lbs): {this.state.weight}</Text>
        {this.state.edit? this.onEditProfilePress() : this.onEditSaveProfilePress()}
      </View>
    }
  },
  renderCurrentSeries: function(series){
    if (series && series.completed === false){
      return(
        <View style={styles.workoutWrapper}>
          <Text style={styles.pic}></Text>
          <View style={styles.workoutDetails}>
            <Text style={styles.workoutInfo}>Name: {series.name}</Text>
            <Text style={styles.workoutInfo}>Day: {series.currentDay}</Text>
          </View>
        </View>
      )
    }
    else{
      return(
        <View style={styles.workoutWrapper}>
          <View style={styles.workoutDetails}>
            <Text style={styles.workoutInfo}>You are currently not working on anything</Text>
          </View>
        </View>
      )
    }
  },
  seriesButton: function() {
    var user = realm.objects('User')[0];
    var buttonText = user.series ? 'Edit Series' : 'Start a Series';
    return buttonText;
  },
  convertInchesToHeight: function(height) {
    var inches = height % 12;
    var feet = parseInt(height / 12);
    return <Text style={styles.userInfo}>Height: {feet}'{inches}"</Text>
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29292B'
  },
  body: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    flex: 3,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'green',
    alignSelf: 'stretch',
    paddingLeft: 25
  },
  h2: {
    fontSize: 24,
    textDecorationLine: 'underline',
    color: '#E0DFE4',
    marginBottom: 5
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 15,
    color: '#E0DFE4',
  },
  seriesWrapper: {
    flex: 4,
    alignSelf: 'stretch',
    paddingLeft: 25,
    paddingTop: 30,
    borderWidth: 3,
    borderColor: 'yellow'
  },
  workoutWrapper: {
    flexDirection: 'row'
  },
  pic: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: 'green'
  },
  workoutDetails: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    paddingLeft: 5
  },
  workoutInfo: {
    fontSize: 18,
    color: '#E0DFE4'
  },
  button: {
    borderWidth: 2,
    height: 40,
    width: 200,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 5,
    marginBottom: 5,
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    color: 'black',
    backgroundColor: 'white'
  }
});
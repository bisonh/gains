var React = require("react");
var ReactNative = require("react-native");
var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} = ReactNative;
var realm = require('../database/class');

module.exports = React.createClass({
  render: function(){
    return (
      <View style={styles.container}>

        <View style={styles.logo}>
          <Text>Header / logo goes here</Text>
        </View>

        <View style={styles.header}>
            <Text style={styles.headerText}>Current</Text>
        </View>

        <TouchableHighlight style={styles.seriesWrapper} onPress={this.currentWorkoutPress} underlayColor="black">
          <View style={{flexDirection: 'row'}}>
            {this.returnCurrentSeries()}
          </View>
        </TouchableHighlight>

        <View style={styles.header}>
            <Text style={styles.headerText}>Previous</Text>
        </View>

        <TouchableHighlight style={[styles.seriesWrapper,{marginBottom: 50}]} onPress={this.previousWorkoutPress} underlayColor="black">
          <View style={{flexDirection: 'row'}}>
            {this.returnPreviousSeries()}
          </View>
         </TouchableHighlight>
      </View>
    )
  },
  currentWorkoutPress: function() {
    { this.props.navigator.push({ name: 'workoutLogs' }); }
  },
  previousWorkoutPress: function() {
    { this.props.navigator.push({ name: 'previousWorkoutLogs' }); }
  },
  returnCurrentSeries: function() {
    var mostRecentSeriesInd = realm.objects('Series').length - 1
    var currentSeries = realm.objects('Series')[mostRecentSeriesInd]
    if (currentSeries && currentSeries.completed == false){
      return (
        <View style={styles.seriesDetail}>
          <Text style={styles.seriesPic}>PIC</Text>
          <Text style={styles.seriesNameText}>{currentSeries.name}</Text>
        </View>
      )
    }
    else{
      return <Text>You are currently not working on anything.</Text>
    }
  },
  returnPreviousSeries: function() {
    if (realm.objects('Series').length === 1) { return };

    var mostPreviousSeriesInd = realm.objects('Series').length - 2
    var previousSeries = realm.objects('Series')[mostPreviousSeriesInd]
    if (previousSeries && previousSeries.completed == true){
      return (
        <View style={styles.seriesDetail}>
          <Text style={styles.seriesPic}>PIC</Text>
          <Text style={styles.seriesNameText}>{previousSeries.name}</Text>
        </View>
      )
    }
    else{
      return <Text>You have not completed a series yet</Text>
    }
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'blue',
    alignSelf: 'stretch'
  },
  seriesWrapper: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    alignSelf: 'stretch',
  },
  header: {
    flex: 1.5,
    borderWidth: 2,
    alignSelf: 'stretch'
  },
  headerText: {
    fontSize: 40,
    paddingLeft: 10
  },
  seriesPic: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: 'green',
    marginRight: 10
  },
  seriesDetail: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  seriesNameText: {
    fontSize: 30
  }
});
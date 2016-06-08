var React = require('react-native');
var {
  AppRegistry,
  MapView,
  View,
  Text,
  StyleSheet
} = React;
const Realm = require('realm');

class intObject{}
intObject.schema = {
  name: 'intObject',
  properties: {
    value: 'int',
  }
};

class User {}
User.schema = {
  name:'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    password: {type: 'string', optional: true},
    age: {type: 'int', optional: true},
    height: {type: 'int', optional: true},
    weight: {type: 'int', optional: true},
    series: {type: 'list', objectType: 'Series'},
  },
};

class Series {}
Series.schema = {
  name: 'Series',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    categories: {type: 'list', objectType: 'Category'},
    maxes: {type: 'list', objectType: 'Max'},
    workouts: {type: 'list', objectType: 'Workout'},
  },
};

class Category {}
Category.schema = {
  name: 'Category',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
  }
};

class Max {}
Max.schema = {
  name: 'Max',
  primaryKey: 'id',
  properties: {
    id: 'int',
    exercise: 'Exercise',
    maxWeight: 'int',
  }
};

class Exercise {}
Exercise.schema = {
  name: 'Exercise',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
  }
};

class Workout {}
Workout.schema = {
  name: 'Workout',
  primaryKey: 'id',
  properties: {
    id: 'int',
    week: 'int',
    day: 'int',
    exercises: {type: 'list', objectType: 'Exercise'},
    set: {type: 'list', objectType: 'intObject'},
    reps: {type: 'list', objectType: 'intObject'},
    weight: {type: 'list', objectType: 'intObject'},
  }
};

var realm = new Realm({
  schema: [intObject, User, Series, Category, Max, Exercise, Workout],
  schemaVersion: 1,
});

module.exports = realm;
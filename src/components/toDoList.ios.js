/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';


import Firebase from 'react-native-firebase';


import {
  TextInput,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  View
} from 'react-native';


const app = new Firebase('https://todolistrn.firebaseio.com/');
let Items = [];
let currentItems = [];
const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0'
  },
  header: {
    flex: 0.1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D32F2F'
  },
  inputBox: {
    flex: 0.1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    padding: 20
  },
  listContainer: {
    flex: 0.3,
    padding: 10
  },
  button: {
    height: 80,
    margin: 5,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white'
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    margin: 10
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  instructions: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = app.child('items');
    this.state = {
      toDoItems: '',
      listView: ''
    };
  }
  componentWillMount() {
    currentItems = [];
    Items = [];
    const itemKey = String(this.props.userData.password.email);
    AsyncStorage.getItem(itemKey, (err, result) => {
      if (result) {
        Items = JSON.parse(result);
        Items.map((item, index) => {
          return currentItems.push(
            <TouchableHighlight
              style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#212121' }}
              underlayColor="#D32F2F"
              onPress={this.deleteItem.bind(this,index)}
            >
              <Text>
               {item}
              </Text>
            </TouchableHighlight>
        );
        });
        this.setState({ toDoItems: currentItems });
      }
    });
  }

  componentWillUnMount() {
    Items = [];
    currentItems = [];
  }

  deleteItem = (delIndex) => {
    currentItems = [];
    Items.splice(delIndex, 1);
    Items.map((item, index) => {
      return currentItems.push(
        <TouchableHighlight
          style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor:'#212121' }}
          underlayColor="#D32F2F"
          onPress={this.deleteItem.bind(this,index)}
        >
          <Text>
          {item}
          </Text>
        </TouchableHighlight>
    );
    });
    this.setState({ toDoItems: currentItems });
  };
  addItem = () => {
    currentItems = [];
    if (this.state.text) {
      Items.push(this.state.text);
      Items.map((item, index) => {
        return currentItems.push(
          <TouchableHighlight
            style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor:'#212121' }}
            underlayColor="#D32F2F"
            onPress={this.deleteItem.bind(this,index)}
          >
            <Text>
            {item}
            </Text>
          </TouchableHighlight>);
      });
      this.setState({ toDoItems: currentItems });
    } else {
      alert("Enter an Item");
    }
  };

  saveItem = () => {
    let itemKey = this.props.userData.password.email;
    if (Items) {
      AsyncStorage.setItem(String(itemKey), JSON.stringify(Items)).then(() => {
        alert('Data Saved Successfully');
      });
    } else {
      alert("Nothing To Save");
    }
  }
  handleLogOut = () => {
    AsyncStorage.removeItem('user_data').then(() => {
      this.props.navigator.pop();
    });
  };

  render() {
    return (
      <View style={homeStyles.container}>
        <ScrollView>
          <View style={homeStyles.header}>
            <Text style={homeStyles.welcome}>
             To Do List
            </Text>
          </View>
          <View style={homeStyles.inputBox}>
            <Text>Hi, To add an item press add, to delete an item just tap on an item, press save to save the data</Text>
            <TextInput
              onChangeText={(text) => this.setState({ text })}
              placeholder="Enter the Item and Press Add Item"
              style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
              value={this.state.text}
            />
          </View>
          <View style={homeStyles.buttonContainer}>
            <TouchableHighlight
              onPress={this.addItem}
              style={[homeStyles.button, { backgroundColor: '#D32F2F' }]}
              underlayColor="red"
            >
              <Text style={homeStyles.label}>Add</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.saveItem}
              style={[homeStyles.button, { backgroundColor: '#D32F2F' }]}
              underlayColor="red"
            >
              <Text style={homeStyles.label}>Save</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handleLogOut}
              style={[homeStyles.button, { backgroundColor: '#D32F2F' }]}
              underlayColor="red"
            >
              <Text style={homeStyles.label}>Logout</Text>
            </TouchableHighlight>
          </View>
          <View style={homeStyles.listContainer}>
            {this.state.toDoItems ? this.state.toDoItems : <View /> }
          </View>
        </ScrollView>
      </View>
    );
  }
}

module.exports = HomePage;

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
  Image,
  AsyncStorage,
  ActivityIndicatorIOS,
  Dimensions,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

const { width } = Dimensions.get('window');
const app = new Firebase('https://todolistrn.firebaseio.com/');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#D32F2F'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 100
  },
  label: {
    fontSize: 18,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  button: {
    flex: 1,
    padding: 10,
    height: 40,
    marginTop: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white'
  }
});

import HomeScreen from './toDoList.ios.js';
import SignUp from './signUp.ios.js';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    };
  }


  goToHomeScreen = () => {
    this.setState({ loading: true });
    app.authWithPassword({
      "email": this.state.email,
      "password": this.state.password
    }, (error, userData) => {
      if (error) {
        this.setState({ loading: false });
        alert('Login Failed. Please try again');
      } else {
        AsyncStorage.setItem('user_data', JSON.stringify(userData));
        this.setState({ loading: false });
        this.props.navigator.push({
          component: HomeScreen,
          passProps: {
            userData
          }
        });
      }
    });
    this.setState({ email: '', password: '' });
  };

  goToSignUp = () => {
    this.props.navigator.push({
      title: 'signup',
      component: SignUp,
    });
  };

  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/appIcon.png')}
            style={{ height: 150, width: 150, resizeMode: 'contain' }}
          >
          </Image>
        </View>
        <View>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            controlled
            keyboardType="email-address"
            onChangeText={(text) => this.setState({ email: text })}
            placeholder="Enter Your Email Address"
            placeholderTextColor="white"
            selectionColor="white"
            style={{ height: 40, borderColor: 'white', borderWidth: 1 }}
            value={this.state.email}
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            controlled
            onChangeText={(text) => this.setState({ password: text })}
            placeholder="Enter Password"
            placeholderTextColor="white"
            secureTextEntry
            selectionColor="white"
            style={{ height: 40, borderColor: 'white', borderWidth: 1 }}
            value={this.state.password}
          />
          <TouchableOpacity
            onPress={this.goToHomeScreen}
            style={styles.button}
          >
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Login</Text>
          </TouchableOpacity>
          <Text
            onPress={this.goToSignUp}
            style={{ textAlign: 'center',
            color: 'white', marginTop: 10, textDecorationLine: 'underline',
            textDecorationColor: 'white' }}
          >
            New Users SignUp Here
          </Text>
          <ActivityIndicatorIOS
            animating={this.state.loading}
            color="white"
            size="small"
          />
        </View>
      </View>
    );
  }
}

module.exports = LoginPage;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Firebase from 'react-native-firebase';


import {
  TextInput,
  StyleSheet,
  Image,
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
    backgroundColor: '#43A047'
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


class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    };
  }

  handleSignUp = () => {
    this.setState({ loading: true });
    app.createUser({
      'email': this.state.email,
      'password': this.state.password
    }, (error, userData) => {
      if (error) {
        switch (error.code) {
        case 'EMAIL_TAKEN':
          alert("The new user account cannot be created because the email is already in use.");
          break;
        case 'INVALID_EMAIL':
          alert("The specified email is not a valid email.");
          break;
        default:
          alert("Error creating user:");
        }

      } else {
        this.setState({ loading: false });
        alert('Your account was created!');
        this.goToLoginScreen();
      }
      this.setState({
        email: '',
        password: '',
        loading: false
      });
    });
  };

  goToLoginScreen = () => {
    this.props.navigator.pop();
  };


  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/appIcon.png')}
            style={{ height: 150, width: 150, resizeMode: 'contain' }}
          />
        </View>
        <View>
          <Text style={styles.label}>UserName:</Text>
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
          <TouchableOpacity style={styles.button} onPress={this.handleSignUp.bind(this)}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>SignUp</Text>
          </TouchableOpacity>
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

module.exports = SignUpPage;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS
} from 'react-native';


import LoginPage from './src/components/loginPage.ios.js';
class CheckList extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{ component: LoginPage, title: 'LoginPage' }}
        navigationBarHidden={!false}
        ref="nav"
        style={{ flex: 1 }}
      />
    );
  }
}

AppRegistry.registerComponent('CheckList', () => CheckList);

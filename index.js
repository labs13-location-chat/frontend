/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux'
import configureStore from './src/store/configStore'
import React from 'react'


console.disableYellowBox = true;

const store = configureStore()

const ReduxChat = () => <Provider store={store}><App /></Provider>



AppRegistry.registerComponent(appName, () => ReduxChat);

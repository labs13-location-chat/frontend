import React from 'react';

import Landing from '../components/Landing';
import Login from './Authenticate/Login';
import Register from './Authenticate/Register';

import {
    createAppContainer,
    createStackNavigator,
} from 'react-navigation';

const AuthNav = createStackNavigator({
    // 'Landing': { screen: Landing },
    'Log in': { screen: Login },
    'Register': { screen: Register }
})

const AuthContainer = createAppContainer(AuthNav);
export default AuthContainer;
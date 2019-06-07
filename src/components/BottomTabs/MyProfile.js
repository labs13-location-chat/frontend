import React from 'react';

import {
    View,
    Text,
} from 'react-native';

export default class MyProfile extends React.Component {
    static navigationOptions = {
        title: 'My Profile',
        headerTransparent: true,
    }
    
    render() {
        return(
            <View>
                <Text>Profile Screen</Text>
            </View>
        )
    }
}
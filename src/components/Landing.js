import React from 'react';

import {
    View,
    Text,
    AsyncStorage,
    Button,
} from 'react-native';

export default class Landing extends React.Component {
    signOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {
        return(
            <View>
                <Text>Landing Screen</Text>
                <Button 
                    title="Sign Out"
                    onPress={this.signOut}
                />
            </View>
        )
    }
}
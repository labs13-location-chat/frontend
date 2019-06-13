import React from 'react';

import {
    View,
    Text,
    AsyncStorage,
    Button,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

export default class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state= {};
    }
    static navigationOptions = {
        title: 'Settings',
    }

    chooseFile = () => {
        const options = {
            title: 'Select Photo',
            // customButtons: [{ name: 'gallery', title: 'Choose an Image from your Gallery' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response)
            if (response.didCancel) {
                console.log('User canceled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                });
            }
        })
    }

    signOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {
        // const user = this.props.navigation.getParam('user')
        console.log("settings",this.props)
        return(
            <View>
                <Text>Settings Screen</Text>
                {/* <Text>Hello {this.props.navigation.state.params.user.first_name}</Text> */}
                <Button 
                    title="Sign Out"
                    onPress={this.signOut}
                />
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('MyProfile')}}>
                    <View>
                        <Text>My Profile</Text>
                    </View>
                </TouchableOpacity>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
                    <Image
                        source={this.state.avatarSource}
                        style={{width: 300, height: 300}}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})
import React from 'react';

import {
    View,
    Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
export default class Camera extends React.Component {
    constructor(props) {
        super(props);
        // this.cameraLaunch();
        this.state= {};
    }

    componentWillMount = () => {
        this.cameraLaunch();
    }

    cameraLaunch = () => {
        const options = {
            // title: 'Select Photo',
            // customButtons: [{ name: 'gallery', title: 'Choose an Image from your Gallery' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
    
        ImagePicker.launchCamera(options, (response) => {
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
    
    render() {
        return(
                <View style={{flex:1, alignItems:'stretch'}}>
                    <Image
                        source={this.state.avatarSource}
                        style={{flex: 1}}
                    />
                </View>
        )
    }
}
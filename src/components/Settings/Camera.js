import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Photo',
    customButtons: [{ name: 'gallery', title: 'Choose an Image from your Gallery' }],
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
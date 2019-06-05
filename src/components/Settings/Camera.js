// import ImagePicker from 'react-native-image-picker';
// export default class Camera extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state= {};
//     }

// const options = {
//     title: 'Select Photo',
//     customButtons: [{ name: 'gallery', title: 'Choose an Image from your Gallery' }],
//     storageOptions: {
//         skipBackup: true,
//         path: 'images',
//     },
// };

// ImagePicker.showImagePicker(options, (response) => {
//     console.log('Response = ', response)
//     if (response.didCancel) {
//         console.log('User canceled image picker')
//     } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//     } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//     } else {
//         const source = { uri: response.uri };
//         this.setState({
//             avatarSource: source,
//         });
//     }
// })
    // // Launch Camera:
    // ImagePicker.launchCamera(options, (response) => {
    // // Same code as in above section!
    // });

    // // Open Image Library:
    // ImagePicker.launchImageLibrary(options, (response) => {
    // // Same code as in above section!
    // });
    // render() {
    //     return(
    //             <View style={{alignItems: 'center', justifyContent: 'center'}}>
    //                 <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
    //                 <Image
    //                     source={this.state.avatarSource}
    //                     style={{width: 300, height: 300}}
    //                 />
    //             </View>
    //     )
    // }
// }
import React from 'react';

import {
	View,
	Text,
	AsyncStorage,
	Button,
	TouchableOpacity,
	Image,
	StyleSheet
} from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';

export default class Setting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',

			user: []
		};
	}
	static navigationOptions = {
		title: 'Settings'
	};

	componentDidMount() {
		axios
			.get(`https://labs13-localchat.herokuapp.com/api/users/`)
			.then(res => {
				console.log('users did mount:', res.data);

				this.setState({
					user: res.data
				});
			})
			.catch(err => {
				console.error(err);
			});
	}

	// chooseFile = () => {
	// 	const options = {
	// 		title: 'Select Photo',
	// 		// customButtons: [{ name: 'gallery', title: 'Choose an Image from your Gallery' }],
	// 		storageOptions: {
	// 			skipBackup: true,
	// 			path: 'images'
	// 		}
	// 	};
	// 	ImagePicker.showImagePicker(options, response => {
	// 		console.log('Response = ', response);
	// 		if (response.didCancel) {
	// 			console.log('User canceled image picker');
	// 		} else if (response.error) {
	// 			console.log('ImagePicker Error: ', response.error);
	// 		} else if (response.customButton) {
	// 			console.log(
	// 				'User tapped custom button: ',
	// 				response.customButton
	// 			);
	// 		} else {
	// 			const source = { uri: response.uri };
	// 			this.setState({
	// 				avatarSource: source
	// 			});
	// 		}
	// 	});
	// };

	// fetchUser = async () => {
	// 	const first = await AsyncStorage.getItem('firstname');
	// 	const last = await AsyncStorage.getItem('lastname');
	// 	const useremail = await AsyncStorage.getItem('email');
	// 	// console.log(first, last, useremail);
	// 	this.setState({
	// 		firstname: first,
	// 		lastname: last,
	// 		email: useremail
	// 	});
	// };

	signOut = async () => {
		const { user } = this.state;

		this.setState({
			user: undefined
		});
		this.props.navigation.navigate('Login');
	};

	render() {
		const { firstname, lastname } = this.state;
		return (
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={{
						uri:
							'https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png'
					}}
				/>
				<Text style={styles.name}>{`${firstname} ${lastname}`}</Text>
				<View style={styles.display}>
					<TouchableOpacity
						style={styles.touch}
						onPress={() => {
							this.props.navigation.navigate('MyProfile');
						}}
					>
						<View>
							<Text>Profile</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.touch}
						onPress={() => {
							this.props.navigation.navigate('MenuSettings');
						}}
					>
						<View>
							<Text>Settings</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.touch}
						onPress={() => {
							this.props.navigation.navigate('Notifications');
						}}
					>
						<View>
							<Text>Notifications</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.touch}
						onPress={this.signOut}
					>
						<View>
							<Text style={styles.logout}>Logout</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={styles.button}>
					{/* <Button
						title='Choose File'
						onPress={this.chooseFile.bind(this)}
					/>
					<Image
						source={this.state.avatarSource}
						style={{ width: 300, height: 300 }}
                    /> */}
					{/* <Button title='Logout' onPress={this.signOut} /> */}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flexDirection: 'row',
		top: 50,
		flex: 1,
		// flexDirection: 'row',
		alignItems: 'center'
		// justifyContent: 'center'
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	display: {
		marginTop: 100,
		alignItems: 'flex-start'
	},
	touch: {
		width: 300,
		paddingVertical: 20,
		borderBottomWidth: 1,
		fontSize: 16
	},
	name: {
		fontSize: 20
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20
	},
	logout: {
		color: 'red'
	}
});

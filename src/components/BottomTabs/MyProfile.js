import React from 'react';

import {
	View,
	Text,
	TextInput,
	StyleSheet,
	CheckBox,
	Image,
	TouchableWithoutFeedback,
	TouchableOpacity,
	AsyncStorage,
	Button
} from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import DismissKeyboard from 'dismissKeyboard';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const URL = 'https://labs13-localchat.herokuapp.com';

export default class MyProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},

			first_name: '',
			phone_num: '',

			photo: null,
			anonymous: null,
			edit: 'Edit'
		};
	}

	componentDidMount() {
		const user_id = this.props.navigation.state.params.id;
		this.getUser(user_id);
		// this.props.navigation.setParams({
		// 	editButton: this.editButton
		// });
		console.log('hi');
	}

	static navigationOptions = ({ navigation }) => {
		// const { params = {} } = navigation.state;
		// const { edit } = this.state;
		return {
			headerLeft: (
				<TouchableOpacity title='Edit Profile' color='#3EB1D6'>
					<View>
						<Text style={{ color: '#fff', marginLeft: 20 }}>
							Edit Profile
						</Text>
					</View>
				</TouchableOpacity>
			),
			headerTransparent: true,
			headerRight: (
				<TouchableOpacity
					onPress={() => {}}
					title='Save'
					color='#3EB1D6'
				>
					<View>
						<Text style={{ color: '#fff', marginRight: 20 }}>
							Edit
						</Text>
					</View>
				</TouchableOpacity>
			)
		};
	};

	// editButton = () => {
	// 	const { edit } = this.state;
	// 	this.setState({
	// 		edit: 'Save'
	// 	});
	// };

	handleNameChange = value => {
		console.log('value change:', this.state);

		this.setState({
			first_name: value
		});
	};

	handleNumChange = value => {
		console.log('value change:', this.state);

		this.setState({
			phone_num: value
		});
	};

	// handleAnonChange = value => {
	// 	console.log('value change:', this.state.anonymous);

	// 	this.setState({
	// 		anonymous: value
	// 	});
	// };

	anonymousCheck = () => {
		console.log('anonymous:', !this.state.anonymous);
		const val = !this.state.anonymous;
		this.setState({ anonymous: val });
	};
	// anonymousCheck = () => {
	// 	if (this.state.user.anonymous === true) {
	// 		this.setState({
	// 			user: {
	// 				anonymous: false
	// 			}
	// 		});
	// 	} else {
	// 		this.setState({
	// 			user: {
	// 				anonymous: true
	// 			}
	// 		});
	// 	}
	// 	console.log('anonymous:', this.state.user.anonymous);
	// };

	chooseFile = () => {
		const options = {
			title: 'Select Photo',
			// customButtons: [{ name: 'gallery', title: 'Choose an Image from your Gallery' }],
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		ImagePicker.showImagePicker(options, response => {
			console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User canceled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else {
				const source = { uri: response.uri };
				this.setState({
					photo: source
				});
			}
		});
	};

	updateUser = updatedUser => {
		const user_id = this.props.navigation.state.params.id;

		axios
			.put(`${URL}/api/users/${user_id}`, updatedUser)
			.then(res => {
				if (res.status === 200) {
					alert('Update Successful');
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	handleUpdate = e => {
		e.preventDefault();
		const updatedUser = {
			first_name: this.first_name(),
			last_name: this.state.user.last_name,
			email: this.state.user.email,
			phone_num: this.phone_num(),
			anonymous: this.state.user.anonymous,
			// anonymous: this.anonymous(),
			user_type: this.state.user.user_type,
			photo: this.state.user.photo
		};
		this.updateUser(updatedUser);
	};

	getUser = () => {
		console.log('getUser');
		const user_id = this.props.navigation.state.params.id;
		axios
			.get(`${URL}/api/users/${user_id}`)
			.then(res => {
				this.setState({
					user: res.data[0]
				});
				console.log(this.state.user);
			})
			.catch(err => {
				console.log(err);
			});
	};

	first_name = () => {
		if (this.state.first_name.length === 0) {
			return this.state.user.first_name;
		} else return this.state.first_name;
	};
	phone_num = () => {
		if (this.state.phone_num.length === 0) {
			return this.state.user.phone_num;
		} else return this.state.phone_num;
	};
	anonymous = () => {
		if (this.state.anonymous) {
			return this.state.user.anonymous;
		} else return this.state.anonymous;
	};

	render() {
		console.log(this.state.first_name);
		const { photo, anonymous } = this.state;
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					DismissKeyboard();
				}}
			>
				<View style={styles.container}>
					<View style={styles.imageDisplay}>
						<Image
							style={styles.image}
							source={
								this.state.photo ? (
									{ uri: photo.uri }
								) : (
									{
										uri:
											'https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png'
									}
								)
							}
						/>
						<Text
							onPress={this.chooseFile.bind(this)}
							style={styles.imageEdit}
						>
							Update
						</Text>
					</View>
					<View style={styles.display}>
						<View
						// style={styles.display}
						>
							<Text style={styles.text}>Name</Text>
							<TextInput
								style={styles.inputBox}
								onChangeText={this.handleNameChange}
								name='first_name'
							/>
							<Text style={styles.text}>Phone Number</Text>
							<TextInput
								style={styles.inputBox}
								keyboardType='phone-pad'
								name='phone_num'
								onChangeText={this.handleNumChange}
							/>
							<Text style={styles.text}>Anonymous</Text>
							<CheckBox onValueChange={this.anonymousCheck} />
						</View>
						{/* <KeyboardSpacer /> */}
						<TouchableOpacity title='Logout' onPress={this.signOut}>
							<View>
								<Text style={{ color: '#3EB1D6' }}>Logout</Text>
							</View>
						</TouchableOpacity>
						{/* <Button
							style={{ backgroundColor: '#3EB1D6' }}
							title='Save'
							onPress={this.handleUpdate}
						/> */}
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flexDirection: 'row',
		top: 75
		// flex: 4
		// flexDirection: 'row',
		// alignItems: 'center'
		// justifyContent: 'center'
	},
	imageDisplay: {
		flex: 1,
		alignItems: 'center'
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 100,
		alignItems: 'center'
	},
	display: {
		marginTop: 175,
		marginLeft: 30
		// alignItems: 'flex-start'
	},
	imageEdit: {
		position: 'absolute',
		fontSize: 20,
		marginTop: 95,
		backgroundColor: 'rgba(244, 244, 244, 0.5)',
		// backgroundColor: 'red',
		width: 140,
		height: 50,
		// paddingHorizontal: 25,
		// paddingVertical: 10,
		textAlign: 'center',
		borderBottomLeftRadius: 100,
		borderBottomRightRadius: 100
	},
	text: {
		// marginTop: 10,
		width: 300
		// backgroundColor: '#f4f4f4',
		// borderColor: '#f4f4f4',
		// paddingHorizontal: 20,
		// padding: 10
	},
	inputBox: {
		width: 320,
		borderBottomWidth: 1,
		fontSize: 16
	}
});

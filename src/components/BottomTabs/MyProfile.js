import React from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	CheckBox,
	Image,
	ScrollView,
	TouchableWithoutFeedback,
	TouchableOpacity,
	AsyncStorage,
	Button,
	Platform
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import Icon4 from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-picker';
import DismissKeyboard from 'dismissKeyboard';
import KeyboardSpacer from 'react-native-keyboard-spacer';
// import { ScrollView } from 'react-native-gesture-handler';

const URL = 'https://labs13-localchat.herokuapp.com';

export default class MyProfile extends React.Component {
	constructor(props) {
		super(props);
		// this.fetchUser();
		this.state = {
			user: {},
			id: '',

			first_name: '',
			phone_num: '',
			email: '',
			photo: '',
			edit: true
		};
	}

	componentDidMount() {
		// const user_id = this.state;
		this.getUser();
		this.props.navigation.setParams({
			handleSave: this.handleUpdate,
			keyboardShown: false
			// 	editButton: this.toggleEditButton
		});
	}

	static navigationOptions = ({ navigation, screenProps }) => {
		const { params = {} } = navigation.state;
		return {
			// headerTitle: 'Profile',
			headerLeft: (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('JoinChat');
					}}
					color='#3EB1D6'
				>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center'
						}}
					>
						<Icon3 name='arrow-left' size={20} color='#fff' />
						<Text
							style={{
								color: '#fff',
								marginLeft: 20
							}}
						>
							Edit Profile
						</Text>
					</View>
				</TouchableOpacity>
			),
			headerTransparent: true,
			headerRight: (
				<TouchableOpacity
					title='Save'
					onPress={params.handleSave}
					color='#3EB1D6'
				>
					<View>
						<Text style={{ color: '#fff', marginRight: 20 }}>
							Save
						</Text>
					</View>
				</TouchableOpacity>
			)
		};
	};

	// toggleEditButton = () => {
	// 	this.setState({
	// 		edit: !this.state.edit
	// 	});
	// };

	// editButton = () => {
	// 	// const { edit } = this.state;
	// 	if (this.state.edit) {
	// 		return 'Edit';
	// 	} else {
	// 		return 'Save';
	// 	}
	// };

	handleNameChange = value => {
		this.setState({
			first_name: value
		});
	};

	handleNumChange = value => {
		this.setState({
			phone_num: value
		});
	};
	handleEmailChange = value => {
		this.setState({
			email: value
		});
	};
	handlePhotoChange = () => {
		this.setState({
			photo: this.state.user.photo
		});
	};

	// createFormData = (photo, body) => {
	// 	const data = new FormData();

	// 	data.append('photo', {
	// 		name: photo.fileName,
	// 		type: photo.type,
	// 		uri:
	// 			Platform.OS === 'android'
	// 				? photo.uri
	// 				: photo.uri.replace('file://', '')
	// 	});

	// 	Object.keys(body).forEach(key => {
	// 		data.append(key, body[key]);
	// 	});

	// 	return data;
	// };

	// handleUploadPhoto = () => {
	// 	const user_id = this.props.navigation.state.params.id;
	// 	axios
	// 		.post(
	// 			`${URL}/api/upload`,
	// 			this.createFormData(this.state.photo, { user_id })
	// 		)
	// 		.then(res => {
	// 			console.log(res.data);

	// 			// res.json()
	// 		})
	// 		.then(res => {
	// 			console.log('upload succes', res);
	// 			alert('Upload success!');
	// 			this.setState({ photo: null });
	// 		})
	// 		.catch(err => {
	// 			console.log('upload error', err);
	// 			alert('Upload failed!');
	// 		});
	// };

	chooseFile = () => {
		const options = {
			title: 'Select Photo'
			// storageOptions: {
			// 	skipBackup: true,
			// 	path: 'images'
			// }
		};
		ImagePicker.showImagePicker(options, res => {
			console.log('Response = ', res);
			if (res.didCancel) {
				console.log('User canceled image picker');
			} else if (res.error) {
				console.log('ImagePicker Error: ', res.error);
			} else {
				const source = { uri: res.uri };
				this.setState({
					photo: source
				});
			}
		});
	};

	updateUser = updatedUser => {
		const user_id = this.state.id;

		axios
			.put(`${URL}/api/users/${user_id}`, updatedUser)
			.then(res => {
				if (res.status === 200) {
					alert('Update Successful');
				}
				// AsyncStorage.setItem('anonymous', this.state.user.anonymous);
			})
			.catch(err => {
				console.log(err);
			});
	};

	handleUpdate = e => {
		e.preventDefault();
		const updatedUser = {
			first_name: this.first_name(),
			// last_name: this.state.user.last_name,
			email: this.email(),
			phone_num: this.phone_num(),
			// anonymous: this.state.user.anonymous,
			// user_type: this.state.user.user_type,
			photo: this.photo()
		};
		this.updateUser(updatedUser);
	};

	getUser = async () => {
		// console.log('getUser');
		let userData = await AsyncStorage.getItem("userData");
		let data = JSON.parse(userData);
		// this.setState({
		// 	user: data.id
		// })
		const user_id = data.id;
		axios
			.get(`${URL}/api/users/${user_id}`)
			.then(res => {
				// this.props.screenProps.setUser(res.data[0])
				console.log('res', res.data)
				this.setState({
					id: res.data.id,
					first_name: 
					// this.state.user.first_name,
					res.data.first_name,
					phone_num: 
					// this.state.user.phone_num,
					res.data.phone_num,
					email: 
					// this.state.user.email,
					res.data.email,
					photo: 
					// this.state.user.photo
					res.data.photo
				});
				console.log('getuser firstname', this.state.first_name);
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
		if (this.state.phone_num == null) {
			this.setState({
				phone_num: 0
			});
		} else if (this.state.phone_num.length === 0) {
			return this.state.user.phone_num;
		} else return this.state.phone_num;
	};
	email = () => {
		if (this.state.email.length === 0) {
			return this.state.user.email;
		} else return this.state.email;
	};
	photo = () => {
		if (this.state.photo === null) {
			return this.state.user.photo;
		} else return this.state.photo;
	};

	// signOut = async () => {
	// 	try {
	// 		return await AsyncStorage.getAllKeys()
	// 			.then(AsyncStorage.multiRemove)
	// 			.then(this.props.screenProps.clearState())
	// 			.then(this.props.navigation.navigate("Login"))
	// 	} catch (err) {
	// 		console.log(err)
	// 		return false;
	// 	}
	// 	// try{
			
	// 	// 	AsyncStorage.setItem('userData', 'hamza').then(() => {
	// 	// 		AsyncStorage.getItem('userData').then(user => {
	// 	// 			if(user === 'hamza'){
	// 	// 				this.props.navigation.navigate('Login')
	// 	// 			}
	// 	// 		})
	// 	// 	})
	// 	// } catch(e) {
	// 	// 	console.log(e)
	// 	// }

	// };

	render() {
		const { photo } = this.state;
		console.log('u', this.state)
		console.log('profprops', this.props)
		// let changePhoto = photo === null ? { uri: photo } : { uri: photo.uri };
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
							source={// changePhoto
							{ uri: photo }
							// photo ? { uri: photo.uri } : ''
							}
						/>
						{/* 
						<Text
							onPress={this.chooseFile.bind(this)}
							style={styles.imageEdit}
						>
							Edit
						</Text> */}
					</View>
					<View style={styles.displayContainer}>
						<View style={styles.inputDisplay}>
							<View
							// style={styles.display}
							>
								{/* <Text
								style={{
									width: 300,
									marginLeft: 30,
									fontSize: 16
								}}
							>
								Name
							</Text> */}
								<View
								// style={{
								// 	marginLeft: 30,
								// 	marginRight: 20,
								// 	width: 275,
								// 	marginTop: 15,
								// 	borderBottomWidth: 0.7
								// }}
								/>
								<TextInput
									style={styles.nameInputBox}
									onChangeText={this.handleNameChange}
									name='first_name'
									value={this.state.first_name}
								/>
								<View style={styles.phoneView}>
									<Icon name='phone' size={20} />
									<Text style={styles.text}>
										Phone Number
									</Text>
								</View>
								<View
									style={{
										marginLeft: 30,
										marginRight: 20,
										width: 275,
										marginTop: 15,
										borderBottomWidth: 0.7
									}}
								/>
								<TextInput
									style={styles.inputBox}
									type='tel'
									keyboardType='phone-pad'
									name='phone_num'
									onChangeText={this.handleNumChange}
									value={this.state.phone_num}
								/>

								<View style={styles.emailStyle}>
									<Icon4 name='email' size={20} />
									<Text style={{ marginLeft: 10 }}>
										Email
									</Text>
								</View>
								<View
									style={{
										marginLeft: 30,
										marginRight: 20,
										width: 275,
										marginTop: 15,
										borderBottomWidth: 0.7
									}}
								/>
								<TextInput
									name='email'
									keyboardType='email-address'
									style={styles.inputBox}
									onChangeText={this.handleEmailChange}
									value={this.state.email}
								/>
								{/* <View
								style={{
									marginLeft: 30,
									width: 275,
									marginTop: 15,
									borderBottomWidth: 0.7
								}}
							/> */}
								{/* <TouchableOpacity
									title='Logout'
									onPress={this.signOut}
								>
									<View style={styles.logoutView}>
										<Icon name='logout' size={20} />
										<Text style={styles.logoutText}>
											Logout
										</Text>
									</View>
								</TouchableOpacity> */}
							</View>
							{/* <KeyboardSpacer /> */}
						</View>
						{/* <View
							style={{
								height: 225,
								borderLeftWidth: 6,
								borderLeftColor: '#3EB1D6'
							}}
						/> */}
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		top: 75
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
	imageEdit: {
		position: 'absolute',
		fontSize: 15,
		marginTop: 95,
		backgroundColor: 'rgba(244, 244, 244, 0.5)',
		width: 140,
		height: 50,
		textAlign: 'center',
		borderBottomLeftRadius: 100,
		borderBottomRightRadius: 100
	},
	// displayContainer: {
	// 	// top: 75,
	// 	flex: 1
	// },
	inputDisplay: {
		marginTop: 175,
		marginLeft: 40
	},
	phoneView: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	text: {
		// marginTop: 10,
		width: 300,
		marginLeft: 10,
		// borderBottomWidth: 0.7,
		fontSize: 15
		// backgroundColor: '#f4f4f4',
		// borderColor: '#f4f4f4',
		// paddingHorizontal: 20,
		// padding: 10
	},
	nameInputBox: {
		width: 300,
		marginLeft: 0,
		// borderTopWidth: 0.7,
		marginBottom: 20,
		fontSize: 25
	},
	inputBox: {
		width: 300,
		marginLeft: 30,
		// borderTopWidth: 0.7,
		fontSize: 16
	},
	emailStyle: {
		width: 300,
		// borderBottomWidth: 0.6,
		marginTop: 20,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
		// flexWrap: 'nowrap'
	},
	logoutView: {
		// flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 30
	},
	logoutText: {
		color: '#3EB1D6',
		marginLeft: 10,
		fontSize: 20
	}
});
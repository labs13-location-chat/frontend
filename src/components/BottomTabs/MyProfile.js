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
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import DismissKeyboard from 'dismissKeyboard';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const URL = 'https://labs13-localchat.herokuapp.com';

export default class MyProfile extends React.Component {
	constructor(props) {
		super(props);
		// this.fetchUser();
		this.state = {
			user: {},

			first_name: '',
			phone_num: '',

			photo: '',
			anonymous: null,
			edit: true
		};
	}

	componentDidMount() {
		const user_id = this.props.navigation.state.params.id;
		this.getUser(user_id);

		this.props.navigation.setParams({
			handleSave: this.handleUpdate
			// 	editButton: this.toggleEditButton
		});
		console.log('hi');
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
	CheckBox = () => {
		this.setState({
			user: {
				anonymous: !this.state.user.anonymous
			}
		});
	};

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

	signOut = async ({ navigation, screenProps }) => {
		const { user } = this.state;
		// await AsyncStorage.clear();
		// this.props.navigation.navigate('Login');
		this.setState({
			user: undefined
		});
		this.props.navigation.navigate('Login');
		sb.disconnect(function() {
			// A current user is discconected from SendBird server.
		});
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
								photo ? (
									{ uri: photo.uri + '?' + new Date() }
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
							Edit
						</Text>
					</View>
					<View style={styles.inputDisplay}>
						<View
						// style={styles.display}
						>
							<Text
								style={{
									width: 300,
									marginLeft: 30,
									fontSize: 16
								}}
							>
								Name
							</Text>
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
								style={styles.inputBox}
								onChangeText={this.handleNameChange}
								name='first_name'
							/>
							<View style={styles.phoneView}>
								<Icon name='phone' size={20} />
								<Text style={styles.text}>Phone Number</Text>
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
								keyboardType='phone-pad'
								name='phone_num'
								onChangeText={this.handleNumChange}
							/>
							<View>
								<View style={styles.anonymousStyle}>
									<Icon2 name='user' size={20} />
									<Text style={{ marginLeft: 10 }}>
										Anonymous
									</Text>
									<CheckBox
										style={{
											marginLeft: 30
										}}
										value={this.state.user.anonymous}
										onChange={() => this.CheckBox()}
									/>
								</View>
							</View>
							<View
								style={{
									marginLeft: 30,
									width: 275,
									marginTop: 15,
									borderBottomWidth: 0.7
								}}
							/>
						</View>
						{/* <KeyboardSpacer /> */}
						<TouchableOpacity title='Logout' onPress={this.signOut}>
							<View style={styles.logoutView}>
								<Icon name='logout' size={20} />
								<Text style={styles.logoutText}>Logout</Text>
							</View>
						</TouchableOpacity>
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
	inputDisplay: {
		marginTop: 175,
		marginLeft: 50
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
	inputBox: {
		width: 300,
		marginLeft: 30,
		// borderTopWidth: 0.7,
		fontSize: 16
	},
	anonymousStyle: {
		width: 300,
		// borderBottomWidth: 0.6,
		marginTop: 20,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
		// flexWrap: 'nowrap'
	},
	logoutView: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 80
	},
	logoutText: {
		color: '#3EB1D6',
		marginLeft: 10
	}
});

import React from 'react';

import {
	View,
	Text,
	TextInput,
	StyleSheet,
	CheckBox,
	Image,
	TouchableWithoutFeedback
} from 'react-native';
import DismissKeyboard from 'dismissKeyboard';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class MyProfile extends React.Component {
	static navigationOptions = {
		title: 'Profile',
		headerTransparent: true
	};

	render() {
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					DismissKeyboard();
				}}
			>
				<View style={styles.container}>
					<Image
						style={styles.image}
						source={{
							uri:
								'https://i.kym-cdn.com/photos/images/newsfeed/001/460/439/32f.jpg'
						}}
					/>
					<View style={styles.display}>
						<Text style={styles.text}>Name</Text>
						<TextInput style={styles.inputBox} caretHidden={true} />
						<Text style={styles.text}>Phone Number</Text>
						<TextInput style={styles.inputBox} />
						<Text style={styles.text}>Anonymous</Text>
						<CheckBox />
					</View>
					{/* <KeyboardSpacer /> */}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flexDirection: 'row',
		top: 75,
		flex: 1,
		// flexDirection: 'row',
		alignItems: 'center'
		// justifyContent: 'center'
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 100
	},
	display: {
		marginTop: 50,
		marginLeft: 0,
		alignItems: 'flex-start'
	},
	text: {
		// marginTop: 10,
		width: 300,
		backgroundColor: '#f4f4f4',
		borderColor: '#f4f4f4',
		paddingHorizontal: 20,
		padding: 10
	},
	inputBox: {
		width: 300,
		borderBottomWidth: 1,
		fontSize: 16
	}
});

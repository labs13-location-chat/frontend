// import React, { Component } from 'react'
// import { View, AsyncStorage, Text } from 'react-native'
// import Login from './Login';

// const privateRoute = (Component) => {
//     return class extends React.Component {           
//         state = {
//             user: ''
//         }

//         componentDidMount = () => {
//             this.getUser().then(user => this.setState)
//         }

//         getUser = async () => {
//             const user = await AsyncStorage.getItem('userData')
//             return user
//         }

//         render() {
//             return(
//                 <View>
//                 {this.getUser() ?  <Component {...this.props}/> :   <Login {...this.props}/>    
                    
//                 )}
//                 </View>
//             )

            
            


        
//     }}
// }


// export default privateRoute
# chatmaps
## Contributors

|                                      [Benson Lei](https://github.com/jmtblei)                                     |                                           [John Gibbons](https://github.com/jvgiv)                                             |                                          [Dayton Steinmeyer](https://github.com/DaytonS3)                                              |                                      [Darrena Gray](https://github.com/DarrenaGray)                                         |     [Tenzing Yeshi](https://github.com/tyeshi181)    |
| :-----------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :---: |
|  [<img src="https://avatars0.githubusercontent.com/u/47536941?s=460&v=4" width = "200" />](https://github.com/jmtblei)  |          [<img src="https://avatars3.githubusercontent.com/u/34693902?s=460&v=4" width = "200" />](https://github.com/jvgiv)          |              [<img src="https://avatars0.githubusercontent.com/u/45213939?s=460&v=4" width = "200" />](https://github.com/DaytonS3)               |  [<img src="https://avatars0.githubusercontent.com/u/40064931?s=460&v=4" width = "200" />](https://github.com/DarrenaGray)  |[<img src="https://avatars2.githubusercontent.com/u/37460471?s=460&v=4" width="200"/>](https://github.com/tyeshi181)
|                  [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/jmtblei)                   |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/jvgiv)                           |                        [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/DaytonS3)                        |                   [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/DarrenaGray)                   |[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/tyeshi181)
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jmtblei/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/johnvgibbonsiv/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/dayton-steinmeyer-a83520174/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/darrena-gray-5655a3180/) |  [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/tenzing-yeshi-4912b8168/) |  |


## Project Overview
ChatMaps is a location-based, mobile chat app for Android. It allows users to create and join chatrooms based on proximity for any occasion.  Chat about general things with fellow users, plan a meetup, get insight about a possible event local to your the area, whatever need be!

You can find the project deployed in the [play store](https://play.google.com/store/apps/details?id=com.labs13localchat&hl=en_US).
### Key Features
    * One-click Login with OAuth through Google/Facebook
    * Ability to view your geolocation
    * Ability to create chatrooms and proximity restriction
    * Ability to join chatrooms within proximity
    * Ability to join 'general' chatrooms regardless of proximity
    * Ability to filter chatrooms by name 
    * Ability to edit profile (names, emails, phone numbers) for anonymity
    * Ability to read and send messages within chatrooms
## Tech Stack
### Front end built using:
    * axios
    * babel-runtime
    * events
    * geolib
    * node
    * path
    * persist
    * react
    * react-native
    * react-native-cli
    * react-native-gesture-handler
    * react-native-image-picker
    * react-native-keyboard-spacer
    * react-native-maps
    * react-native-safari-view
    * react-native-swipe-gestures
    * react-native-vector-icons
    * react-navigation
    * react-redux
    * redux
    * sendbird
    * util
#### Front end deployed to `Google Play Store`
### [Back end](https://github.com/labs13-location-chat/backend/tree/development) built using:
    * bcryptjs
    * body-parser
    * chance
    * cloudinary
    * connect
    * connect-ensure-login
    * connect-session-knex
    * cookie-parser
    * cors
    * datauri
    * dotenv
    * ejs
    * express
    * express-session
    * gen-uuid
    * helmet
    * jsonwebtoken
    * knex
    * knex-cleaner
    * morgan
    * multer
    * passport
    * passport-facebook
    * passport-google-oauth
    * passport-google-oauth20
    * passport-jwt
    * pg
    * sqlite3
    * twilio

# APIs
## OAuth with passport
ChatMaps uses OAuth and passport for authentication. A new user is created when you login for the first time.
## Google Maps API
ChatMaps uses Google Maps to geolocate the user's and the chatroom's coordinates

# Environment Variables
In order for the app to function correctly, the user must provide their own API keys in their builds

    *  com.google.android.geo.API_KEY - You must supply your own Google Maps API key value within the AndroidManifest.xml
    *  appID - You must supply your own SendBird API key within config.js to create and join chatrooms
   
# Installation Instructions
Check the React Native docs for installing React Native globally
Check Android Studio for installing a virtual emulator to test/run
Install all dependencies by running `yarn install`
Link all native depencies with `react-native link`

## Other Scripts

    * build - `yarn android` if react native is installed globally else `react-native run-android`

# Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.
Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.
## Issue/Bug Request
    * If you are having an issue with the existing project code, please submit a bug report under the following guidelines:
    * Check first to see if your issue has already been reported.
    * Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
    * Create a live example of the problem.
    * Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.
## Feature Requests
We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.
## Pull Requests
If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.
Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.
### Pull Request Guidelines
    * Ensure any install or build dependencies are removed before the end of the layer when doing a build.
    * Update the README.md with details of changes to the interface, including new environment variables, exposed ports, useful file locations and container parameters.
    * Ensure that your code conforms to our existing code conventions and test coverage.
    * Include the relevant issue number, if applicable.
    * You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.
### Attribution
These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

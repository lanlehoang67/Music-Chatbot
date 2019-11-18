import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// import the different screens
import Loading from './components/Loading'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Main from './components/Main'

// create our app's navigation stack
const App = createStackNavigator(
 {
   Login: {
     screen: Login,
    
   },
   SignUp: {
     screen: SignUp,
   },
   Main: {
     screen: Main,
   
   }
 },
)

export default createAppContainer(App)
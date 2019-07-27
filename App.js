import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Home from './Home'
import Detail from './Detail'

const AppNavigator = createStackNavigator({
  Home,
  Detail
},{
  initialRouteName: 'Home',
})

const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
  render() {
    return <AppContainer />
  }
}
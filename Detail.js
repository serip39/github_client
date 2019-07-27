import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

export default class Detail extends Component {
  static navigationOptions = {
    title: 'Detail',
  }

  render() {

    item = this.props.navigation.state.params.item

    return (
      <View>
        <Text>{ item.name }</Text>
      </View>
    )
  }
}

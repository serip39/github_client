import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

export default class Detail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('item').name,
    }
  }

  render() {

    const { navigation } = this.props
    const item = navigation.getParam('item')
    console.log(item)

    return (
      <View style={ styles.container }>
        <Text style={ styles.fullName }>{ item.full_name }</Text>
        <View style={ styles.owner }>
          <Image style={ styles.ownerIcon } source={{ url: item.owner.avatar_url }} />
          <Text style={ styles.ownerName }>{ item.owner.login }</Text>
        </View>
        <Text style={ styles.description }>{ item.description }</Text>
        <Text style={ styles.repoUrl }>{ item.url }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white'
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  owner: {
    flexDirection: 'row'
  },
  ownerIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5
  },
  ownerName: {
    fontSize: 14
  },
  repoUrl: {
    marginTop: 10,
    marginBottom: 10
  }
})
import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image
} from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  }

  state = {
    items: [],
    refreshing: false,
    text: ''
  }

  page = 0;

  fetchRepositories(refreshing = false) {
    const newPage = refreshing ? 1 : this.page + 1
    // https://api.github.com/search/repositories?q=react
    fetch(`https://api.github.com/search/repositories?q=${this.state.text}&page=${newPage}`)
      .then(response => response.json())
      .then(({ items }) => {
        this.page = newPage
        if (refreshing) {
          this.setState({ items, refreshing: false })
        } else {
          this.setState({ items: [...this.state.items, ...items], refreshing: false })
        }
      })
      .catch((error) => {
        console.log('Error Message : ' + error)
      })
  }

  navigateToDetail(item) {
    this.props.navigation.navigate('Detail', { item })
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.input} onChangeText={(text) => this.setState({ text })} />
            <TouchableOpacity onPress={() => this.fetchRepositories(true)}>
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.items}
            renderItem={({ item }) => (
              <TouchableOpacity style={ styles.item } onPress={() => this.navigateToDetail(item)}>
                <Text style={ styles.itemTitle }>{ item.name }</Text>
                <View style={ styles.owner }>
                  <Image style={ styles.ownerIcon } source={{ url: item.owner.avatar_url }} />
                  <Text style={ styles.ownerName }>{ item.owner.login }</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => this.fetchRepositories()}
            onEndReachedThreshold={0.1}
            onRefresh={() => this.fetchRepositories(true)}
            refreshing={this.state.refreshing}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  inputWrapper: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EEE',
    borderRadius: 4
  },
  searchText: {
    padding: 10
  },
  item: {
    padding: 10
  },
  itemTitle: {
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
  }
});

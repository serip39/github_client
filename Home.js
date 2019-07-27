import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  }

  state = {
    items: [],
    refreshing: false
  }

  page = 0;

  fetchRepositories(refreshing = false) {
    const newPage = refreshing ? 1 : this.page + 1
    // https://api.github.com/search/repositories?q=react
    fetch(`https://api.github.com/search/repositories?q=react&page=${newPage}`)
      .then(response => response.json())
      .then(({ items }) => {
        if (refreshing) {
          this.setState({ items, refreshing: false })
        } else {
          this.page = newPage
          this.setState({ items: [...this.state.items, ...items], refreshing: false })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  navigateToDetail(item) {
    this.props.navigation.navigate('Detail', { item })
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.container} onPress={() => this.fetchRepositories()}>
            <Text>Fetch</Text>
          </TouchableOpacity>
          <FlatList
            data={this.state.items}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.navigateToDetail(item)}>
                <Text>{ item.name }</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
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
    backgroundColor: '#FFF',
    flex: 1,
    padding: 30
  },
});

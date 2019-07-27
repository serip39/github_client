import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default class App extends React.Component {
  state = {
    items: []
  }

  page = 0;

  fetchRepositories() {
    const newPage = this.page + 1;
    // https://api.github.com/search/repositories?q=react
    fetch(`https://api.github.com/search/repositories?q=react&page=${newPage}`)
      .then(response => response.json())
      .then(({ items }) => {
        this.page = newPage
        this.setState({ items: [...this.state.items, ...items] })
      })
      .catch((error) => {
        console.log(error)
      })
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
            renderItem={({ item }) => (<Text>{ item.name }</Text>)}
            keyExtractor={(item) => item.id}
            onEndReached={() => this.fetchRepositories()}
            onEndReachedThreshold={0.1}
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

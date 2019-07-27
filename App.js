import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class App extends React.Component {
  onPressFetch() {
    // https://api.github.com/search/repositories?q=react
    fetch('https://api.github.com/search/repositories?q=react')
      .then(response => response.json())
      .then(({ items }) => console.log(items))

  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.onPressFetch()}>
            <Text>Fetch</Text>
          </TouchableOpacity>
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

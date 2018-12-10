import React from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the search page ;)</Text>
        <TextInput
          style={styles.input}
          onChangeText={query => this.setState({ query })}
          value={this.state.query}
          autoFocus={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  input: {
    marginTop: 40,
    padding: 10,
    width: "90%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  }
});

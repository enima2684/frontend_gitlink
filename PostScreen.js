import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

export default class HomeScreen extends React.Component {
  state = {
    message: "hello"
  };

  handleButton = () => {
    this.setState({
      message: "button was clicked"
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.getParam("displayText")}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#fff"
  }
});

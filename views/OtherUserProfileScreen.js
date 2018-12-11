import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default class OtherUserProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>THIS IS JUST THE PROFILE OF {this.props.navigation.getParam("githubName")} with id {this.props.navigation.getParam("githubId")}</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Feed")}>
          <Text>CLICK HERE TO GO TO FEED</Text>
        </TouchableOpacity>
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

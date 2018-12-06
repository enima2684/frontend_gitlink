import React from "react";
import { Route, NativeRouter } from "react-router-native";
import Profile from "./views/Profile";
import { View, StyleSheet } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.app}>
        <NativeRouter>
          <Route exact path="/" component={Profile} />
        </NativeRouter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
app:{
  backgroundColor: "green",
  height: "100%",
  width: "100%"
}
})

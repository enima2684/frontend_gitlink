import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import {Button} from "native-base";
import {authService} from "../lib/Authentication";

export default class ProfileScreen extends React.Component {

  logout = async ()=>{

    try{
      await authService.logout();
      Alert.alert("Info", 'Logged out successfully. See you soon ! 👋');
      this.props.navigation.navigate("LoginPage");
    } catch (err) {
      console.log(err);
      Alert.alert("error", 'Oups! Something went wrong on the logout');
      throw err
    }

  };

  render() {
    return (
      <View style={styles.container}>

        <Text>THIS IS JUST THE PROFILE PAGE!</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Feed")}>
          <Text>CLICK HERE TO GO TO FEED</Text>
        </TouchableOpacity>

        <Button danger onPress={this.logout}><Text>Logout</Text></Button>

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

import React, { Component } from "react";
import { H1, H2, Container, Button } from "native-base";
import { StyleSheet, Text, View, Image, Alert } from "react-native";

import {authService} from "../lib/Authentication";

export default class LoginScreen extends Component {

  handleLogin = async () => {

    try{
      await authService.login();

      Alert.alert("Welcome to GitLink !", "Happy to see you again! 🎉🎉🎉");
      this.props.navigation.navigate("MainApp");

    } catch(err){
      console.log(err);
      alert(err);
    }
  };

  async componentDidMount(){
    const loggedIn = await authService.isLoggedIn();
    if(loggedIn){
      console.log("user already logged in");
      Alert.alert("Welcome back !", "You were already logged in 😉");
      this.props.navigation.navigate("MainApp");
    }
  }
  
  render() {
    return (
      <Container style={styles.login}>
        <View style={styles.logoDesign}>
          <Image
            style={styles.logoImage}
            source={require("../Images/collabocats.png")}
          />
          <H1 style={styles.loginH1}>GitLink</H1>
        </View>
        <View>
          <Button style={styles.loginButton} onPress={this.handleLogin} title="Log In Via GitHub">
            <Text style={styles.textLogin}>Log In Via GitHub</Text>
          </Button>
        </View>
        <View style={styles.catchphrase}>
          <H2 style={styles.loginH2}>Messages, Updates, Connects</H2>
          <Text style={styles.textLogin}>
            An application for every developer
          </Text>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    paddingTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#9cdaee4d"
  },
  logoDesign: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    width: 275,
    marginBottom: 50
  },
  logoImage: {
    flex: 1,
    resizeMode: "cover",
    alignSelf: "stretch",
    width: undefined,
    height: undefined
  },
  loginH1: {
    fontSize: 75,
    lineHeight: 90,
    paddingTop: 50
  },
  catchphrase: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#b8e9f7",
    paddingBottom: 100
  },
  loginH2: {
    fontSize: 30,
    lineHeight: 40
  },
  textLogin: {
    fontSize: 20,
    lineHeight: 25
  },
  loginButton: {
    display: "flex",
    justifyContent: "center",
    width: 230,
    height: 60,
    backgroundColor: "#b9de7c",
    borderColor: "#8cc342",
    borderLeftWidth: 2.5,
    borderRightWidth:2.5,
    borderTopWidth:2.5,
    borderBottomWidth:2.5,
  }
});

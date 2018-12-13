import React, { Component } from "react";
import { H1, H2, Container, Button, H3, Body } from "native-base";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import {LinearGradient} from 'expo';

import { authService } from "../lib/Authentication";

export default class LoginScreen extends Component {
  state = {
    isLoading: false
  };

  handleLogin = async () => {
    this.setState({ isLoading: true });
    try {
      await authService.login();
      Alert.alert("Welcome to GitLink !", "Happy to see you again! 🎉🎉🎉");
      this.props.navigation.navigate("MainApp");
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false });
      alert(err);
    }
  };

  async componentDidMount() {
    const loggedIn = await authService.isLoggedIn();
    if (loggedIn) {
      console.log("user already logged in");
      Alert.alert("Already logged in", `Welcome back ${loggedIn} ! 👏`);
      this.props.navigation.navigate("MainApp");
    }
  }

  render() {
    const loginView = (
      <Container>
        <View style={styles.login}>
          <View style={styles.loginHeader}>
            <Octicons name="octoface" size={150} color="#fff" />
          </View>
          <View>
          <H1 style={styles.loginH1}>GitLink</H1>
          </View>
          <View style={styles.catchPhrase}>
            <H2 style={styles.loginH2}>Messages, Updates, Connects</H2>
            <Text style={styles.textStyle}>
              An application for every developer
            </Text>
          </View>
          <View style={styles.loginEnd}>
            <View>
              <LinearGradient
              colors={["#34d058", "#28A745"]}
              start={[0.0, 1.0]}
              end={[1.0, 0.5]}
              locations={[0.0,  1.0]}
              style={styles.buttonContainer}
              >
              <Button
                style={styles.loginButton}
                onPress={this.handleLogin}
                title="Log In Via GitHub"
              >
                <Octicons name="mark-github" size={25} color="#fff" />
                <Text style={styles.loginText}>Log In Via GitHub</Text>
              </Button>
              </LinearGradient>
            </View>
          </View>
        </View>
      </Container>
    );

    if (this.state.isLoading) {
      return (
        <Container style={styles.loading}>
          <H1 style={styles.loginH1}>GitLink</H1>
          <Image
            style={{ height: "60%" }}
            source={require("../assets/daftpunktocat-thomas.gif")}
            resizeMode={"contain"}
          />
          <Text style={styles.loadingText}>
            Please wait while I am connecting you ...
          </Text>
        </Container>
      );
    } else {
      return loginView;
    }
  }
}

const styles = StyleSheet.create({
  centerText: {
    textAlign: "center"
  },
  loading: {
    paddingTop: "20%",
    paddingBottom: "20%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#23292d",
    height: "100%"
  },
  login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#23292D",
    height: "100%",
    width: "100%",
  },
  loginHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "60%",
    paddingTop: "40%"
  },
  loginH1: {
    lineHeight: 60,
    fontSize: 60,
    color: "#fff",
    fontWeight: "bold"
  },
  catchPhrase: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "15%"
  },
  loginH2: {
    fontSize: 25,
    lineHeight: 30,
    color: "#fff"
  },
  loginEnd: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "30%"
  },
  buttonContainer:{
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "70%",
    height: "45%",
    borderRadius: 30,
  },
  loginButton: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "70%",
    height: "100%",
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  loginText: {
    alignSelf: "center",
    width: "70%",
    // fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
  textStyle: {
    color: "#fff",
  },
  loadingText:{
    color: "#fff",
    lineHeight: 40,
    fontSize: 25,
    textAlign: "center",
    paddingLeft: "5%",
    paddingRight: "5%"
  }
});

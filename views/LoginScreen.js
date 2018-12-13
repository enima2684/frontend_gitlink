import React, { Component } from "react";
import { H1, H2, Container, Button, H3, Body } from "native-base";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

import {authService} from "../lib/Authentication";

export default class LoginScreen extends Component {

  state = {
    isLoading: false
  };

  handleLogin = async () => {
    this.setState({isLoading: true});
    try{
      await authService.login();
      Alert.alert("Welcome to GitLink !", "Happy to see you again! 🎉🎉🎉");
      this.props.navigation.navigate("MainApp");
    } catch(err){
      console.log(err);
      this.setState({isLoading: false});
      alert(err);
    }
  };

  async componentDidMount(){
    const loggedIn = await authService.isLoggedIn();
    if(loggedIn){
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
            <Image style={styles.loginImg1}
              source={require("../Images/collabocats.png")}
            />
            <H1 style={styles.loginH1}>GitLink</H1>
          </View>
          <View style={styles.catchPhrase}>
            <H2 style={styles.loginH2}>Messages, Updates, Connects</H2>
            <Text>
              An application for every developer
            </Text>
          </View>
          <View style={styles.loginEnd}>
            <View>
              <Button style={styles.loginButton}
              onPress={this.handleLogin} title="Log In Via GitHub">
                <Octicons name="mark-github" size={25}></Octicons>
                <Text style={styles.loginText}>Log In Via GitHub</Text>
              </Button>
            </View>
          </View>
        </View>
      </Container>
    );

    if (this.state.isLoading){
      return (
          <Container style={styles.loading}>
              <H1 style={styles.loginH1}>GitLink</H1>
              <Image style={{height: "60%"}} source={require('../assets/daftpunktocat-thomas.gif')} resizeMode={'contain'}/>
              <H2 style={styles.centerText}>Please wait while I am connecting you ...</H2>
          </Container>
      )
    } else {
      return loginView
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "column",
    backgroundColor: "#9cdaee4d",
    height: "100%",
  },
  login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#9cdaee4d",
    height: "100%",
    width: "100%",
  },
  loginHeader:{
    display: "flex",
    flexDirection:"column",
    alignItems:"center",
    width:"100%",
    height: "50%",
  },
  loginImg1:{
    resizeMode: "contain",
    alignSelf: "center",
    height: "80%",
    width: "80%"
  },
  loginH1:{
    lineHeight: 60,
    fontSize: 60,
  },
  catchPhrase:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "15%",
  },
  loginH2:{
    fontSize: 25,
    lineHeight:30,
  },
  loginEnd:{
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "30%",
  },
  loginButton: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "70%",
    height: "45%",
    borderRadius: 30,
    backgroundColor: "#b9de7c",
    borderColor: "#8cc342",
    borderLeftWidth: 2.5,
    borderRightWidth:2.5,
    borderTopWidth:2.5,
    borderBottomWidth:2.5,
  },
  loginText:{
    alignSelf: "center",
    width: "50%",
    fontWeight: "700",
  }
});

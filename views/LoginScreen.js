import React, { Component } from "react";
import { H1, H2, Container, Button } from "native-base";
import { StyleSheet, Text, View, Image } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

export default class LoginScreen extends Component {

  handleButton = () => {
    this.props.navigation.navigate("MainApp");
  };
  
  render() {
    return (
      <Container >
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
          onPress={this.handleButton} title="Log In Via GitHub">
            <Octicons name="mark-github" size={30}></Octicons>
            <Text style={styles.loginText}>Log In Via GitHub</Text>
          </Button>
        </View>
        </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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

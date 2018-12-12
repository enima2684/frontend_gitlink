import React, { Component } from "react";
import { Container, H1, H3, Button, Spinner } from "native-base";
import { Image, TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import axios from "axios";
import Octicons from "@expo/vector-icons/Octicons";
import {authService} from "../lib/Authentication";
import requestBuilder from "../lib/request";


export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oneUser: {},
      isMyProfile: true,
      isLoading: true,
    };
  }

  async componentDidMount() {
    try{
      const req = await requestBuilder();
      // check if render my profile or other's profile
      let isMyProfile = await this.isItMyProfile();
      let oneUser;
      if (isMyProfile){
        let response = await req.get('/users/current');
        oneUser = response.data.user;
      }else{
        const otherUser = this.props.navigation.getParam('githubLogin');
        let response = await req.get(`/users/${otherUser}`);
        oneUser = response.data.otherUser;
      }
      this.setState({isMyProfile, oneUser, isLoading: false});
    }
    catch(err){
      console.log(err);
      alert(err.message);
    }
  }

  async isItMyProfile(){
    try{
      const connectedUser = await authService.isLoggedIn();
      const usernameAskedProfile = this.props.navigation.getParam("githubLogin", connectedUser);
      return connectedUser === usernameAskedProfile
    } catch(err){
      console.log(err);
      alert(err.message);
    }

  }

  handleOnPressRepos = async () => {
    // const connectedUser = await authService.isLoggedIn();
    // const usernameAskedProfile = this.props.navigation.getParam("githubLogin", connectedUser);

    this.props.navigation.navigate("Repositories", {
      reposOwner: this.state.oneUser.login
      // reposOwner: usernameAskedProfile
    });
  };

  render() {


    if(this.state.isLoading){
      return (
        <Container>
          <Spinner/>
        </Container>
      )
    }


    const {
      avatar_url,
      login,
      public_repos,
      followers,
      following
    } = this.state.oneUser;

    return (
      <Container>
        <View style={styles.oneProfile}>
          <View style={styles.profileHeader}>
            <Image
              style={styles.oneProfilePicture}
              source={{ uri: avatar_url }}
            />
          </View>
          <H1 style={styles.H1}>{login}</H1>

          {
            (!this.state.isMyProfile) &&
            (
              <View style={styles.profileHeaderButton}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Thread")}
                  style={styles.profileButton}
                >
                  <Text>Follow</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButton}>
                  <Text>Send Message</Text>
                </TouchableOpacity>
              </View>
            )
          }

        </View>
        <View style={styles.profileIconContainer}>
          <View>
            <TouchableOpacity style={styles.oneProfileIcon} onPress={this.handleOnPressRepos}>
              <Octicons name="repo" size={50} color="#0080FF" />
              <Text>Repositories</Text>
              <H1>{public_repos}</H1>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={styles.oneProfileIcon}onPress={() => this.props.navigation.navigate("Followers")}>
              <Octicons name="broadcast" size={50} color="#0080FF" />
              <Text>Followers</Text>
              <H1>{followers}</H1>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={styles.oneProfileIcon} onPress={() => this.props.navigation.navigate("Following")}>
              <Octicons name="organization" size={50} color="#0080FF" />
              <Text>Following</Text>
              <H1>{following}</H1>
            </TouchableOpacity>
          </View>
        </View>
        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  oneProfile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9cdaee4d",
    height: "50%",
    width: "100%"
  },
  profileIconContainer:{
    flexDirection: "row",
    flexGrow: 1,
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-around"
  },
  profileHeader: {
    marginTop: 10,
    width: "40%",
    height: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  oneProfilePicture: {
    resizeMode: "cover",
    height: "70%",
    width: "100%",
    borderRadius: 50,
    borderColor: "#8cc342",
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderBottomWidth: 3
  },
  H1: {
    fontSize: 50,
    lineHeight: 90
  },
  profileHeaderButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  profileButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b9de7c",
    borderRadius: 20,
    borderColor: "#8cc342",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    width: "40%",
    height: "40%"
  },
  profileIcon: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    height: "50%"
  },
  oneProfileIcon: {
    paddingTop: "10%",
    paddingLeft:"10%",
    paddingRight:"10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});

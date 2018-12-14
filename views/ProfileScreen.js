import React, { Component } from "react";
import { Image, TouchableOpacity, StyleSheet, Text, View, Alert, ImageBackground, ScrollView } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import {LinearGradient} from 'expo';
import { Container, H1, Spinner, Content, Button, List, ListItem, Thumbnail, Body, Left, Right } from "native-base";
import {StatusBar} from "react-native";


import {authService} from "../lib/Authentication";
import requestBuilder from "../lib/request";
import colors from "../colors";


export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oneUser: {},
      isMyProfile: true,
      isLoading: true,
      amIFollowing: false,
      isLoadingFollow: false,
    };
  }

  fetchData = async () => {
     try{
      this.setState({isLoading: true, oneUser:{}});
      const req = await requestBuilder();
      // check if render my profile or other's profile
      let isMyProfile = await this.isItMyProfile();
      let oneUser;
      let amIFollowing = false;
      if (isMyProfile){
        let response = await req.get('/users/current');
        oneUser = response.data.user;
      }else{
        const otherUser = this.props.navigation.getParam('githubLogin');
        let response = await req.get(`/users/${otherUser}`);
        oneUser = response.data.otherUser;

        // check if I am following this user
        const amIFollowingResponse = await req.get(`/users/following/${otherUser}`);
        amIFollowing = amIFollowingResponse.data.following;

      }
      this.setState({isMyProfile, oneUser, amIFollowing, isLoading: false});
    }
    catch(err){
      console.log(err);
      alert(err.message);
    }
  };

  componentWillMount() {
    this.willFocusListener = this.props.navigation.addListener('willFocus', this.fetchData);
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
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
    this.props.navigation.navigate("Repositories", {
      reposOwner: this.state.oneUser.login
    });
  };

  handleOnPressFollowers = async () => {
    this.props.navigation.navigate('Followers', {
      userName: this.state.oneUser.login,
      screenType: 'Followers',
    })
  };

  handleOnPressFollowing = async () => {
    this.props.navigation.navigate('Followers', {
      userName: this.state.oneUser.login,
      screenType: 'Following',
    })
  };

  handleOnPressFollow =  async () => {
    const otherUser = this.state.oneUser.login;

    this.setState({isLoadingFollow: true});
    const req = await requestBuilder();

    try {

      if (this.state.amIFollowing){
        // then, I have to Unfollow
        let response = await req.delete(`/users/following/${otherUser}`);
        this.setState({
          amIFollowing: false,
          isLoadingFollow: false,
          oneUser: {
            ...this.state.oneUser,
            followers: (this.state.oneUser.followers - 1)
          }
        });
        Alert.alert('Following', `You unfollowed ${otherUser}`);
      }  else {
        // then I have to Follow
        let response = await req.put(`/users/following/${otherUser}`);
        this.setState({
          amIFollowing: true,
          isLoadingFollow: false,
          oneUser: {
            ...this.state.oneUser,
            followers: (this.state.oneUser.followers + 1)
          }
        });
        Alert.alert('Following', `You are now following ${otherUser} 🎊🎊`);
      }

    } catch (err) {
      Alert.alert('Oups! Something went wrong !', err.message);
      console.log(err);
    }

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
        <StatusBar barStyle={"light-content"}/>

          {/* ------ BUTTONS ------- */}

        { (!this.state.isMyProfile) && (
          <View style={styles.buttonsRow}>

            <LinearGradient
              colors={[colors.GreenFlashyBis, colors.GreenFlashy]}
              start={[0.0, 1.0]}
              end={[1.0, 0.5]}
              locations={[0.0,  1.0]}
              style={styles.btnContainer}>

              <Button transparent style={styles.buttonElement} onPress={this.handleOnPressFollow}>
                <Octicons name={'telescope'} size={24} color={colors.whiteFont}/>
                <Text style={styles.actionButton_text}>

                  { this.state.isLoadingFollow ?
                    "..." :
                    (
                      this.state.amIFollowing ? "Unfollow" : "Follow"
                    )

                  }
                </Text>
              </Button>

            </LinearGradient>
          </View>

        )}

          <View style={styles.main}>


          {/* ------ BACKGROUND IMAGE + USERNAME ------- */}
          <View>
            <ImageBackground source={{uri: avatar_url}} style={styles.imageZone}>

              {/* ------ USERNAME ------- */}
              <View style={styles.usernameRow}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.usernameText}>{login}</Text>
                </View>
                <View style={styles.complementUsernameText}><Text>{" "}</Text></View>
              </View>

            </ImageBackground>
          </View>

          {/*/!* ———————   BOTTOM CARD ————————*!/*/}
          <View style={styles.body}>

            <View style={styles.list}>

              <ListItem button noBorder={true}  style={styles.listItem} onPress={this.handleOnPressRepos}>

                <View style={styles.listItem__left}>
                  <Octicons name={"repo"} size={40} color={colors.Blue}/>
                  <Text style={styles.list__key}>Repositories</Text>
                </View>

                <View>
                  <Text style={styles.list__value}>{public_repos}</Text>
                </View>

              </ListItem>

              <ListItem button noBorder={true}  style={styles.listItem}  onPress={this.handleOnPressFollowers}>

                <View style={styles.listItem__left}>
                  <Octicons name={"organization"} size={40} color={colors.Blue}/>
                  <Text style={styles.list__key}>Followers</Text>
                </View>

                <View>
                  <Text style={styles.list__value}>{followers}</Text>
                </View>

              </ListItem>

              <ListItem button noBorder={true}  style={styles.listItem}  onPress={this.handleOnPressFollowing}>

                <View style={styles.listItem__left}>
                  <Octicons name={"screen-normal"} size={40} color={colors.Blue}/>
                  <Text style={styles.list__key}>Following</Text>
                </View>

                <View>
                  <Text style={styles.list__value}>{following}</Text>
                </View>

              </ListItem>

            </View>

          </View>

        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  main:{
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    // backgroundColor: 'tomato',
    flex: 1,
  },

  imageZone:{
    width: '100%',
    height: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    shadowColor: colors.GrayDark,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    flexGrow:1

  },

  usernameRow:{
    display: 'flex',
    flexDirection: 'row',
  },

  usernameContainer:{

    marginLeft: -15,
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 15,
    backgroundColor: colors.BlueTransparent,

    flexShrink: 1,
  },

  usernameText:{
    fontWeight: '700',
    color: 'white',
    fontSize: 20,
    backgroundColor: 'transparent',
    letterSpacing: 1.7
  },
  complementUsernameText:{
    backgroundColor: 'transparent',
  },


  buttonsRow:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    width:'100%',
    top: 225,
    zIndex:4,
    elevation:4,
  },
  btnContainer:{
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    width: "55%",

    shadowColor: colors.GrayDark,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,

  },
  buttonElement:{
    width: '100%',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionButton_text:{
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1.2,
    paddingLeft: 10,
  },
  body:{
    width: "100%",
    shadowColor: colors.whiteFont,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    flexGrow: 2,

    backgroundColor: colors.whiteFont,
    borderRadius: 15,
  },

  list:{
    flex:1,
    marginTop: 30,
    paddingLeft: "20%",
    paddingRight: "20%",
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',

  },
  listItem:{
    width: '100%',
    marginLeft: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listItem__left:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  list__key:{
    paddingLeft: 15,
    fontSize: 16,
    fontWeight: "700",
    color: colors.GrayDark,
    letterSpacing: 1.2
  },
  list__value: {
    fontWeight: "700",
    fontSize: 32,
    color: colors.Blue,
    paddingLeft: 15,
  }
});

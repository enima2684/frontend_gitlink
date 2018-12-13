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
    };
  }

  fetchData = async () => {
     try{
      this.setState({isLoading: true, oneUser:{}});
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

  handleOnPressFollow = () => {
    alert('Following user');
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

        <Content style={{height:"100%"}}>

          {/* ------ BACKGROUND IMAGE + USERNAME ------- */}
          {/*<View >*/}
            <ImageBackground source={{uri: avatar_url}} style={styles.imageZone}>

              {/* ------ USERNAME ------- */}
              <View style={styles.usernameRow}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.usernameText}>{login}</Text>
                </View>
                <View style={styles.complementUsernameText}><Text>{" "}</Text></View>
              </View>

            </ImageBackground>
          {/*</View>*/}

          {/* ------ BUTTONS ------- */}
          <View style={styles.buttonsRow}>

            <LinearGradient
              colors={[colors.GreenFlashyBis, colors.GreenFlashy]}
              start={[0.0, 1.0]}
              end={[1.0, 0.5]}
              locations={[0.0,  1.0]}
              style={styles.btnContainer}>

              <Button transparent style={styles.buttonElement} onPress={this.handleOnPressFollow}>
                <Text style={styles.actionButton_text}>Follow</Text>
              </Button>

            </LinearGradient>

            {/*<LinearGradient*/}
              {/*colors={[colors.GreenFlashyBis, colors.GreenFlashy]}*/}
              {/*start={[0.0, 1.0]}*/}
              {/*end={[1.0, 0.5]}*/}
              {/*locations={[0.0,  1.0]}*/}
              {/*style={styles.btnContainer}>*/}

              {/*<Button transparent style={styles.buttonElement} onPress={this.handleOnPressRepos}>*/}
                {/*<Text style={styles.actionButton_text}>Repositories</Text>*/}
              {/*</Button>*/}

            {/*</LinearGradient>*/}


          </View>

          {/*/!* ———————   BOTTOM CARD ————————*!/*/}
          <View style={styles.body}>

            <View style={styles.list}>

              <ListItem button noBorder={true}  style={styles.listItem} onPress={() => alert('hey')}>

                <View style={styles.listItem__left}>
                  <Octicons name={"repo"} size={40} color={colors.Blue}/>
                  <Text style={styles.list__key}>Repositories</Text>
                </View>

                <View>
                  <Text style={styles.list__value}>{public_repos}</Text>
                </View>

              </ListItem>

              <ListItem button noBorder={true}  style={styles.listItem}>

                <View style={styles.listItem__left}>
                  <Octicons name={"organization"} size={40} color={colors.Blue}/>
                  <Text style={styles.list__key}>Followers</Text>
                </View>

                <View>
                  <Text style={styles.list__value}>{followers}</Text>
                </View>

              </ListItem>

              <ListItem button noBorder={true}  style={styles.listItem}>

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

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

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
    // zIndex:1,
    // elevation: 1,

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
    top: 217.5,
    zIndex:4,
    elevation:4,
  },
  btnContainer:{
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    width: "66%",

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
    letterSpacing: 1.2
  },
  body:{
    height: "110%",
    width: "100%",
    position: 'absolute',
    top: 235,
    zIndex: 3,
    elevation:3,
    shadowColor: colors.whiteFont,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // backgroundColor: colors.whiteFont,
    backgroundColor: colors.BlueLight,
    borderRadius: 15,
  },

  list:{
    marginTop: 30,
    paddingLeft: "20%",
    paddingRight: "20%",
    height: '100%',
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

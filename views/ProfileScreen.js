import React, { Component } from "react";
import { Image, TouchableOpacity, StyleSheet, Text, View, Alert, ImageBackground } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import {LinearGradient} from 'expo';
import { Container, H1, Spinner, Content, Button } from "native-base";




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
        <Content>

          <ImageBackground source={{uri: avatar_url}} style={styles.imageZone}>

            {/* ------ USERNAME ------- */}
            <View style={styles.usernameRow}>
              <LinearGradient
                colors={['#28A745', '#7EE981']}
                start={[0.0, 1.0]}
                end={[1.0, 0.5]}
                locations={[0.0,  1.0]}
                style={styles.usernameContainer}>
                <Text style={styles.usernameText}>{login}</Text>
              </LinearGradient>
              <View style={styles.complementUsernameText}><Text>{" "}</Text></View>
            </View>

          </ImageBackground>

          {/* ------ BUTTONS ------- */}
          <View style={styles.buttonsRow}>

            <LinearGradient
              colors={['#28A745', '#7EE981']}
              start={[0.0, 1.0]}
              end={[1.0, 0.5]}
              locations={[0.0,  1.0]}
              style={styles.btnContainer}>

              <Button transparent style={styles.buttonElement} onPress={this.handleOnPressFollow}>
                <Text style={styles.actionButton_text}>Follow</Text>
              </Button>

            </LinearGradient>

            <LinearGradient
              colors={['#28A745', '#7EE981']}
              start={[0.0, 1.0]}
              end={[1.0, 0.5]}
              locations={[0.0,  1.0]}
              style={styles.btnContainer}>

              <Button transparent style={styles.buttonElement} onPress={this.handleOnPressRepos}>
                <Text style={styles.actionButton_text}>Repositories</Text>
              </Button>

            </LinearGradient>


          </View>

          <View>

          </View>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  imageZone:{
    width: '100%',
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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

    shadowColor: '#23292D',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 1,

    flexShrink: 1,
  },

  usernameText:{
    fontWeight: '700',
    color: 'white',
    fontSize: 20,
    backgroundColor: 'transparent',
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
    top: 280,

  },
  btnContainer:{
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    width: "30%",

    shadowColor: '#23292D',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 1,

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
    textAlign: 'center'
  }



});

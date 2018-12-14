import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
  ImageBackground
} from "react-native";
import { Container, H1, List, ListItem, H2, Thumbnail, Button, Spinner, H3, Card, CardItem, Body, Right, Icon, Content } from "native-base";
import Octicons from "@expo/vector-icons/Octicons";
import {LinearGradient} from 'expo';

import requestBuilder from "../lib/request";
import colors from "../colors";

export default class OneRepositoryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repo: {},
      contributors: [],
      isLoading: true
    };
  }


  fetchData = async () => {
    try {
      this.setState({isLoading: true});

      const repoName       = this.props.navigation.getParam('repoName');
      const repoOwnerLogin = this.props.navigation.getParam('repoOwnerLogin');

      let req = await requestBuilder();
      const [repo, contributors] = await Promise.all([
        req.get(`/repos/${repoOwnerLogin}/${repoName}`),
        req.get(`/repos/${repoOwnerLogin}/${repoName}/contributors`)
      ]);

      this.setState({
        repo: repo.data.repo,
        contributors: contributors.data.contributors,
        isLoading: false
      });
    } catch(err) {
      Alert.alert('Oups, Something went wrong', err.message);
      console.log(err);
    }
  };

  componentWillMount() {
    this.willFocusListener = this.props.navigation.addListener('willFocus', this.fetchData);
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  handleOnPressContributor(githubLogin){
    this.props.navigation.navigate('OtherUserProfile', {
      githubLogin
    })
  }

  goToCode = ()=>{
    this.props.navigation.navigate("Code",{repo_html_url: this.state.repo.html_url});
  };
  goToReadme = ()=>{
    this.props.navigation.navigate("Readme",{repo_html_url: this.state.repo.html_url});
  };

  handleOnPressOwner = (githubLogin) => {
    this.props.navigation.navigate("OtherUserProfile", {githubLogin})
  };

  render() {
    let {repo} = this.state;
    repo.contributors = this.state.contributors;

    if(this.state.isLoading){
      return <Spinner/>
    }


    return (
      <ScrollView>

      <View style={{...styles.buttonsRow, ...styles.stats}}>

        <Button transparent rounded style={styles.buttonElement}>
          <View style={styles.oneButton}>
            <Text style={styles.stat__text}>{repo.watchers_count}</Text>
           <Octicons name="eye" size={20} color={colors.whiteFont}/>
          </View>
        </Button>


        <Button transparent rounded style={styles.buttonElement}>
          <View style={styles.oneButton}>
            <Text style={styles.stat__text}>{repo.forks_count}</Text>
           <Octicons name="repo-forked" size={20} color={colors.whiteFont}/>
          </View>
        </Button>

        <Button transparent rounded style={styles.buttonElement}>
          <View style={styles.oneButton}>
            <Text style={styles.stat__text}>{repo.stargazers_count}</Text>
           <Octicons name="star" size={20} color={colors.whiteFont}/>
          </View>
        </Button>

      </View>


      <View style={styles.main}>


        <ImageBackground source={{uri: repo.owner.avatar_url}} style={styles.imageZone}>

          {/* ------ USERNAME ------- */}
          <View style={styles.usernameRow}>
            <View style={styles.usernameContainer}>
              <Text style={styles.usernameText}>{repo.name}</Text>
            </View>
            <View style={styles.complementUsernameText}><Text>{" "}</Text></View>
          </View>
        </ImageBackground>


        <View style={styles.body}>

          <Card style={styles.source}>
            <CardItem header>
              <Text>Source</Text>
            </CardItem>
            <CardItem button onPress={this.goToReadme}>
              <Body style={styles.source__element}>
                <Octicons name="file" size={20}/>
                <Text style={styles.source__element__text}>Readme</Text>
              </Body>
              <Right>
                <Octicons name="chevron-right" size={20}/>
              </Right>
            </CardItem>

            <CardItem button onPress={this.goToCode}>
              <Body style={styles.source__element}>
                <Octicons name="code" size={20}/>
                <Text style={styles.source__element__text}>Code</Text>
              </Body>
              <Right>
                <Octicons name="chevron-right" size={20}/>
              </Right>
            </CardItem>
            </Card>

         <Card style={styles.collaborators}>
          <CardItem header>
            <Text>Collaborators ({repo.contributors.length})</Text>
          </CardItem>
          {repo.contributors.map(contributor => (
            <CardItem key={contributor.id} button onPress={() => this.handleOnPressContributor(contributor.login)}>
              <Body style={styles.source__element}>
                <Thumbnail round small source={{uri: contributor.avatar_url}}/>
                <Text style={styles.source__element__text}>{contributor.login}</Text>
              </Body>
              <Right>
                <Octicons name="chevron-right" size={20}/>
              </Right>
            </CardItem>

          ))}
        </Card>
        </View>

      </View>

    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

    main:{
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
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


  body: {
    paddingBottom: 20
  },
  source__element:{
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  source__element__text:{
    paddingLeft: 10
  },


  stats: {
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  stat: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: "#8cc342",
    backgroundColor: colors.whiteFont
  },



  buttonElement:{
    width: '20%',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.BlueTransparent
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

  stat__text:{
    fontWeight: "700",
    color: colors.whiteFont,
    paddingLeft: 0,
    paddingRight: 0,
  },

  oneButton:{
    backgroundColor: colors.BlueTransparent,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 15,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10
  }


});

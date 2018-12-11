import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import { Container, H1, List, ListItem, H2, Thumbnail, Button, Spinner, H3 } from "native-base";
import Octicons from "@expo/vector-icons/Octicons";
import requestBuilder from "../lib/request";

export default class OneRepositoryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repo: {},
      contributors: [],
      isLoading: true
    };
  }
  async componentWillMount() {
    try {
      const repoName       = this.props.navigation.getParam('repoName');
      const repoOwnerLogin = this.props.navigation.getParam('repoOwnerLogin');

      let req = await requestBuilder();
      const [repos, contributors] = await Promise.all([
        req.get(`/repos/${repoOwnerLogin}/${repoName}`),
        req.get(`/repos/${repoOwnerLogin}/${repoName}/contributors`)
      ]);

      this.setState({
        repo: repos.data.repo,
        contributors: contributors.data.contributors,
        isLoading: false
      });
    } catch(err) {
      Alert.alert('Oups, Something went wrong', err.message);
      console.log(err);
    }
  }

  handleOnPressContributor(githubLogin){
    this.props.navigation.navigate('OtherUserProfile', {
      githubLogin
    })
  }

  goToCode = ()=>{
    this.props.navigation.navigate("Code",{repo_html_url: this.state.repo.html_url});
  };

  render() {
    let {repo} = this.state;
    repo.contributors = this.state.contributors;
    repo.language = "javascript";

    if(this.state.isLoading){
      return <Spinner/>
    }


    return (
      <Container>

        <View style={styles.header}>

          <View style={styles.title}>
            <H1>{repo.name}</H1>
            <H3>{(repo.language) && repo.language}</H3>
          </View>

          <View style={styles.title}>
            <Thumbnail large source={{uri: repo.owner.avatar_url}} />
            <H3>{repo.owner.login}</H3>
          </View>


          <View style={styles.stats}>

            <View style={styles.stat}>
              <Text>{repo.watchers_count}</Text>
              <Octicons name="eye" size={20}/>
            </View>

            <View style={styles.stat}>
              <Text>{repo.forks_count}</Text>
              <Octicons name="repo-forked" size={20}/>
            </View>

            <View style={styles.stat}>
              <Text>{repo.stargazers_count}</Text>
              <Octicons name="star" size={20}/>
            </View>

          </View>



        </View>

        <View style={styles.body}>

        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    height: "50%",
    width: "100%",
    backgroundColor: "#9cdaee4d",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems:'center',
  },

  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    alignItems: 'center'
  },

  body: {

  }


});

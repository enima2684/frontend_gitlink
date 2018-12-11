import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import { Container, H1, List, ListItem, H2, Thumbnail, Button, Spinner } from "native-base";
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
        // readme: readme.data,
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
    const oneRepo = this.state.repo;
    const oneRepoContributors = this.state.contributors;

    if(this.state.isLoading){
      return <Spinner/>
    }



    return (
      <Container>

      </Container>
    );
  }
}

const styles = StyleSheet.create({

});

import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import { Container, H1, List, ListItem, H2, Thumbnail, Button, Spinner, H3, Card, CardItem, Text, Body, Right, Icon, Content } from "native-base";
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
  goToReadme = ()=>{
    this.props.navigation.navigate("Readme",{repo_html_url: this.state.repo.html_url});
  };

  handleOnPressOwner = (githubLogin) => {
    this.props.navigation.navigate("OtherUserProfile", {githubLogin})
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
        <ScrollView>

          <View style={styles.header}>

            <View style={styles.title}>
              <H1>{repo.name}</H1>
              <H3>{(repo.language) && repo.language}</H3>
            </View>

            <View style={styles.titleContainer}>

              <Button transparent style={styles.title} onPress={()=>this.handleOnPressOwner(repo.owner.login)}>
                <Thumbnail large source={{uri: repo.owner.avatar_url}} />
                <H3>{repo.owner.login}</H3>
              </Button>

            </View>


            <View style={styles.stats}>

              <View style={styles.stat}>
                <Text style={{fontWeight: "700"}}>{repo.watchers_count}</Text>
                <Octicons name="eye" size={20} color={"#8cc342"}/>
              </View>

              <View style={styles.stat}>
                <Text style={{fontWeight: "700"}}>{repo.forks_count}</Text>
                <Octicons name="repo-forked" size={20} color={"#8cc342"}/>
              </View>

              <View style={styles.stat}>
                <Text style={{fontWeight: "700"}}>{repo.stargazers_count}</Text>
                <Octicons name="star" size={20} color={"#8cc342"}/>
              </View>

            </View>

          </View>

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
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    height: 300,
    width: "100%",
    backgroundColor: "#9cdaee4d",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems:'center',
  },

  titleContainer: {
    // height: "40%",
    paddingBottom: 10,
    paddingTop: 10,
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
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
    color: "#8cc342"
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
  collaborators:{

  }




});

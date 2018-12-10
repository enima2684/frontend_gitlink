import React, { Component } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image
} from "react-native";
import axios from "axios";
import { Container, H1, List, ListItem, H2, Thumbnail } from "native-base";
import Octicons from "@expo/vector-icons/Octicons";
import { MarkdownView } from "react-native-markdown-view";

export default class OneRepositoryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repo: {},
      contributor: [],
      //   readme: "",
      loading: true
    };
  }
  async componentWillMount() {
    try {
      const repos = await axios.get(
        `https://api.github.com/repos/griev04/backend_gitlink`
      );
      const contributors = await axios.get(
        `https://api.github.com/repos/griev04/backend_gitlink/contributors`
      );
      //   const readme = await axios.post(
      //     `https://api.github.com/markdown`
      //   );
      this.setState({
        repo: repos.data,
        contributor: contributors.data,
        // readme: readme.data,
        loading: false
      });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const oneRepo = this.state.repo;
    const oneRepoContributors = this.state.contributor;
    // const oneReadMe = this.state.readme;

    return (
      <Container>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#00ff00" padding="10%" />
        ) : (
          <ScrollView>
            <Container>
              <View style={styles.ownerWrapper}>
                <H1 style={styles.textStyleOwner}>OWNER</H1>
                <View style={styles.ownerHeader}>
                  <View style={styles.oneHeader}>
                    <Thumbnail
                      round large
                      source={{ uri: oneRepo.owner.avatar_url }}
                    />
                  </View>
                  <View style={styles.oneHeader}>
                    <H2> {oneRepo.owner.login}</H2>
                  </View>
                  <View style={styles.ownerBottom}>
                  <View>
                      <Octicons name="repo-forked"></Octicons>
                      <Text>{oneRepo.forks_count}</Text>
                  </View>
                  <View>
                      <Octicons name="eye"></Octicons>
                      <Text>{oneRepo.watchers_count}</Text>
                  </View>
                  <View>
                      <Octicons name="star"></Octicons>
                      <Text>{oneRepo.stargazers_count}</Text>
                  </View>
                  </View>
                  
                </View>
              </View>
              <View style={styles.wrapper}>
                <H1 style={styles.textStyle}>SOURCE</H1>
                <View style={styles.oneHeader}>
                  <Octicons name="file-symlink-directory" size={40} />
                  <Text>Code</Text>
                </View>
              </View>
              <View style={styles.wrapper}>
                <H1 style={styles.textStyle}>CONTRIBUTORS</H1>
                <List>
                  {oneRepoContributors.map(oneContributor => {
                    return (
                      <ListItem key={oneContributor.id}>
                        <View>
                          <Thumbnail
                            round small
                            source={{ uri: oneContributor.avatar_url }}
                          />
                        </View>
                        <H2 style={styles.textSize}> {oneContributor.login}</H2>
                      </ListItem>
                    );
                  })}
                </List>
              </View>
            </Container>
          </ScrollView>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  ownerWrapper: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "5%",
    paddingLeft: "3%",
    backgroundColor: "#9cdaee4d",
    height: "25%"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "5%",
    paddingLeft: "3%"
  },
  ownerHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10%"
  },
  textStyleOwner: {
    color: "#47a9ff",
    alignSelf: "center"
  },
  oneHeader: {
    paddingBottom: "5%"
  },
  ownerBottom:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%"
  },
  textStyle: {
    color: "#47a9ff"
  },
  textSize: {
    fontSize: 15,
    lineHeight: 30,
  }
});

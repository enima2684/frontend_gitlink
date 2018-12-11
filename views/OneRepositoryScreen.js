import React, { Component } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert
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
      contributors: [],
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
        contributors: contributors.data,
        // readme: readme.data,
        loading: false
      });
    } catch (err) {
      Alert.alert('Oups, Something went wrong', err.message);
      console.log(err);
    }
  }
  render() {
    const oneRepo = this.state.repo;
    const oneRepoContributors = this.state.contributors;
    // const oneReadMe = this.state.readme;

    return (
      <Container>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#00ff00" padding="10%" />
        ) : (
          <ScrollView>
            <Container>
              <View style={styles.ownerWrapper}>
                <H1 style={styles.textStyleOwner}>Owner</H1>
                <View style={styles.ownerHeader}>
                  <View style={styles.oneHeader}>
                    <Thumbnail
                      round
                      large
                      source={{ uri: oneRepo.owner.avatar_url }}
                    />
                  </View>
                  <View style={styles.oneHeader}>
                    <H2> {oneRepo.owner.login}</H2>
                  </View>
                  <View style={styles.ownerBottom}>
                    <View style={styles.styleIcon}>
                      <Octicons name="repo-forked" size={20}/>
                      <Text>{oneRepo.forks_count}</Text>
                    </View>
                    <View>
                      <Octicons name="eye" size={20}/>
                      <Text>{oneRepo.watchers_count}</Text>
                    </View>
                    <View>
                      <Octicons name="star" size={20}/>
                      <Text>{oneRepo.stargazers_count}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.wrapper}>
                <H1 style={styles.textStyle}>Source</H1>
                <View style={styles.oneHeader}>
                  <Octicons name="file-symlink-directory" size={40} />
                  <Text>Code</Text>
                </View>
              </View>
              <View style={styles.wrapper}>
                <H1 style={styles.textStyle}>Contributors</H1>
                <List>
                  {oneRepoContributors.map(oneContributor => {
                    return (
                      <ListItem key={oneContributor.id}>
                        <View>
                          <Thumbnail
                            round
                            small
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
    width: "100%",
    height: "35%",
    resizeMode: "contain",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "5%",
    paddingLeft: "3%",
    backgroundColor: "#9cdaee4d"
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
  ownerBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%"
  },
  textStyle: {
    color: "#47a9ff"
  },
  styleIcon:{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"
  },
  textSize: {
    fontSize: 15,
    lineHeight: 30
  }
});

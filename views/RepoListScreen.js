import React, { Component } from "react";
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { Container, H1, List, ListItem  } from "native-base";
import Octicons from "@expo/vector-icons/Octicons";

export default class RepoListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oneUserRepos: [],
      loading: true,
    };
  }
  componentDidMount() {
    axios
      .get(`https://api.github.com/users/nrlfrh/repos`)
      .then(response => {
        this.setState({ oneUserRepos: response.data, loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  goToCode = (repo_html_url)=>{
    this.props.navigation.navigate("Code",{repo_html_url});
  };

  render() {
    const { oneUserRepos } = this.state;
    return (
      <Container>
        {this.state.loading && (
          <ActivityIndicator size="large" color="#00ff00" padding="10%" />
        )}
        <ScrollView>
          <List>
            {oneUserRepos.map(oneRepo => (
                  <ListItem key={oneRepo._id}>
                    <TouchableOpacity style={styles.oneRepo} onPress={()=>this.goToCode(oneRepo.html_url)}>
                      <View style={styles.repoList}>
                        <View>
                          <Octicons name="repo" size={50} color="#9cdaef" />
                        </View>
                        <View style={styles.repoMidlle}>
                          <Text style={styles.repoName}> {oneRepo.name}</Text>
                          <View style={styles.repoMiddile2}>
                            <Text> {oneRepo.created_at.slice(0, 10)}</Text>
                            <Text> {oneRepo.language}</Text>
                            <Text><Octicons name="repo-forked"></Octicons> {oneRepo.forks_count}</Text>
                          </View>
                        </View>
                        <Octicons name="chevron-right" size={25} color="#b8e9f7"/>
                      </View>
                    </TouchableOpacity>
                  </ListItem>
                )
            )}
          </List>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    oneRepo:{
        width: "100%"
    },
    repoList:{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        width: "100%"
    },
    repoName:{
        fontSize: 20,
        lineHeight: 25,
        paddingBottom: "4%"
    },
    repoMidlle:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width:"80%",
    },
    repoMiddile2:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "70%"
    }
})
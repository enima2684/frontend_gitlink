import React from "react";
import { StyleSheet, View, TextInput, Image, ScrollView } from "react-native";
import axios from "axios"
import Octicons from "@expo/vector-icons/Octicons";
import { Container, Header, Content, Card, CardItem, Text, Body, Right, Icon } from "native-base";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      resultUsers: [],
      resultRepos: [],
    };
  }

  async componentDidMount(){

      let query = "enima";

      let [response_users, response_repos] = await Promise.all([
        axios.get(`https://api.github.com/search/users?q=${query}`),
        axios.get(`https://api.github.com/search/repositories?q=${query}`),
      ]);

      let [resultUsers, resultRepos] = [
        response_users.data.items,
        response_repos.data.items
      ];

      this.setState({resultUsers, resultRepos})
  }

  render() {


    let userResultHTML = this.state.resultUsers.map(user => (
      <CardItem bordered key={user.id} style={styles.innerCardItem}>
        <Text>{user.login}</Text>
        <Icon name="ios-arrow-forward" />
      </CardItem>
    ));


    let repoResultHTML = this.state.resultRepos.map(repo => (
      <Text key={repo.id}>{repo.name}</Text>
    ));

    return (
      <View style={styles.container}>

        {/*SEARCHBAR*/}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            onChangeText={query => this.setState({ query })}
            value={this.state.query}
            autoFocus={true}
          />
          <Octicons size={20} name="search"  />
        </View>

        {/*SEARCH RESULTS*/}

        <Card style={styles.resultContainer}>
          <ScrollView>

          <CardItem header bordered>
            <Text>Users</Text>
          </CardItem>

          <CardItem bordered>
            <Card transparent style={styles.innerCard}>
              {userResultHTML}
            </Card>
          </CardItem>
          {/*--------------------------------------*/}
          <CardItem header bordered>
            <Text>Repositories</Text>
          </CardItem>

          <CardItem bordered>
            <Card>
            {repoResultHTML}
            </Card>
          </CardItem>
          </ScrollView>
        </Card>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: "center",
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
  },
  searchBar: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    width: "75%"
  },
  resultContainer:{
    width: "100%",
    marginTop: 10
  },
  innerCard:{
    width: "100%"
  },
  innerCardItem: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

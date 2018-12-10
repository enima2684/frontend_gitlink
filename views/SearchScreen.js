import React from "react";
import { StyleSheet, View, TextInput, Image, ScrollView } from "react-native";
import axios from "axios"
import Octicons from "@expo/vector-icons/Octicons";
import { Card, CardItem, Text, Body, Right, Icon, List, ListItem, Thumbnail, Left, Button, Spinner } from "native-base";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      userIsLoading: false,
      repoIsLoading: false,
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
        response_users.data.items.slice(0, 8),
        response_repos.data.items.slice(0, 8)
      ];

      this.setState({resultUsers, resultRepos})
  }

  render() {


    let userResultHTML = this.state.resultUsers.map(user => (
      <ListItem bordered key={user.id} style={styles.innerListItem} thumbnail>
        <Left>
          <Thumbnail round small source={{ uri: user.avatar_url }} />
        </Left>

        <Body>
          <Text>{user.login}</Text>
        </Body>

        <Right>
          <Button style={styles.goToButton} transparent>
            <Octicons style={styles.arrowIcon} name="triangle-right" size={16} />
          </Button>
        </Right>

      </ListItem>
    ));

    let repoResultHTML = this.state.resultRepos.map(repo => (
      <ListItem bordered key={repo.id} style={styles.innerListItem} thumbnail>
        <Left>
          <Thumbnail round small source={{ uri: repo.owner.avatar_url }} />
        </Left>

        <Body>
          <Text>{repo.name}</Text>
        </Body>

        <Right>
          <Button style={styles.goToButton} transparent>
            <Octicons style={styles.arrowIcon} name="triangle-right" size={16} />
          </Button>
        </Right>

      </ListItem>
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
            <List transparent style={styles.innerList}>
              {this.state.userIsLoading ?
                <Spinner/> :
                userResultHTML
              }
            </List>
          </CardItem>
          {/*--------------------------------------*/}
          <CardItem header bordered>
            <Text>Repositories</Text>
          </CardItem>

          <CardItem bordered>
            <List transparent style={styles.innerList}>
              {this.state.repoIsLoading ?
                <Spinner/> :
                repoResultHTML
              }
            </List>
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
    paddingBottom: "5%",
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
  innerList:{
    width: "100%"
  },
  innerListItem: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 0,
  },
  goToButton: {
    paddingBottom: 0,
    paddingTop: 0,
    flex: 1
  },
  arrowIcon: {
    backgroundColor: "#fff",
  }
});

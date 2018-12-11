import React from "react";
import { StyleSheet, View, TextInput, Image, ScrollView, Alert } from "react-native";
import axios from "axios"
import Octicons from "@expo/vector-icons/Octicons";
import { Card, CardItem, Text, Body, Right, Icon, List, ListItem, Thumbnail, Left, Button, Spinner } from "native-base";

import requestBuilder from "../lib/request";


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

  async querySearchUsers(query){
    try{
      const req = await requestBuilder();
      let response = await req.get('/users/search', {
        params: {query}
      });
      let resultUsers = response.data.items.slice(0, Math.min(8, response.data.items.length));
      this.setState({resultUsers, userIsLoading: false})
    } catch (err) {
      Alert.alert('Search Limit Reached', 'You have reached the maximum number of searches per minute allowed. Please wait a moment, or subscribe to our premium plan 😉');
      console.log(err);
      this.setState({userIsLoading: false})
    }
  }

  async querySearchRepos(query){
    try{
      // let response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
      let response = await req.get('/repos/search', {
        params: {query}
      });
      let resultRepos = response.data.items.slice(0, Math.min(8, response.data.items.length));
      this.setState({resultRepos, repoIsLoading: false});
    } catch (err) {
      Alert.alert('Search Limit Reached', 'You have reached the maximum number of searches per minute allowed. Please wait a moment, or subscribe to our premium plan 😉');
      this.setState({repoIsLoading: false})
    }
  }

  handleSearchBarInput = query => {
    this.setState({query});
  };

  handleOnSubmitSearch = async () => {
    this.setState({userIsLoading: true, repoIsLoading: true});
    this.querySearchUsers(this.state.query);
    this.querySearchRepos(this.state.query);
  };

  handleOnPressUser = (githubId, githubLogin) => {
    this.props.navigation.navigate('OtherUserProfile', {
      githubId: githubId,
      githubName: githubLogin
    })
  };

  handleOnPressRepo = () => {
    alert("NAVIGATION HAS TO BE IMPLEMENTED ONCE WE HAVE A REPO VIEW")
  };

  render() {

    let userResultHTML = this.state.resultUsers.map(user => (
      <ListItem
        key={user.id}
        style={styles.innerListItem}
        button
        thumbnail
        onPress={() => this.handleOnPressUser(user.id, user.login)}>
          <Left>
              <Thumbnail round small source={{ uri: user.avatar_url }} />
          </Left>

          <Body>
              <Text style={styles.text}>{user.login}</Text>
          </Body>

          <Right>
              <Octicons style={styles.arrowIcon} name="triangle-right" size={16} />
          </Right>
      </ListItem>
    ));

    let repoResultHTML = this.state.resultRepos.map(repo => (
      <ListItem
        key={repo.id}
        style={styles.innerListItem}
        button
        thumbnail
        onPress={this.handleOnPressRepo}>

        <Left>
          <Thumbnail round small source={{ uri: repo.owner.avatar_url }} />
        </Left>

        <Body>
          <Text>{repo.name}</Text>
        </Body>

        <Right>
            <Octicons style={styles.arrowIcon} name="triangle-right" size={16} />
        </Right>

      </ListItem>
    ));


    return (

      <View style={styles.container}>


        {/*SEARCHBAR*/}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            onChangeText={this.handleSearchBarInput}
            value={this.state.query}
            autoFocus={true}
          />
          <Button transparent onPress={this.handleOnSubmitSearch}><Octicons size={20} name="search"  /></Button>

        </View>

        {/*SEARCH RESULTS*/}
        <Card style={styles.resultContainer}>
          <ScrollView>

            {/*USERS RESULTS*/}
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

            {/*REPO RESULTS*/}
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
  noPadding: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  arrowIcon: {
    backgroundColor: "#fff",
  },
  text: {
    color: "#202020"
  }
});

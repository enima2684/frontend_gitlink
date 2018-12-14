import React, { Component } from "react";
import {ScrollView, View} from 'react-native'
import { Container, Spinner, List, ListItem, Left, Thumbnail, H1, Alert } from "native-base";
import { authService } from "../lib/Authentication";
import requestBuilder from "../lib/request";

export default class FollowerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersToDisplay: [],
      isLoading: true
    };
  }

  componentWillMount() {
    this.willFocusListener = this.props.navigation.addListener('willFocus', this.fetchData);
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  fetchFollowers = async (login) => {
    const req = await requestBuilder();
    let response = await req.get(`/users/followers/${login}`);
    console.log("🎈🎈🎈🎈🎈🎈");
    console.log(response.data);
    this.setState({usersToDisplay: response.data.followers});
  };

  fetchFollowing = async (login) => {
    const req = await requestBuilder();
    let response = await req.get(`/users/following/list/${login}`);
    console.log("🎁🎁🎁🎁🎁🎁🎁");
    console.log(response.data);
    this.setState({usersToDisplay: response.data.following});
  };

  fetchData = async () => {
      try{

        const userName = this.props.navigation.getParam('userName');
        const screenType = this.props.navigation.getParam('screenType'); // followers or following

        if (screenType === 'followers') {
          return this.fetchFollowers(userName);
        } else if (screenType === 'following') {
          return this.fetchFollowing(userName);
        } else {
          throw new Error('screenType must be following or followers');
        }

      } catch(err){
        Alert.alert('Oups! Something went wrong ..', err.message);
      }
  };


  handleOnPress=(oneFollower) =>{
      this.props.navigation.navigate("OtherUserProfile",{
          githubLogin: oneFollower.login,
          githubId: oneFollower.id,  
      })
  };

  render() {

    if (this.state.loading){
      return (<Spinner/>)
    }

    const { usersToDisplay } = this.state;
    return (
      <Container>
        <ScrollView>
            <List>
                {usersToDisplay.map(oneUser => (
                    <ListItem button avatar key={oneUser.id} onPress={()=>this.handleOnPress(oneUser)}>
                    <Thumbnail source={{uri: oneUser.avatar_url}}/>
                    <H1>{oneUser.login}</H1>
                </ListItem>)
                )}
            </List>
        </ScrollView>
    </Container>);
  }
}

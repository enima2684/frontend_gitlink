import React, { Component } from "react";
import {ScrollView, View, Text} from 'react-native'
import { Container, Spinner, List, ListItem, Left, Thumbnail, H1, Alert, Right, Body } from "native-base";
import requestBuilder from "../lib/request";
import Octicons from "@expo/vector-icons/Octicons";
import colors from "../colors";

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
    this.setState({usersToDisplay: response.data.followers});
  };

  fetchFollowing = async (login) => {
    const req = await requestBuilder();
    let response = await req.get(`/users/following/list/${login}`);
    this.setState({usersToDisplay: response.data.following});
  };

  fetchData = async () => {
      try{

        const userName = this.props.navigation.getParam('userName');
        const screenType = this.props.navigation.getParam('screenType'); // followers or following

        if (screenType === 'Followers') {
          return this.fetchFollowers(userName);
        } else if (screenType === 'Following') {
          return this.fetchFollowing(userName);
        } else {
          throw new Error('screenType must be Following or Followers');
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
            <List style={{paddingTop: 0}}>
                {usersToDisplay.map(oneUser => (
                  <ListItem button thumbnail key={oneUser.id} onPress={()=>this.handleOnPress(oneUser)} style={{paddingTop: 20}}>
                    <Left>
                      <Thumbnail source={{ uri: oneUser.avatar_url }} />
                    </Left>

                    <Body style={{paddingBottom: 15, paddingTop: 20}}>
                      <Text style={{color: colors.GrayDark, fontWeight: '700', fontSize: 16}}>{oneUser.login}</Text>
                    </Body>

                    <Right style={{paddingBottom: 15, paddingTop: 20}}>
                      <Octicons name="chevron-right" size={20} color={colors.GrayDark } />
                    </Right>
                </ListItem>)
                )}
            </List>
        </ScrollView>
    </Container>);
  }
}

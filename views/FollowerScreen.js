import React, { Component } from "react";
import {ScrollView, View} from 'react-native'
import { Container, Spinner, List, ListItem, Left, Thumbnail, H1 } from "native-base";
import { authService } from "../lib/Authentication";
import requestBuilder from "../lib/request";

export default class FollowerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      followers: [],
      isLoading: true
    };
  }

  async componentDidMount(){

  }

  fetchData = async () => {
      try{
          this.setState{(isLoading: true, followers: [])}
          await 
      }
  }


  handleOnPress=(oneFollower) =>{
      this.props.navigation.navigate("OtherUserProfile",{
          githubLogin: oneFollower.login,
          githubId: oneFollower.id,  
      })
  }

  render() {
    const { followers } = this.state;
    return <Container>
    {this.state.loading && 
    <Spinner/>}
    <ScrollView>
        <List>
            {followers.map(oneFollower =>{
                return(
                    <ListItem button avatar key={oneFollower.id} onPress={this.handleOnPress(oneFollower)}>
                <Thumbnail source={{uri: oneFollower.avatar_url}}/>
                <H1>{oneFollower.login}</H1>
            </ListItem>
                )
            })}
        </List>
    </ScrollView>
    </Container>;
  }
}

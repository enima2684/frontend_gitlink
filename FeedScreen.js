import React from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";

import FeedPost from "./FeedPost";
import axios from "axios";

export default class FeedScreen extends React.Component {
  state = {
    loading: true,
    message: "hello",
    posts: [],
  };

  async componentWillMount() {
    const response = await axios.get(
      "https://api.github.com/users/griev04/events/public"
    );
    this.setState({
      posts: response.data,
      loading: false,
    });
  }

  handleButton = () => {
    this.setState({
      message: "button was clicked"
    });
  };

  buildPost(item){
    let displayText;
    switch (item.type) {
      case 'WatchEvent':
        displayText = <Text>{item.actor.login} {payload.action} watching {repo.name} at {created_at}</Text>;
        break;
      case 'CreateEvent':
        displayText = <Text>{item.actor.login} created {payload.ref_typ} {payload.ref} in {repo.name} at {created_at}</Text>;
        break;
      default:
        displayText = <Text>{item.actor.login} did something else: {item.type}</Text>
        break;
    }
    // console.log(displayText);
    return displayText;
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>FEED!!!!!</Text>
        {this.state.loading && <ActivityIndicator size="large" color="#00ff00" />}
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.listItem} />}
          data={this.state.posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <FeedPost item={item} navigation={this.props.navigation} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray"
  },
  listItem: { height: 1, width: "100%", backgroundColor: "lightgray" }
});

import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import FeedPost from "./FeedPost";
import axios from "axios";

// Temporary mockdata for development used in componentWillMount()
import data from "../mockData";

export default class FeedScreen extends React.Component {

  state = {
    loading: true,
    message: "hello",
    posts: []
  };

  async componentWillMount() {
    // DO NOT DELETE AXIOS GET REQUEST
    // const response = await axios.get(
    //   "https://api.github.com/users/griev04/events/public"
    // );
    const response = {data};
    this.setState({
      posts: response.data,
      loading: false
    });
  }

  handleButton = () => {
    this.setState({
      message: "button was clicked"
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.loading && (
          <ActivityIndicator size="large" color="#00ff00" padding="10%" />
        )}
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.listItem} />}
          data={this.state.posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <FeedPost item={item} navigation={this.props.navigation} />
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // height: "100%"
    // backgroundColor: "lightgray"
  },
  listItem: { height: 1, width: "100%", backgroundColor: "lightgray" }
});

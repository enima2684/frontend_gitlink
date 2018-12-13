import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from "react-native";
import FeedPost from "./FeedPost";

import { connect } from "react-redux";
import { act__initializePostArray } from "../stateManagement/actions";

import PropTypes from "prop-types";
import Octicons from "@expo/vector-icons/Octicons";
import { Card, CardItem, Thumbnail } from "native-base";

// Temporary mockdata for development used in componentWillMount()
// import data from "../mockData";
import requestBuilder from "../lib/request";

class FeedScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  state = {
    loading: true,
    refreshing: false,
    posts: []
  };

  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: "Feed List",
  //     headerRight: (
  //       <Octicons
  //         name="search"
  //         color="black"
  //         size={24}
  //         style={styles.searchIcon}
  //         onPress={() => navigation.navigate("Search")}
  //       />
  //     )
  //   };
  // };

  /**
   * Fetches from the server all the feeds of the user
   * @return {Promise<void>}
   */
  async fetchPosts() {
    try {
      const req = await requestBuilder();
      let response = await req.get("/posts/currentUser");
      return response.data.posts;
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  async updatePosts() {
    let posts = await this.fetchPosts();
    this.props.dispatch(act__initializePostArray(posts));
    this.setState({
      loading: false,
      refreshing: false
    });
  }

  componentWillMount() {
    this.updatePosts();
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    this.updatePosts();
  };

  render() {
    const { posts } = this.props;
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {this.state.loading && (
          <ActivityIndicator size="large" color="#00ff00" padding="10%" />
        )}
        {posts.map(onePost => {
          return (
            <Card key={onePost.id}>
              <CardItem>
                <FeedPost
                  feedEvent={onePost}
                  navigation={this.props.navigation}
                />
              </CardItem>
            </Card>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "2%"
  },
  listItem: { height: 1, width: "100%", backgroundColor: "lightgray" },
  searchIcon: { marginRight: 20 }
});

const mapStateToProps = ({ posts }) => ({ posts });
export default connect(mapStateToProps)(FeedScreen);

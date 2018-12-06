import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Button,
  Icon,
  Platform,
  RefreshControl
} from "react-native";
import FeedPost from "./FeedPost";
import PropTypes from "prop-types";
import axios from "axios";
import Octicons from "@expo/vector-icons/Octicons";

// Temporary mockdata for development used in componentWillMount()
import data from "../mockData";

export default class FeedScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  state = {
    loading: true,
    refreshing: false,
    posts: []
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Feed List",
      headerRight: (
        <Octicons
          name="search"
          color="black"
          size={24}
          style={styles.searchIcon}
          onPress={() => navigation.navigate("Search")}
        />
      )
    };
  };

  async fetchData() {
    // TEMPORARY MOCK DATA
    const response = { data };
    // const response = await axios.get("https://api.github.com/users/griev04/events/public");

    this.setState({
      posts: response.data,
      loading: false,
      refreshing: false
    });
  }

  componentWillMount() {
    this.fetchData();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData();
  };

  render() {
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
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.listItem} />}
          data={this.state.posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <FeedPost feedEvent={item} navigation={this.props.navigation} />
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "100%"
    // backgroundColor: "lightgray"
  },
  listItem: { height: 1, width: "100%", backgroundColor: "lightgray" },
  searchIcon: { marginRight: 20 }
});

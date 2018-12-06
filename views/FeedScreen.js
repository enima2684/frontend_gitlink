import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Button,
  Icon,
  Platform
} from "react-native";
import FeedPost from "./FeedPost";
import PropTypes from "prop-types";
import axios from "axios";

// Temporary mockdata for development used in componentWillMount()
import data from "../mockData";

export default class FeedScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  state = {
    loading: true,
    posts: []
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Feed List",
      headerRight: (
        <Button
          title="Search"
          onPress={() => navigation.navigate("Search")}
          color="#9cdaef"
        />
      )
    };
  };

  async componentWillMount() {
    // Temporary mock data:
    const response = { data };

    this.setState({
      posts: response.data,
      loading: false
    });
  }

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
            <FeedPost feedEvent={item} navigation={this.props.navigation} />
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

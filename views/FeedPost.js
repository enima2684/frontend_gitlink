import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Octicons from "@expo/vector-icons/Octicons";

import PostText from "../components/PostText";

export default class FeedPost extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    feedEvent: PropTypes.object.isRequired
  };

  /**
   *
   * @param {*} item
   * @param {*} userAction user clicks on post or on comment button. Possible values: details, comment
   */
  handleListTap(feedEvent, userAction = "details") {
    console.log(feedEvent.actor);
    this.props.navigation.navigate("Post", {
      // renderedPost: this.buildPost(feedEvent),
      feedEvent: feedEvent,
      userAction: userAction
    });
  }

  handleProfileTap(feedEvent) {
    console.log(feedEvent.actor);
    // THIS SHOULD REDIRECT TO SOMEONE'S PROFILE
    const githubId = feedEvent.actor.id;
    const githubLogin = feedEvent.actor.login;
    this.props.navigation.navigate("OtherUserProfile", {
      githubId: githubId,
      githubName: githubLogin
    });
  }

  render() {
    const { feedEvent } = this.props;
    return (
      <View style={styles.postContainer}>
        <TouchableOpacity onPress={() => this.handleProfileTap(feedEvent)} style={styles.pictureContainer}>
          <Image
            style={styles.picture}
            source={{
              uri: feedEvent.actor.avatar_url
            }}
          />
        </TouchableOpacity>
        <View style={styles.rightPost}>
          <TouchableOpacity onPress={() => this.handleListTap(feedEvent)}>
            <View style={styles.postHeader}>
              <Text style={styles.bold}>{feedEvent.actor.login}</Text>
              <Text>2m ago</Text>
            </View>
            <View style={styles.postText}>
              <PostText feedEvent={feedEvent} />
            </View>
          </TouchableOpacity>
          <View style={styles.postInteraction}>
            <TouchableOpacity style={styles.flexRow}>
              <Octicons name="squirrel" color={"tomato"} />
              <Text> Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleListTap(feedEvent, "comment")}
              style={styles.flexRow}
            >
              <Octicons name="comment" color={"tomato"} />
              <Text> Comment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: "96%",
    flexDirection: "row",
    paddingLeft: "2%"
  },
  rightPost: {
    flexShrink: 1
  },

  topPart: {
    flex: 1,
    flexDirection: "row"
  },
  pictureContainer: {
    paddingTop: 15
  },
  picture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
    marginRight: 10
  },
  postHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 5,
    width: "100%"
    // marginBottom: 10,
  },
  postText:{
    flexShrink: 1,
    flexWrap: "wrap",
  },
  postInteraction: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  bold: {
    fontWeight: "bold"
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  }
});

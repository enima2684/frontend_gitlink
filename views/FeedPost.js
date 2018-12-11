import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import PostText from "../components/PostText";
import PostInteractionSection from "../components/PostInteractionSections";

export default class FeedPost extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    feedEvent: PropTypes.object.isRequired
  };
  state = {
    feedEvent: this.props.feedEvent    
  }

  /**
   *
   * @param {*} item
   * @param {*} userAction user clicks on post or on comment button. Possible values: details, comment
   */
  handleListTap(feedEvent, userAction = "details") {
    console.log(feedEvent.actor);
    this.props.navigation.navigate("Post", {
      feedEvent: feedEvent,
      userAction: userAction,
      handleProfileTap: (feedEvent) => this.handleProfileTap(feedEvent),
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

  updateFeedEvent(feedEvent) {
    feedEvent.userLiked = true;
    this.setState({
      feedEvent
    })
  }

  render() {
    const {feedEvent} = this.state;
    return (
      <View style={styles.postContainer}>
        <TouchableOpacity
          onPress={() => this.handleProfileTap(feedEvent)}
          style={styles.pictureContainer}
        >
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
              <Text>
                {moment(feedEvent.created_at, "YYYY-MM-DD HH:mm:ssZ").fromNow()}
              </Text>
            </View>
            <View style={styles.postText}>
              <PostText feedEvent={feedEvent} />
            </View>
          </TouchableOpacity>
          <PostInteractionSection feedEvent={feedEvent} navigation={this.props.navigation} onLikePress={(feedEvent) => this.updateFeedEvent(feedEvent)}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    flexDirection: "row"
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
  },
  postText: {
    flexShrink: 1,
    flexWrap: "wrap"
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
    alignItems: "center"
  }
});

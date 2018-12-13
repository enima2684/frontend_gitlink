import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import PostText from "../components/PostText";
import PostInteractionSection from "../components/PostInteractionSection";
import { Thumbnail } from "native-base";

export default class FeedPost extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    feedEvent: PropTypes.object.isRequired
  };
  state = {
    feedEvent: this.props.feedEvent    
  };

  /**
   *
   * @param {*} item
   * @param {*} userAction user clicks on post or on comment button. Possible values: details, comment
   */
  handleListTap(feedEvent, userAction = "details") {
    this.props.navigation.navigate("Post", {
      feedEvent: feedEvent,
      userAction: userAction,
      handleProfileTap: feedEvent => this.handleProfileTap(feedEvent)
    });
  }

  handleProfileTap(feedEvent) {
    // THIS SHOULD REDIRECT TO SOMEONE'S PROFILE
    const githubId = feedEvent.actor.id;
    const githubLogin = feedEvent.actor.login;
    this.props.navigation.navigate("OtherUserProfile", {
      githubId,
      githubLogin
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
        >
          <Thumbnail round
            source={{
              uri: feedEvent.actor.avatar_url
            }}
          />
        </TouchableOpacity>
        <View style={styles.rightPost}>
          <TouchableOpacity onPress={() => this.handleListTap(feedEvent)}>
              <Text style={styles.bold}>{feedEvent.actor.login}</Text>
              <PostText feedEvent={feedEvent} parentComponent={"FeedPost"}/>
          </TouchableOpacity>
          <View style={styles.postBottom}>
            <PostInteractionSection
              feedEvent={feedEvent}
              navigation={this.props.navigation}
              onLikePress={feedEvent => this.updateFeedEvent(feedEvent)}
            />
            <Text>
              {moment(feedEvent.created_at, "YYYY-MM-DD HH:mm:ssZ").fromNow()}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightPost: {
    flexShrink: 1,
    flexDirection: "column",
    justifyContent: "flex-start",

  },
  postText: {
    flexShrink: 1,
    flexWrap: "wrap",
  },
  bold: {
    fontWeight: "bold",
    paddingBottom: "2%",
    paddingLeft: "2%"
  },
  postBottom:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

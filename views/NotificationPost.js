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
    this.props.navigation.navigate("NotificationDetail", {
      feedEvent: feedEvent,
      handleProfileTap: feedEvent => this.handleProfileTap(feedEvent)
    });
  }

  handleProfileTap(login) {
    this.props.navigation.navigate("OtherUserProfile", {
      githubLogin: login
    });
  }

  updateFeedEvent(feedEvent) {
    feedEvent.userLiked = true;
    this.setState({
      feedEvent
    });
  }

  render() {
    const { feedEvent } = this.props;
    // let feedEventforTap = feedEvent;
    let avatar_url, login, created_at, feedEventforTap;
    if (feedEvent.type.includes("GitLink")) {
      created_at = feedEvent.created_at;
      feedEventforTap = feedEvent.githubPost;
      let gitLinkText;
      if (feedEvent.type === "GitLinkLike") {
        const { likes } = feedEvent;
        avatar_url = likes[0].userAvatar;
        login = likes[0].userName;
        gitLinkText = (
          <Text>
            <Text style={styles.bold}>
              {`${likes[0].userName} ${
                likes.length > 1 ? `and other ${likes.length - 1} ` : " "
              }`}
            </Text>
            liked a post
          </Text>
        );
      } else {
        const { comments } = feedEvent;
        avatar_url = comments[0].userAvatar;
        login = comments[0].userName;
        let commenterNames = comments.map(comment => comment.userName);
        commenterNames = Array.from(new Set(commenterNames))
          .slice(0, 3)
          .join(", ");
        gitLinkText = (
          <Text>
            <Text style={styles.bold}>{commenterNames}</Text> commented on a
            post
          </Text>
        );
      }
    } else {
      avatar_url = feedEvent.actor.avatar_url;
      login = feedEvent.actor.login;
      created_at = feedEvent.created_at;
      feedEventforTap = feedEvent;
    }
    return (
      <View style={styles.postContainer}>
        <TouchableOpacity
          onPress={() => this.handleProfileTap(login)}
        >
          <Thumbnail
            round
            source={{
              uri: avatar_url
            }}
          />
        </TouchableOpacity>
        <View style={styles.rightPost}>
          {/* <TouchableOpacity onPress={() => this.handleListTap(feedEventforTap)}> */}
            <Text style={styles.bold}>{login}</Text>
            <PostText feedEvent={feedEvent} parentComponent={"NotificationPost"} />
          {/* </TouchableOpacity> */}
          <View style={styles.postBottom}>
            {/* <PostInteractionSection
              feedEvent={feedEventforTap}
              navigation={this.props.navigation}
              onLikePress={feedEvent => this.updateFeedEvent(feedEventforTap)}
            /> */}
            <Text>{moment(created_at, "YYYY-MM-DD HH:mm:ssZ").fromNow()}</Text>
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
    justifyContent: "space-between"
  },
  rightPost: {
    flexShrink: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  postText: {
    flexShrink: 1,
    flexWrap: "wrap"
  },
  bold: {
    fontWeight: "bold",
    paddingBottom: "2%",
    paddingLeft: "2%"
  },
  postBottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

function buildPost(feedEvent) {
  let displayText;
  switch (feedEvent.type) {
    case "WatchEvent":
      displayText = `${feedEvent.actor.login} ${
        feedEvent.payload.action
      } watching ${feedEvent.repo.name} at ${feedEvent.created_at}`;
      break;
    case "CreateEvent":
      displayText = `${feedEvent.actor.login} created ${
        feedEvent.payload.ref_type
      } ${feedEvent.payload.ref} in ${
        feedEvent.payload.master_branch
      } inside the repo ${feedEvent.repo.name} at ${feedEvent.created_at}`;
      break;

    case "ForkEvent":
      displayText = `${feedEvent.actor.login} forked ${
        feedEvent.repo.name
      } of ${feedEvent.org.login} at ${feedEvent.created_at}`;
      break;
    case "PushEvent":
      displayText = `${
        feedEvent.actor.login
      } commited ${feedEvent.payload.before.substring(0, 7)} to ${
        feedEvent.payload.ref
      } in ${feedEvent.payload.master_branch} inside the repo ${
        feedEvent.repo.name
      } at ${feedEvent.created_at}`;
      break;
    case "PullRequestEvent":
      displayText = `${feedEvent.actor.login} created ${
        feedEvent.payload.ref_type
      } ${feedEvent.payload.ref} in ${
        feedEvent.payload.master_branch
      } inside the repo ${feedEvent.repo.name} at ${feedEvent.created_at}`;
      break;

    default:
      displayText = `${feedEvent.actor.login} did something else: ${
        feedEvent.type
      }`;
      break;
  }
  return displayText;
}

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
    this.props.navigation.navigate("Post", {
      displayText: buildPost(feedEvent),
      item: feedEvent,
      userAction: userAction
    });
  }

  render() {
    const { feedEvent } = this.props;
    const displayText = buildPost(feedEvent);
    return (
      <View style={styles.post}>
        <TouchableOpacity
          style={styles.postData}
          onPress={() => this.handleListTap(feedEvent)}
        >
          <Image
            style={styles.profilePicture}
            source={{
              uri: feedEvent.actor.avatar_url
            }}
          />
          <Text style={styles.postText}>{displayText}</Text>
        </TouchableOpacity>
        <View style={styles.postInteraction}>
          <TouchableOpacity>
            <Text>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleListTap(feedEvent, "comment")}
          >
            <Text>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    flex: 1,
    backgroundColor: "#fff"
  },
  postInteraction: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5
  },
  postData: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
    marginRight: 10
  },
  postText: { width: "80%" }
});

import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

function buildPost(item) {
  let displayText;
  switch (item.type) {
    case "WatchEvent":
      displayText = `${item.actor.login} ${item.payload.action} watching ${
        item.repo.name
      } at ${item.created_at}`;
      break;
    case "CreateEvent":
      displayText = `${item.actor.login} created ${item.payload.ref_type} ${
        item.payload.ref
      } in ${item.payload.master_branch} inside the repo ${
        item.repo.name
      } at ${item.created_at}`;
      break;

    case "ForkEvent":
      displayText = `${item.actor.login} forked ${item.repo.name} of ${
        item.org.login
      } at ${item.created_at}`;
      break;
    case "PushEvent":
      displayText = `${item.actor.login} commited ${item.payload.before} to ${
        item.payload.ref
      } in ${item.payload.master_branch} inside the repo ${
        item.repo.name
      } at ${item.created_at}`;
      break;
    case "PullRequestEvent":
      displayText = `${item.actor.login} created ${item.payload.ref_type} ${
        item.payload.ref
      } in ${item.payload.master_branch} inside the repo ${
        item.repo.name
      } at ${item.created_at}`;
      break;

    default:
      displayText = `${item.actor.login} did something else: ${item.type}`;
      break;
  }
  return displayText;
}

export default class FeedScreen extends React.Component {
  
  /**
   * 
   * @param {*} item 
   * @param {*} userAction user clicks on post or on comment button. Possible values: details, comment
   */
  handleListTap(item, userAction='details') {
    this.props.navigation.navigate("Post", {
      displayText: buildPost(item),
      item: item,
      userAction: userAction,
    });
  }

  render() {
    const displayText = buildPost(this.props.item);
    return (
      <View style={styles.post}>
        <TouchableOpacity
          style={styles.postData}
          onPress={() => this.handleListTap(this.props.item)}
        >
          <Image
            style={styles.profilePicture}
            source={{
              uri: this.props.item.actor.avatar_url
            }}
          />
          <Text style={styles.postText}>{displayText}</Text>
        </TouchableOpacity>
        <View style={styles.postInteraction}>
          <TouchableOpacity>
            <Text>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleListTap(this.props.item, 'comment')}>
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

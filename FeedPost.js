import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default class FeedScreen extends React.Component {
  
  handleListTap(item) {
    this.props.navigation.navigate("Post", {
      displayText: this.buildPost(item),
      item: item
    });
  }

  buildPost(item){
    let displayText;
    switch (item.type) {
      case 'WatchEvent':
        displayText = `${item.actor.login} ${item.payload.action} watching ${item.repo.name} at ${item.created_at}`;
        break;
      case 'CreateEvent':
        displayText = `${item.actor.login} created ${item.payload.ref_typ} ${item.payload.ref} in ${item.repo.name} at ${item.created_at}`;
        break;
      default:
        displayText = `${item.actor.login} did something else: ${item.type}`
        break;
    }
    console.log(displayText);
    return displayText;
  }

  render() {
    const displayText = this.buildPost(this.props.item);
    console.log('here');
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
          <Text style={{ padding: 20 }}>{displayText}</Text>
        </TouchableOpacity>
        <View style={styles.postInteraction}>
          <TouchableOpacity>
            <Text>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity>
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
    padding: 10
  },
  profilePicture: { width: 50, height: 50, borderRadius: 25 }
});
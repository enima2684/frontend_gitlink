import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default class PostScreen extends React.Component {
  state = {
    message: "hello"
  };
  handleListTap(item, userAction='details') {
    this.props.navigation.navigate("Post", {
      displayText: this.buildPost(item),
      item: item,
      userAction: userAction,
    });
  }
  handleButton = () => {
    this.setState({
      message: "button was clicked"
    });
  };

  render() {
    const item = this.props.navigation.getParam("item");
    const displayText = this.props.navigation.getParam("displayText");
    return (
      <View style={styles.container}>
        <View style={styles.postData}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Profile")}
            >
            <Image
              style={styles.profilePicture}
              source={{
                uri: item.actor.avatar_url
              }}
            />
          </TouchableOpacity>
          <Text style={styles.postText}>{displayText}</Text>
        </View>

        <View style={styles.postInteraction}>
          <TouchableOpacity>
            <Text>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleListTap(item, "comment")}>
            <Text>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#fff"
  },
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

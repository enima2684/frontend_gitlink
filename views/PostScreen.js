import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import FeedPost from "./FeedPost";

export default class PostScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    return this.props.navigation.getParam("renderedPost");
    // const item = this.props.navigation.getParam("item");
    // const displayText = this.props.navigation.getParam("displayText");
    // return (
    //   <View style={styles.container}>
    //     <View style={styles.postData}>
    //       <TouchableOpacity
    //         onPress={() => this.props.navigation.navigate("Profile")}
    //       >
    //         <Image
    //           style={styles.profilePicture}
    //           source={{
    //             uri: item.actor.avatar_url
    //           }}
    //         />
    //       </TouchableOpacity>
    //       <Text style={styles.postText}>{displayText}</Text>
    //     </View>

    //     <View style={styles.postInteraction}>
    //       <TouchableOpacity>
    //         <Text>Like</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity onPress={() => {}}>
    //         <Text>Comment</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // );
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

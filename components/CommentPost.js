import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

export default class CommentPost extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired
  };

  handleProfileTap(comment) {
    const githubId = comment.actor.id;
    const githubLogin = comment.actor.login;
    this.props.navigation.navigate("OtherUserProfile", {
      githubId: githubId,
      githubName: githubLogin
    });
  }

  render() {
    const {comment} = this.props;
    return (
      <View style={styles.postContainer}>
        <TouchableOpacity
          onPress={() => this.handleProfileTap(comment)}
        >
          <Image
            style={styles.picture}
            source={{
              uri: comment.actor.avatar_url
            }}
          />
        </TouchableOpacity>
        <View style={styles.rightPost}>
          <View style={styles.postHeader}>
            <Text style={styles.bold}>{comment.actor.login}</Text>
            <Text>2m ago</Text>
          </View>
          <View style={styles.postText}>
            <Text>{comment.commentText}</Text>
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
  postText:{
    flexShrink: 1,
    flexWrap: "wrap",
  },
  bold: {
    fontWeight: "bold"
  },
});

import React from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import PropTypes from "prop-types";
import requestBuilder from "../lib/request";

import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Font } from "expo";

export default class PostInteractionSection extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    feedEvent: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    let numberOfComments = props.feedEvent.comments
      ? props.feedEvent.comments.length
      : 0;
    let numberOfLikes = props.feedEvent.likes
      ? props.feedEvent.likes.length
      : 0;
    let userLiked = props.feedEvent.userLiked
      ? props.feedEvent.userLiked
      : false;
    this.state = {
      numberOfLikes,
      numberOfComments,
      userLiked: userLiked,
      fontLoaded: false
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      fa_solid_900: require("../assets/fonts/fa-solid-900.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  handleListTap(feedEvent, userAction = "details") {
    this.props.navigation.navigate("Post", {
      feedEvent: feedEvent,
      userAction: userAction
    });
  }

  async handleLikeTap(feedEvent) {
    if (!this.state.userLiked) {
      try {
        const req = await requestBuilder();
        await req.post("/posts/handleLike", {
          feedId: feedEvent.id
        });
        this.setState({
          userLiked: true,
          numberOfLikes: this.state.numberOfLikes + 1
        });
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }
  }

  render() {
    const { feedEvent } = this.props;
    const { numberOfLikes, numberOfComments, userLiked } = this.state;
    return (
      <View style={styles.postInteraction}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => this.handleLikeTap(feedEvent)}
        >
          {this.state.fontLoaded ? (
            <Text>
              {numberOfLikes > 0 ? `${numberOfLikes} ` : ""}
              <FontAwesome
                name={userLiked ? "thumbs-up" : "thumbs-o-up"}
                color={"#8cc342"}
              />
              {" Like"}
            </Text>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.handleListTap(feedEvent, "comment")}
          style={styles.flexRow}
        >
          <Text>{numberOfComments > 0 ? `${numberOfComments} ` : ""}</Text>
          <Octicons name="comment" color={"#8cc342"} />
          <Text> Comment</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postInteraction: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center"
  }
});

import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";

import PropTypes from "prop-types";
import requestBuilder from "../lib/request";

import { connect } from "react-redux";
import { act__editPostArray } from "../stateManagement/actions";

import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Font } from "expo";

class PostInteractionSection extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    feedEvent: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
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
    if (!feedEvent.userLiked) {
      try {
        const req = await requestBuilder();

        const [likeResponse, user] = await Promise.all([
          // Send like to the backend
          req.post("/posts/handleLike", {
            feedId: feedEvent.id
          }),
          // Get user details from the backend
          req.get("/users/current")
        ]);
        const userName = user.data.user.login;

        // Save like data in feed event object for redux
        if (!feedEvent.likes) feedEvent.likes = [];
        feedEvent.likes.push(userName);
        feedEvent.userLiked = true;

        // Dispatch new feed event to redux
        this.props.dispatch(act__editPostArray(feedEvent));
      } catch (err) {
        console.log(err);
        Alert.alert("Oups, something went wrong !", err.message);
      }
    }
  }

  render() {
    const { feedEvent } = this.props;
    const feedEventToDisplay = this.props.posts.find(
      post => post.id === feedEvent.id
    );
    const numberOfComments = feedEventToDisplay.comments.length;
    const numberOfLikes = feedEventToDisplay.likes.length;
    const userLiked = feedEventToDisplay.userLiked;
    return (
      <View style={styles.postInteraction}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => this.handleLikeTap(feedEventToDisplay)}
        >
          {this.state.fontLoaded && (
            <Text style={styles.fontbold}>
              {numberOfLikes > 0 ? `${numberOfLikes} ` : ""}
              <FontAwesome
                name={userLiked ? "thumbs-up" : "thumbs-o-up"}
                color={"#28A745"}
                size={20}
              />
              {" Like"}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.handleListTap(feedEventToDisplay, "comment")}
          style={styles.flexRow}
        >
          <Text>{numberOfComments > 0 ? `${numberOfComments} ` : ""}</Text>
          <Octicons name="comment" color={"#28A745"} size={20} />
          <Text style={styles.fontbold}> Comment</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postInteraction: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    paddingLeft: "2%"
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  fontbold: {
    fontWeight: "bold"
  }
});

const mapStateToProps = ({ posts }) => ({ posts });
export default connect(mapStateToProps)(PostInteractionSection);

import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Octicons from "@expo/vector-icons/Octicons";
import moment from "moment";

import PostText from "../components/PostText";

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
    console.log(feedEvent.actor);
    this.props.navigation.navigate("Post", {
      feedEvent: feedEvent,
      userAction: userAction
    });
  }

  handleProfileTap(feedEvent) {
    console.log(feedEvent.actor);
    // THIS SHOULD REDIRECT TO SOMEONE'S PROFILE
    const githubId = feedEvent.actor.id;
    const githubLogin = feedEvent.actor.login;
    this.props.navigation.navigate("OtherUserProfile", {
      githubId: githubId,
      githubName: githubLogin
    });
  }

  render() {
    const { feedEvent } = this.props;
    // PLACEHOLDER FOR COMMENTS INSIDE AN EVENT (DATA COMES FROM FEEDEVENT IN THE FEEDLIST)
    feedEvent.comments = [
      {
        actor: {
          id: 18719688,
          login: "griev04",
          display_login: "griev04",
          gravatar_id: "",
          url: "https://api.github.com/users/griev04",
          avatar_url: "https://avatars.githubusercontent.com/u/18719688?"
        },
        commentText:
          "Wow, this is so cool! oiafhsioasnhioasnhoifnh oiafsoijfpiaj oaijfspoasjfio japfjaspo jpaojsfpoasj pojapofjsapojpojpoas jmpofajspofjsap!",
        _id: "389ufj93u893ur8f3jhq89",
        createdAt: "2018-12-09 19:00:10Z"
      },
      {
        actor: {
          id: 43408092,
          login: "nrlfrh",
          url: "https://api.github.com/users/nrlfrh",
          avatar_url: "https://avatars1.githubusercontent.com/u/43408092?v=4"
        },
        commentText:
          "Please, add more! oiafhsioasnhioasnhoifnh oiafsoijfpiaj oaijfspoasjfio japfjaspo jpaojsfpoasj pojapofjsapojpojpoas jmpofajspofjsap!",
        _id: "389ufj93u893ur8f3jhq90",
        createdAt: "2018-12-09 20:06:10Z"
      },
      {
        actor: {
          id: 18719688,
          login: "griev04",
          display_login: "griev04",
          gravatar_id: "",
          url: "https://api.github.com/users/griev04",
          avatar_url: "https://avatars.githubusercontent.com/u/18719688?"
        },
        commentText:
          "Wow, this is so cool! oiafhsioasnhioasnhoifnh oiafsoijfpiaj oaijfspoasjfio japfjaspo jpaojsfpoasj pojapofjsapojpojpoas jmpofajspofjsap!",
        _id: "389ufj93u893ur8f3jhq96",
        createdAt: "2018-12-09 20:15:10Z"
      },
      {
        actor: {
          id: 43408092,
          login: "nrlfrh",
          url: "https://api.github.com/users/nrlfrh",
          avatar_url: "https://avatars1.githubusercontent.com/u/43408092?v=4"
        },
        commentText:
          "Please, add more! oiafhsioasnhioasnhoifnh oiafsoijfpiaj oaijfspoasjfio japfjaspo jpaojsfpoasj pojapofjsapojpojpoas jmpofajspofjsap!",
        _id: "389ufj93u893ur8f3jhq92",
        createdAt: "2018-12-09 20:03:10Z"
      }
    ];
    feedEvent.likes = [
      {
        actor: {
          id: 18719688,
          login: "griev04",
          gravatar_id: "",
          url: "https://api.github.com/users/griev04",
          avatar_url: "https://avatars.githubusercontent.com/u/18719688?"
        },
        _id: "389ufj93u893ur9f3jhq98",
        createdAt: "2018-12-09 20:02:10Z"
      },
      {
        actor: {
          id: 43408092,
          login: "nrlfrh",
          url: "https://api.github.com/users/nrlfrh",
          avatar_url: "https://avatars1.githubusercontent.com/u/43408092?v=4"
        },
        _id: "389ufj93u893ur9f3jhq93",
        createdAt: "2018-12-09 20:00:10Z"
      }
    ];
    return (
      <View style={styles.postContainer}>
        <TouchableOpacity
          onPress={() => this.handleProfileTap(feedEvent)}
          style={styles.pictureContainer}
        >
          <Image
            style={styles.picture}
            source={{
              uri: feedEvent.actor.avatar_url
            }}
          />
        </TouchableOpacity>
        <View style={styles.rightPost}>
          <TouchableOpacity onPress={() => this.handleListTap(feedEvent)}>
            <View style={styles.postHeader}>
              <Text style={styles.bold}>{feedEvent.actor.login}</Text>
              <Text>{moment(feedEvent.created_at, "YYYY-MM-DD HH:mm:ssZ").fromNow()}</Text>
            </View>
            <View style={styles.postText}>
              <PostText feedEvent={feedEvent} />
            </View>
          </TouchableOpacity>
          <View style={styles.postInteraction}>
            <TouchableOpacity style={styles.flexRow}>
              <Text>
                {feedEvent._doc ? `${feedEvent._doc.likes.length} ` : ""}
              </Text>
              <Octicons name="thumbsup" color={"#8cc342"} />
              <Text> Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleListTap(feedEvent, "comment")}
              style={styles.flexRow}
            >
              <Text>
                {feedEvent._doc ? `${feedEvent._doc.comments.length} ` : ""}
              </Text>
              <Octicons name="comment" color={"#8cc342"} />
              <Text> Comment</Text>
            </TouchableOpacity>
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
  },
  rightPost: {
    flexShrink: 1
  },

  topPart: {
    flex: 1,
    flexDirection: "row"
  },
  pictureContainer: {
    paddingTop: 15
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
  postText: {
    flexShrink: 1,
    flexWrap: "wrap"
  },
  postInteraction: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  bold: {
    fontWeight: "bold"
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center"
  }
});

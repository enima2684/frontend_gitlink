import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  FlatList
} from "react-native";
import { Button } from "native-base";
import PropTypes from "prop-types";
import PostText from "../components/PostText";
import CommentPost from "../components/CommentPost";
import moment from "moment";
import PostInteractionSection from "../components/PostInteractionSections";
import requestBuilder from "../lib/request";
import Octicons from "@expo/vector-icons/Octicons";

export default class PostScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  state = {
    feedEvent: this.props.navigation.getParam("feedEvent"),
    comments: this.props.navigation.getParam("feedEvent").comments
      ? this.props.navigation.getParam("feedEvent").comments.reverse()
      : [],
    commentContent: ""
  };

  componentWillMount() {
    const focusKeyboard =
      this.props.navigation.getParam("userAction") == "comment" ? true : false;
    this.setState({
      focusKeyboard: focusKeyboard
    });
  }

  submitComment = async () => {
    if (this.state.commentContent !== "") {
      try {
        const feedId = this.props.navigation.getParam("feedEvent").id;
        let { commentContent, feedEvent } = this.state;

        // Send comment to server and retrieve user data
        const req = await requestBuilder();

        let response = await req.post("/posts/comments", {
          feedId,
          commentContent
        });
        let user = await req.get("/users/current");

        // Create comment for display
        const { avatar_url, login, id } = user.data.user;
        let newComment = {
          avatar_url,
          login,
          userId: id,
          timestamp: new Date(),
          comment: commentContent
        };

        let comments = this.state.comments
          ? [newComment, ...this.state.comments]
          : [newComment];
        // feedEvent.comments = commentsArray;
        this.setState({ feedEvent, comments, commentContent: "" });
        return response.data;
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    }
  };

  render() {
    const { feedEvent } = this.state;
    const handleProfileTap = this.props.navigation.getParam("handleProfileTap");
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
        <View style={styles.postContainer}>
          <TouchableOpacity onPress={() => handleProfileTap(feedEvent)}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: feedEvent.actor.avatar_url
              }}
            />
          </TouchableOpacity>
          <View style={styles.postBox}>
            <View style={styles.postHeader}>
              <Text style={styles.bold}>{feedEvent.actor.login}</Text>
              <Text>
                {moment(feedEvent.created_at, "YYYY-MM-DD HH:mm:ssZ").fromNow()}
              </Text>
            </View>
            <PostText feedEvent={feedEvent} />
          </View>
        </View>
        <PostInteractionSection
          feedEvent={feedEvent}
          navigation={this.props.navigation}
        />

        <View style={styles.commentContainer}>
          <View style={styles.commentBar}>
            <TextInput
              style={styles.input}
              placeholder="Type your comment here.."
              onChangeText={commentContent => this.setState({ commentContent })}
              value={this.state.commentContent}
              autoFocus={this.state.focusKeyboard}
              onSubmitEditing={this.submitComment}
            />
            <Button transparent onPress={this.submitComment}>
              <Octicons size={24} name="pencil" color={"#8cc342"} />
            </Button>
          </View>

          <ScrollView style={styles.commentSection}>
            <View>
              <FlatList
                ItemSeparatorComponent={() => <View style={styles.listItem} />}
                data={this.state.comments}
                keyExtractor={item => item.timestamp}
                renderItem={({ item }) => (
                  <CommentPost
                    comment={item}
                    navigation={this.props.navigation}
                  />
                )}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
    backgroundColor: "#fff",
    padding: "2%"
  },
  commentContainer: {
    flexShrink: 1
  },
  commentSection: {
    flexShrink: 1,
    flexGrow: 0
  },
  postContainer: {
    flexDirection: "row",
    backgroundColor: "#fff"
  },
  postBox: {
    flexShrink: 1,
    flexWrap: "wrap"
  },
  postHeader: { flexDirection: "row", justifyContent: "space-between" },
  postInteraction: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "1%"
  },
  bold: {
    fontWeight: "bold"
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 5,
    marginRight: 10
  },
  commentBar: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    width: "80%"
  },
  button: {
    width: "20%"
  }
});

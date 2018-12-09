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
  FlatList,
  Button
} from "react-native";
import PropTypes from "prop-types";
import PostText from "../components/PostText";
import Octicons from "@expo/vector-icons/Octicons";
import CommentPost from "../components/CommentPost";
import moment from "moment";

export default class PostScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const feedEvent = this.props.navigation.getParam("feedEvent");
    const { comments, likes } = feedEvent;
    this.state = { commentBox: "", comments, likes };
  }

  componentWillMount() {
    const focusKeyboard =
      this.props.navigation.getParam("userAction") == "comment" ? true : false;
    this.setState({
      focusKeyboard: focusKeyboard
    });
  }

  handleProfileTap(feedEvent) {
    // THIS SHOULD REDIRECT TO SOMEONE'S PROFILE
    const githubId = feedEvent.actor.id;
    const githubLogin = feedEvent.actor.login;
    this.props.navigation.navigate("OtherUserProfile", {
      githubId: githubId,
      githubName: githubLogin
    });
  }

  submitComment() {}

  render() {
    const { comments, likes } = this.state;
    const feedEvent = this.props.navigation.getParam("feedEvent");
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
        <View style={styles.postContainer}>
          <TouchableOpacity onPress={() => this.handleProfileTap(feedEvent)}>
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
              <Text>{moment(feedEvent.created_at, "YYYY-MM-DD HH:mm:ssZ").fromNow()}</Text>
            </View>
            <PostText feedEvent={feedEvent} />
          </View>
        </View>
        <View style={styles.postInteraction}>
          <TouchableOpacity style={styles.flexRow}>
            <Text>{likes.length > 0 ? `${likes.length} ` : ""}</Text>
            <Octicons name="thumbsup" color={"#b8e9f7"} />
            <Text> Like</Text>
          </TouchableOpacity>
          <View style={styles.flexRow}>
            <Text>{comments.length > 0 ? `${comments.length} ` : ""}</Text>
            <Octicons name="comment" color={"#b8e9f7"} />
            <Text> Comment</Text>
          </View>
        </View>

        <View style={styles.commentContainer}>
          <View style={styles.commentBar}>
            <TextInput
              style={styles.input}
              onChangeText={commentBox => this.setState({ commentBox })}
              value={this.state.commentBox}
              autoFocus={this.state.focusKeyboard}
            />
            <Button
              onPress={this.submitComment}
              title="Submit"
              color="#b8e9f7"
              accessibilityLabel="Submit a comment"
              style={styles.button}
            />
          </View>
          <ScrollView style={styles.commentSection}>
            <View>
              <FlatList
                ItemSeparatorComponent={() => <View style={styles.listItem} />}
                data={comments}
                keyExtractor={item => item._id}
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
    flexShrink: 1,
  },
  commentSection: {
    flexShrink: 1,
    flexGrow: 0,
  },
  postContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
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
    width: 75,
    height: 75,
    borderRadius: 100,
    marginLeft: 5,
    marginRight: 10
  },
  commentBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 1,
    height: 40,
    marginBottom: "1%"
  },
  input: {
    padding: 10,
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  button: {
    width: "20%"
  }
});

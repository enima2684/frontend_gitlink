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
import CommentPost from "../components/CommentPost";
import moment from "moment";
import PostInteractionSection from "../components/PostInteractionSections";
import requestBuilder from "../lib/request";

export default class PostScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  state = {
    feedEvent: this.props.navigation.getParam("feedEvent"),
    commentContent: ""
  }

  componentWillMount() {
    const focusKeyboard =
    this.props.navigation.getParam("userAction") == "comment" ? true : false;
    this.setState({
      focusKeyboard: focusKeyboard
    });
  }

  submitComment = async () => {
    try {
      const feedId = this.props.navigation.getParam("feedEvent").id;
      const {commentContent} = this.state;

      const req = await requestBuilder();
      
      let response = await req.post('/posts/comments', {feedId, commentContent});
      return response.data;
    }
    catch(err){
      console.log(err);
      alert(err.message);
    }
  }

  render() {
    const {feedEvent} = this.state;
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
              <Text>{moment(feedEvent.created_at, "YYYY-MM-DD HH:mm:ssZ").fromNow()}</Text>
            </View>
            <PostText feedEvent={feedEvent} />
          </View>
        </View>
        <PostInteractionSection feedEvent={feedEvent} navigation={this.props.navigation}/>

        <View style={styles.commentContainer}>
          <View style={styles.commentBar}>
            <TextInput
              style={styles.input}
              onChangeText={commentContent => this.setState({ commentContent })}
              value={this.state.commentContent}
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
                data={feedEvent.comments}
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

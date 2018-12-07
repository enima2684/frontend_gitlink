import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PropTypes from "prop-types";
import PostText from "../components/PostText";
import Octicons from "@expo/vector-icons/Octicons";

export default class PostScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { query: "" };
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

  render() {
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
            <Text style={styles.bold}>{feedEvent.actor.login}</Text>
            <PostText feedEvent={feedEvent} />
          </View>
        </View>
        <View style={styles.postInteraction}>
          <TouchableOpacity style={styles.flexRow}>
            <Octicons name="squirrel" color={"tomato"} />
            <Text> Like</Text>
          </TouchableOpacity>
          <View style={styles.flexRow}>
            <Octicons name="comment" color={"tomato"} />
            <Text> N Comments</Text>
          </View>
        </View>
        <View style={styles.commentContainer}>
          <TextInput
            style={styles.input}
            onChangeText={query => this.setState({ query })}
            value={this.state.query}
            autoFocus={this.state.focusKeyboard}
          />
          <ScrollView style={styles.commentSection}>
            <View><Text>IMG + Comment</Text></View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  commentContainer: {
    flexShrink: 1
  },
  commentSection: {
    flexShrink: 1,
    flexGrow: 0
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    width: "96%",
    paddingLeft: "2%",
    paddingTop: 10
  },
  postContainer: {
    flexDirection: "row"
  },
  postBox: {
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
  },
  profilePicture: {
    width: 75,
    height: 75,
    borderRadius: 100,
    marginLeft: 5,
    marginRight: 10
  },
  input: {
    marginTop: 10,
    padding: 10,
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  }
});

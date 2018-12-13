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
import { Button, Thumbnail, Card, CardItem } from "native-base";

import PropTypes from "prop-types";
import PostText from "../components/PostText";
import CommentPost from "../components/CommentPost";
import moment from "moment";
import PostInteractionSection from "../components/PostInteractionSection";
import requestBuilder from "../lib/request";
import Octicons from "@expo/vector-icons/Octicons";

export default class NotificationDetailScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      commentContent: ""
    };
  }

  render() {
    let feedEventToDisplay = this.props.navigation.getParam("feedEvent");
    if (feedEventToDisplay.type.includes("GitLink")){
      feedEventToDisplay = feedEventToDisplay.githubPost;
    }
    let feedEventToDisplay;
    const handleProfileTap = this.props.navigation.getParam("handleProfileTap");
    return (
      <View style={styles.mainContainer}>
        <Card>
          <CardItem>
            <ScrollView>
              <View style={styles.postContainer}>
                <TouchableOpacity
                  onPress={() => handleProfileTap(feedEventToDisplay)}
                >
                  <Thumbnail
                    round
                    source={{
                      uri: feedEventToDisplay.actor.avatar_url
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.postBox}>
                  <View style={styles.postHeader}>
                    <Text style={styles.bold}>
                      {feedEventToDisplay.actor.login}
                    </Text>
                    <PostText
                      feedEvent={feedEventToDisplay}
                      parentComponent=""
                    />
                  </View>

                  <View style={styles.postBottom}>
                    <Text>
                      {moment(
                        feedEventToDisplay.created_at,
                        "YYYY-MM-DD HH:mm:ssZ"
                      ).fromNow()}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: "100%",
    // width: "100%",
    paddingTop: 10,
    backgroundColor: "#fff",
    padding: "2%"
  },
  commentContainer: {
    flexShrink: 1,
    paddingTop: 10
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
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  postHeader: {
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  postBottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bold: {
    fontWeight: "bold",
    paddingBottom: "2%",
    paddingLeft: "2%"
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
    width: "80%",
    marginBottom: 5
  },
  listItem: {
    height: 1,
    width: "100%",
    backgroundColor: "lightgray"
  }
});
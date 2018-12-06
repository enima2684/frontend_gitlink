import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";


export default class PostText extends React.Component {
  static propTypes = {
    feedEvent: PropTypes.object.isRequired
  };
  
  buildPostSpecificText(feedEvent) {
    let displayText;
    switch (feedEvent.type) {
      case "WatchEvent":
        displayText = (
          <Text style={styles.textContent}>
            <Text style={styles.bold}>{feedEvent.payload.action}</Text> watching{" "}
            <Text style={styles.bold}> {feedEvent.repo.name}</Text>
          </Text>
        );
        break;
  
      case "CreateEvent":
        displayText = (
          <Text style={styles.textContent}>
            created <Text style={styles.bold}>{feedEvent.payload.ref_type}</Text>{" "}
            in <Text style={styles.bold}> {feedEvent.payload.master_branch}</Text>{" "}
            inside the repo{" "}
            <Text style={styles.bold}> {feedEvent.repo.name}</Text>
          </Text>
        );
        break;
      case "ForkEvent":
        displayText = (
          <Text style={styles.textContent}>
            forked <Text style={styles.bold}>{feedEvent.repo.name}</Text> of{" "}
            <Text style={styles.bold}> {feedEvent.repo.name}</Text>
          </Text>
        );
        break;
      case "PushEvent":
        displayText = (
          <Text style={styles.textContent}>
            committed to <Text style={styles.bold}>{feedEvent.payload.ref}</Text>{" "}
            branch in <Text style={styles.bold}> {feedEvent.repo.name}</Text>
          </Text>
        );
        break;
      case "PullRequestEvent":
        displayText = (
          <Text style={styles.textContent}>
            created{" "}
            <Text style={styles.bold}>
              {feedEvent.payload.ref_type} {feedEvent.payload.ref}
            </Text>{" "}
            in <Text style={styles.bold}> {feedEvent.payload.master_branch}</Text>
            inside the repo{" "}
            <Text style={styles.bold}> {feedEvent.repo.name}</Text>
          </Text>
        );
        break;
      default:
        displayText = (
          <Text style={styles.textContent}>
            did something else: <Text style={styles.bold}>{feedEvent.type}</Text>
          </Text>
        );
        break;
    }
    return displayText;
  }
  
  

  /**
   *
   * @param {*} item
   * @param {*} userAction user clicks on post or on comment button. Possible values: details, comment
   */
  
  render() {
    const { feedEvent } = this.props;
    return this.buildPostSpecificText(feedEvent);
  }
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row"
  },
  rightPost: {
    width: "80%"
  },

  topPart: {
    flex: 1,
    flexDirection: "row"
  },
  profilePicture: {
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
    paddingBottom: 5
    // marginBottom: 10,
  },
  postText: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  postInteraction: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  bold: {
    fontWeight: "bold"
  }
});

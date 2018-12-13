import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import PropTypes from "prop-types";

export default class PostText extends React.Component {
  static propTypes = {
    feedEvent: PropTypes.object.isRequired,
    parentComponent: PropTypes.string.isRequired, // component that calls the component
  };

  buildPostSpecificText(feedEvent) {
    let displayText;
    let iconName;
    const iconColor = "#8cc342";
    switch (feedEvent.type) {
      case "WatchEvent":
        iconName = "eye";
        displayText = (
          <View style={styles.outerContainer}>
            <View style={styles.textContainer}>
              <Text>
                <Text style={styles.bold}>{feedEvent.payload.action}</Text>{" "}
                watching{" "}
                <Text style={styles.bold}>
                  {" "}
                  {feedEvent.repo.name.split("/").pop()}
                </Text>
              </Text>
            </View>
            <Octicons
              style={styles.icon}
              name={iconName}
              color={iconColor}
              size={30}
            />
          </View>
        );
        break;

      case "CreateEvent":
        iconName = "plus";
        displayText = (
          <View style={styles.outerContainer}>
            <View style={styles.textContainer}>
              <Text>
                created a{" "}
                <Text style={styles.bold}>{feedEvent.payload.ref_type}</Text> in{" "}
                <Text style={styles.bold}>
                  {feedEvent.payload.master_branch}
                </Text>{" "}
                inside the repo{" "}
                <Text style={styles.bold}>
                  {" "}
                  {feedEvent.repo.name.split("/").pop()}
                </Text>
              </Text>
            </View>
            <Octicons
              style={styles.icon}
              name={iconName}
              color={iconColor}
              size={30}
            />
          </View>
        );
        break;

      case "IssuesEvent":
        iconName = "issue-opened";
        displayText = (
          <View style={styles.outerContainer}>
            <View style={styles.textContainer}>
              <Text>
                <Text style={styles.bold}>{feedEvent.payload.action}</Text>{" "}
                the issue {" "}
                <Text style={styles.bold}>#{feedEvent.payload.issue.number}</Text>{" "}
                inside the repo{" "}
                <Text style={styles.bold}>
                  {feedEvent.repo.name.split("/").pop()}
                </Text>{":\n"}
                {feedEvent.payload.issue.title}
              </Text>
            </View>
            <Octicons
              style={styles.icon}
              name={iconName}
              color={iconColor}
              size={30}
            />
          </View>
        );
        break;

      case "IssueCommentEvent":
        iconName = "comment-discussion";
        displayText = (
          <View style={styles.outerContainer}>
            <View style={styles.textContainer}>
              <Text>
                <Text style={styles.bold}>commented </Text> on the issue{" "}
                <Text style={styles.bold}>#{feedEvent.payload.issue.number}</Text>{" "}
                in the repo{" "}
                <Text style={styles.bold}>
                  {feedEvent.repo.name.split("/").pop()}
                </Text>{" :\n"}
                <Text>
                  {this.props.parentComponent!=="FeedPost" ?
                    (feedEvent.payload.comment.body) :
                    (
                      feedEvent.payload.comment.body.substring(0,144) + (
                        feedEvent.payload.comment.body.length >= 144 && " ..."
                    ))
                  }
                </Text>
              </Text>
            </View>
            <Octicons
              style={styles.icon}
              name={iconName}
              color={iconColor}
              size={30}
            />
          </View>
        );
        break;

      case "DeleteEvent":
        iconName = "trashcan";
        displayText = (
          <View style={styles.outerContainer}>
            <View style={styles.textContainer}>
              <Text>
                deleted the{" "}
                <Text style={styles.bold}>{feedEvent.payload.ref_type}</Text>{" "}
                <Text style={styles.bold}>
                  {feedEvent.payload.ref}
                </Text>{" "}
                inside the repo{" "}
                <Text style={styles.bold}>
                  {" "}
                  {feedEvent.repo.name.split("/").pop()}
                </Text>
              </Text>
            </View>
            <Octicons
              style={styles.icon}
              name={iconName}
              color={iconColor}
              size={30}
            />
          </View>
        );
        break;



      case "ForkEvent":
        iconName = "repo-forked";
        displayText = (
          <View style={styles.outerContainer}>
            <View style={styles.textContainer}>
              <Text>
                forked <Text style={styles.bold}>{feedEvent.repo.name}</Text> of{" "}
                <Text style={styles.bold}>
                  {" "}
                  {feedEvent.repo.name.split("/").pop()}
                </Text>
              </Text>
            </View>
            <Octicons
              style={styles.icon}
              name={iconName}
              color={iconColor}
              size={30}
            />
          </View>
        );
        break;

      case "PushEvent":
        iconName = "repo-push";
        displayText = (
          <View style={styles.outerContainer}>
            <View style={styles.textContainer}>
              <Text>
                <Text style={styles.bold}>committed</Text> to the{" "}
                <Text style={styles.bold}>
                  {feedEvent.payload.ref.split("/").pop()}
                </Text>{" "}
                branch in{" "}
                <Text style={styles.bold}>
                  {" "}
                  {feedEvent.repo.name.split("/").pop()}
                </Text>
              </Text>
            </View>
            <Octicons
              style={styles.icon}
              name={iconName}
              color={iconColor}
              size={30}
            />
          </View>
        );
        break;

      case "PullRequestEvent":
        iconName = "git-pull-request";
        displayText = (
          <View style={styles.outerContainer}>
            <View style={styles.textContainer}>
              <Text>
                <Text style={styles.bold}>{feedEvent.payload.action}</Text> a
                pull request inside the repo{" "}
                <Text style={styles.bold}>
                  {" "}
                  {feedEvent.repo.name.split("/").pop()}
                </Text>
              </Text>
            </View>
            <Octicons
              style={styles.icon}
              name={iconName}
              color={iconColor}
              size={30}
            />
          </View>
        );
        break;

      default:
        iconName = "mark-github";
        displayText = (
          <View style={styles.outerContainer}>
            <View style={styles.textContainer}>
              <Text>
                did something else:{" "}
                <Text style={styles.bold}>{feedEvent.type}</Text>
              </Text>
            </View>
            <Octicons
              style={styles.icon}
              name={iconName}
              color={iconColor}
              size={30}
            />
          </View>
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
  bold: {
    fontWeight: "bold"
  },
  outerContainer: {
    flexDirection: "row"
  },
  textContainer: {
    flexWrap: "wrap",
    width: "88%"
  },
  icon: {}
});

// import React from "react";
// import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
// import PropTypes from "prop-types";
// import moment from "moment";

// import PostText from "../components/PostText";

// export default class NotificationPost extends React.Component {
//   static propTypes = {
//     navigation: PropTypes.object.isRequired,
//     feedEvent: PropTypes.object.isRequired
//   };

//   /**
//    *
//    * @param {*} item
//    * @param {*} userAction user clicks on post or on comment button. Possible values: details, comment
//    */
//   handleListTap(feedEvent, userAction = "details") {
//     this.props.navigation.navigate("Post", {
//       feedEvent: feedEvent,
//       userAction: userAction,
//       handleProfileTap: feedEvent => this.handleProfileTap(feedEvent)
//     });
//   }

//   handleProfileTap(feedEvent) {
//     // THIS SHOULD REDIRECT TO SOMEONE'S PROFILE
//     const githubId = feedEvent.actor.id;
//     const githubLogin = feedEvent.actor.login;
//     this.props.navigation.navigate("OtherUserProfile", {
//       githubId,
//       githubLogin
//     });
//   }

//   updateFeedEvent(feedEvent) {
//     feedEvent.userLiked = true;
//     this.setState({
//       feedEvent
//     });
//   }

//   render() {
//     const { feedEvent } = this.props;
//     let feedEventforTap = feedEvent;
//     let avatar_url, login, created_at, feedEventforTap;
//     if (feedEvent.type.includes("GitLink")) {
//       created_at = feedEvent.created_at;
//       feedEventforTap = feedEvent.githubPost;
//       let gitLinkText;
//       if (feedEvent.type === "GitLinkLike") {
//         const { likes } = feedEvent;
//         avatar_url = likes[0].userAvatar;
//         login = likes[0].userName;
//         gitLinkText = (
//           <Text>
//             <Text style={styles.bold}>
//               {`${likes[0].userName} ${
//                 likes.length > 1 ? `and other ${likes.length - 1} ` : " "
//               }`}
//             </Text>
//             liked a post
//           </Text>
//         );
//       } else {
//         const { comments } = feedEvent;
//         avatar_url = comments[0].userAvatar;
//         login = comments[0].userName;
//         let commenterNames = comments.map(comment => comment.userName);
//         commenterNames = Array.from(new Set(commenterNames))
//           .slice(0, 3)
//           .join(", ");
//         gitLinkText = (
//           <Text>
//             <Text style={styles.bold}>{commenterNames}</Text> commented on a post
//           </Text>
//         );
//       }
//     } else {
//       avatar_url = feedEvent.actor.avatar_url;
//       login = feedEvent.actor.login;
//       created_at = feedEvent.created_at;
//       // feedEventforTap = feedEvent;
//     }
//     return (
//       <View style={styles.postContainer}>
//         <TouchableOpacity
//           onPress={() => this.handleProfileTap(feedEventforTap)}
//           style={styles.pictureContainer}
//         >
//           <Image
//             style={styles.picture}
//             source={{
//               uri: avatar_url
//             }}
//           />
//         </TouchableOpacity>
//         <View style={styles.rightPost}>
//           <TouchableOpacity onPress={() => this.handleListTap(feedEventforTap)}>
//             <View style={styles.postHeader}>
//               <Text style={styles.bold}>{login}</Text>
//               <Text>
//                 {moment(created_at, "YYYY-MM-DD HH:mm:ssZ").fromNow()}
//               </Text>
//             </View>
//             <View style={styles.postText}>
//               <PostText feedEvent={feedEvent} />
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   postContainer: {
//     flex: 1,
//     flexDirection: "row"
//   },
//   rightPost: {
//     flexShrink: 1
//   },

//   topPart: {
//     flex: 1,
//     flexDirection: "row"
//   },
//   pictureContainer: {
//     paddingTop: 15
//   },
//   picture: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginLeft: 5,
//     marginRight: 10
//   },
//   postHeader: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingTop: 10,
//     paddingBottom: 5,
//     width: "100%"
//   },
//   postText: {
//     flexShrink: 1,
//     flexWrap: "wrap"
//   },
//   postInteraction: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 10
//   },
//   bold: {
//     fontWeight: "bold"
//   },
//   flexRow: {
//     flexDirection: "row",
//     alignItems: "center"
//   }
// });

import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import PostText from "../components/PostText";
import PostInteractionSection from "../components/PostInteractionSection";
import { Thumbnail } from "native-base";

export default class FeedPost extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    feedEvent: PropTypes.object.isRequired
  };
  state = {
    feedEvent: this.props.feedEvent    
  };

  /**
   *
   * @param {*} item
   * @param {*} userAction user clicks on post or on comment button. Possible values: details, comment
   */
  handleListTap(feedEvent, userAction = "details") {
    this.props.navigation.navigate("NotificationDetail", {
      feedEvent: feedEvent,
      handleProfileTap: feedEvent => this.handleProfileTap(feedEvent)
    });
  }

  handleProfileTap(feedEvent) {
    // THIS SHOULD REDIRECT TO SOMEONE'S PROFILE
    console.log('IN', feedEvent);
    const githubId = feedEvent.actor.id;
    const githubLogin = feedEvent.actor.login;
    this.props.navigation.navigate("OtherUserProfile", {
      githubId,
      githubLogin
    });
  }

  updateFeedEvent(feedEvent) {
    feedEvent.userLiked = true;
    this.setState({
      feedEvent
    })
  }

  render() {
    const { feedEvent } = this.props;
    // let feedEventforTap = feedEvent;
    let avatar_url, login, created_at, feedEventforTap;
    if (feedEvent.type.includes("GitLink")) {
      created_at = feedEvent.created_at;
      feedEventforTap = feedEvent.githubPost;
      let gitLinkText;
      if (feedEvent.type === "GitLinkLike") {
        const { likes } = feedEvent;
        avatar_url = likes[0].userAvatar;
        login = likes[0].userName;
        gitLinkText = (
          <Text>
            <Text style={styles.bold}>
              {`${likes[0].userName} ${
                likes.length > 1 ? `and other ${likes.length - 1} ` : " "
              }`}
            </Text>
            liked a post
          </Text>
        );
      } else {
        const { comments } = feedEvent;
        avatar_url = comments[0].userAvatar;
        login = comments[0].userName;
        let commenterNames = comments.map(comment => comment.userName);
        commenterNames = Array.from(new Set(commenterNames))
          .slice(0, 3)
          .join(", ");
        gitLinkText = (
          <Text>
            <Text style={styles.bold}>{commenterNames}</Text> commented on a post
          </Text>
        );
      }
    } else {
      avatar_url = feedEvent.actor.avatar_url;
      login = feedEvent.actor.login;
      created_at = feedEvent.created_at;
      feedEventforTap = feedEvent;
    }
    console.log('BEFORE', feedEventforTap);
    return (
      <View style={styles.postContainer}>
        <TouchableOpacity
          onPress={() => this.handleProfileTap(feedEventforTap)}
        >
          <Thumbnail round
            source={{
              uri: avatar_url
            }}
          />
        </TouchableOpacity>
        <View style={styles.rightPost}>
          <TouchableOpacity onPress={() => this.handleListTap(feedEventforTap)}>
              <Text style={styles.bold}>{login}</Text>
              <PostText feedEvent={feedEvent} parentComponent={"FeedPost"}/>
          </TouchableOpacity>
          <View style={styles.postBottom}>
            {/* <PostInteractionSection
              feedEvent={feedEventforTap}
              navigation={this.props.navigation}
              onLikePress={feedEvent => this.updateFeedEvent(feedEventforTap)}
            /> */}
            <Text>
              {moment(created_at, "YYYY-MM-DD HH:mm:ssZ").fromNow()}
            </Text>
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
    justifyContent: "space-between",
  },
  rightPost: {
    flexShrink: 1,
    flexDirection: "column",
    justifyContent: "flex-start",

  },
  postText: {
    flexShrink: 1,
    flexWrap: "wrap",
  },
  bold: {
    fontWeight: "bold",
    paddingBottom: "2%",
    paddingLeft: "2%"
  },
  postBottom:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

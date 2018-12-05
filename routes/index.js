import React from "react";
import { StyleSheet, View, Button } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import FeedScreen from "../views/FeedScreen";
import PostScreen from "../views/PostScreen";
import MessagesScreen from "../views/MessagesScreen";
import NotificationsScreen from "../views/NotificationsScreen";
import ProfileScreen from "../views/ProfileScreen";

const FeedRoot = createStackNavigator({
  FeedList: {
    screen: FeedScreen,
    navigationOptions: {
      title: "Feed list",
      // headerLeft: null,
      gesturesEnabled: false,
      headerRight: (
        <Button
          onPress={() => alert("This is a button!")}
          title="Info"
          color="#000"
        />
      )
    }
  },
  Post: {
    screen: PostScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.item.actor.login}'s post`
    })
  }
});

const AppTabNavigator = createBottomTabNavigator(
  {
    Feed: FeedRoot,
    Messages: createStackNavigator({
      screen: MessagesScreen
    }),
    Notification: createStackNavigator({
      screen: NotificationsScreen
    }),
    Profile: createStackNavigator({
      screen: ProfileScreen
    })
  },
  {
    tabBarOptions: {
      activeTintColor: "#000",
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "#fff"
      },
      indicatorStyle: {
        backgroundColor: "#000"
      }
    }
  }
);

const AppContainer = createAppContainer(AppTabNavigator);

export default AppContainer;

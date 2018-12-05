import React from "react";
import { StyleSheet, View, Button } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import Login from "../views/Login";
import FeedScreen from "../views/FeedScreen";
import PostScreen from "../views/PostScreen";
import MessagesScreen from "../views/MessagesScreen";
import NotificationsScreen from "../views/NotificationsScreen";
import ProfileScreen from "../views/ProfileScreen";

// Stack navigation for first tab, the Feed
const FeedRoot = createStackNavigator({
  FeedList: {
    screen: FeedScreen,
    navigationOptions: {
      title: "Feed list",
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

// Tab navigation: 4 tabs
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

// Switch Navigation: only user authentication procedure
const AppNavigator = createSwitchNavigator({
  Splash: Login,
  MainApp: AppTabNavigator
}, {initialRouteName: "Splash"});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

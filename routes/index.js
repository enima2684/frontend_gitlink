import React from "react";
import { StyleSheet, View, Button } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../views/LoginScreen";
import FeedScreen from "../views/FeedScreen";
import SearchScreen from "../views/SearchScreen";
import PostScreen from "../views/PostScreen";
import MessagesScreen from "../views/MessagesScreen";
import NotificationsScreen from "../views/NotificationsScreen";
import ProfileScreen from "../views/ProfileScreen";

// Stack navigation for first tab, the Feed
const FeedStack = createStackNavigator({
  FeedList: {
    screen: FeedScreen
  },
  Post: {
    screen: PostScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.item.actor.login}'s post`
    })
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      title: "Search"
    }
  }
});

const MessagesStack = createStackNavigator({
  Messages: {
    screen: MessagesScreen,
    navigationOptions: {
      title: "Messages"
    }
  },
  Thread: {
    screen: PostScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Conversation`
    })
  }
});

const NotificationsStack = createStackNavigator({
  Notification: {
    screen: NotificationsScreen,
    navigationOptions: {
      title: "Notifications"
    }
  },
  NotificationDetail: {
    screen: PostScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Notification details`
    })
  }
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      title: "Profile"
    }
  },
  ProfileDetails: {
    screen: PostScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Details`
    })
  }
});

// Tab navigation: 4 tabs
const AppTabNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-home" color={tintColor} size={24} />
        )
      })
    },
    Messages: {
      screen: MessagesStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-chatbubbles" color={tintColor} size={24} />
        )
      })
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-notifications" color={tintColor} size={24} />
        )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-person" color={tintColor} size={24} />
        )
      })
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
      style: {
        // height: 50,
      },
    }
  }
);

// Switch Navigation: only user authentication procedure
const AppNavigator = createSwitchNavigator(
  {
    LoginPage: LoginScreen,
    MainApp: AppTabNavigator
  },
  { initialRouteName: "LoginPage" }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
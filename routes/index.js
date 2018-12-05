import React from "react";
import { StyleSheet, View, Button } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import LoginScreen from "../views/LoginScreen";
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

const MessagesRoot = createStackNavigator({
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

const NotificationsRoot = createStackNavigator({
  Notification: {
    screen: NotificationsScreen,
    navigationOptions: {
      title: "Notifications"
    }
  },
  Thread: {
    screen: PostScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Notification details`
    })
  }
});

const ProfileRoot = createStackNavigator({
  Profile: {
    screen: NotificationsScreen,
    navigationOptions: {
      title: "Profile"
    }
  },
  Details: {
    screen: PostScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Details`
    })
  }
});

// Tab navigation: 4 tabs
const AppTabNavigator = createBottomTabNavigator(
  {
    Feed: FeedRoot,
    Messages: MessagesRoot,
    Notification: NotificationsRoot,
    Profile: ProfileRoot
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
const AppNavigator = createSwitchNavigator(
  {
    LoginPage: LoginScreen,
    MainApp: AppTabNavigator
  },
  { initialRouteName: "LoginPage" }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

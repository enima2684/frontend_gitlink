import React from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import Octicons from "@expo/vector-icons/Octicons";
// import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../views/LoginScreen";
import FeedScreen from "../views/FeedScreen";
import SearchScreen from "../views/SearchScreen";
import PostScreen from "../views/PostScreen";
import MessagesScreen from "../views/MessagesScreen";
import NotificationsScreen from "../views/NotificationsScreen";
import ProfileScreen from "../views/ProfileScreen";
import RepoListScreen from '../views/RepoListScreen';

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
  UserRepositories: {
    screen: RepoListScreen,
    navigationOptions: {
      title: `Repositories`
    }
  },
});

// Tab navigation: 4 tabs
const AppTabNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Octicons name="mark-github" color={tintColor} size={24} />
        )
      })
    },
    Messages: {
      screen: MessagesStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Octicons name="comment-discussion" color={tintColor} size={24} />
        )
      })
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Octicons name="bell" color={tintColor} size={24} />
        )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Octicons name="octoface" color={tintColor} size={24} />
        )
      })
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "black",
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

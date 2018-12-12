import React from "react";
import {Text, Alert, TouchableOpacity} from "react-native"
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import Octicons from "@expo/vector-icons/Octicons";
import {authService} from "../lib/Authentication";
// import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../views/LoginScreen";
import FeedScreen from "../views/FeedScreen";
import SearchScreen from "../views/SearchScreen";
import PostScreen from "../views/PostScreen";
import MessagesScreen from "../views/MessagesScreen";
import NotificationsScreen from "../views/NotificationsScreen";
import ProfileScreen from "../views/ProfileScreen";
import RepoListScreen from '../views/RepoListScreen';
import OneRepositoryScreen from "../views/OneRepositoryScreen";
import CodeScreen from "../views/CodeScreen";
import ReadmeScreen from "../views/ReadmeScreen";

logout = async() =>{
  try{
    await authService.logout();
    Alert.alert("Info", 'Logged out successfully. See you soon ! 👋');
  } catch (err) {
    console.log(err);
    Alert.alert("error", 'Oups! Something went wrong on the logout');
    throw err
  }
};

// Stack navigation for first tab, the Feed
const FeedStack = createStackNavigator({
  FeedList: {
    screen: FeedScreen
  },
  Post: {
    screen: PostScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.feedEvent.actor.login}'s post`
    })
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      title: "Search"
    }
  },
  OtherUserProfile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.githubLogin}'s profile`
    })
  },
  OneRepository: {
    screen: OneRepositoryScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.repoName}`
    })
  },
  Repositories: {
    screen: RepoListScreen,
    navigationOptions: {
      title: `Repositories`
    }
  },
  Code: {
    screen: CodeScreen,
    navigationOptions: {
      title: `Code`
    }
  },
  Readme: {
    screen: ReadmeScreen,
    navigationOptions:{
      title: 'Readme'
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
      title: `Conversation with BLAH`
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
      title: `Notification BLAH details`
    })
  }
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => ({
      title: "My Profile",
      headerRight:(
        <TouchableOpacity><Octicons name="sign-out" size={15}
        onPress={() => this.logout().then(() => navigation.navigate("LoginPage"))}><Text>Logout</Text></Octicons></TouchableOpacity>
      )
    })
  },
  Repositories: {
    screen: RepoListScreen,
    navigationOptions: {
      title: `Repositories`
    }
  },
  OneRepository: {
    screen: OneRepositoryScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.repoName}`
    })
  },
  Code: {
    screen: CodeScreen,
    navigationOptions: {
      title: `Code`
    }
  },
  Readme: {
    screen: ReadmeScreen,
    navigationOptions:{
      title: 'Readme'
    }
  },
  OtherUserProfile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.githubLogin}'s profile`
    })
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
      activeTintColor: "#8cc342",
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

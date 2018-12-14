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
import colors from '../colors';
// import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../views/LoginScreen";
import FeedScreen from "../views/FeedScreen";
import SearchScreen from "../views/SearchScreen";
import PostScreen from "../views/PostScreen";
import NotificationsScreen from "../views/NotificationsScreen";
import ProfileScreen from "../views/ProfileScreen";
import RepoListScreen from '../views/RepoListScreen';
import OneRepositoryScreen from "../views/OneRepositoryScreen";
import CodeScreen from "../views/CodeScreen";
import ReadmeScreen from "../views/ReadmeScreen";
import FollowerScreen from "../views/FollowerScreen";

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

const headerStyle = {
    headerStyle: {
      backgroundColor: colors.GrayDark,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
};


// Stack navigation for first tab, the Feed
const FeedStack = createStackNavigator({
  FeedList: {
    screen: FeedScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Latest news on GitHub",
      headerRight: (
        <Octicons
          name="mark-github"
          color={colors.whiteFont}
          size={24}
          style={{marginRight: 20}}
        />),
      ...headerStyle
    })
  },
  Post: {
    screen: PostScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.feedEvent.actor.login}'s post`,
      ...headerStyle
    }),

  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      title: "Search",
      ...headerStyle
    }
  },
  OtherUserProfile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.githubLogin}'s profile`,
      ...headerStyle
    })
  },
  OneRepository: {
    screen: OneRepositoryScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.repoName}`,
      ...headerStyle
    })
  },
  Repositories: {
    screen: RepoListScreen,
    navigationOptions: {
      title: `Repositories`,
      ...headerStyle
    }
  },
  Code: {
    screen: CodeScreen,
    navigationOptions: {
      title: `Code`,
      ...headerStyle
    }
  },
  Readme: {
    screen: ReadmeScreen,
    navigationOptions:{
      title: 'Readme',
      ...headerStyle
    }
  },
  Followers: {
    screen: FollowerScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('screenType'),
      ...headerStyle
    })
  }

});

const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      title: "Search",
      ...headerStyle
    }
  },
    OtherUserProfile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.githubLogin}'s profile`,
      ...headerStyle
    })
  },
  OneRepository: {
    screen: OneRepositoryScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.repoName}`,
      ...headerStyle
    })
  },
  Repositories: {
    screen: RepoListScreen,
    navigationOptions: {
      title: `Repositories`,
      ...headerStyle
    }
  },
  Code: {
    screen: CodeScreen,
    navigationOptions: {
      title: `Code`,
      ...headerStyle
    }
  },
  Readme: {
    screen: ReadmeScreen,
    navigationOptions:{
      title: 'Readme',
      ...headerStyle
    }
  },
  Followers: {
    screen: FollowerScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('screenType'),
      ...headerStyle
    })
  }

});

const NotificationsStack = createStackNavigator({
  Notification: {
    screen: NotificationsScreen,
    navigationOptions: {
      title: "Notifications",
      ...headerStyle
    }
  },
  NotificationDetail: {
    screen: PostScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Notification details`,
      ...headerStyle
    })
  },
  Followers: {
    screen: FollowerScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('screenType'),
      ...headerStyle
    })
  }

});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => ({
      title: "My Profile",
      headerRight:(
        <TouchableOpacity
          onPress={ async () => {
              await this.logout();
              navigation.navigate("LoginPage");
          }}
        style={{display: 'flex', flexDirection: 'row', paddingRight: 10}}
        >
          <Text style={{fontWeight: '700', color: colors.whiteFont, paddingRight: 5}}>Logout</Text>
          <Octicons name="sign-out" size={15} color={colors.whiteFont}/>
        </TouchableOpacity>
      ),
      ...headerStyle
    })
  },
  Repositories: {
    screen: RepoListScreen,
    navigationOptions: {
      title: `Repositories`,
      ...headerStyle
    }
  },
  OneRepository: {
    screen: OneRepositoryScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.repoName}`,
      ...headerStyle
    })
  },
  Code: {
    screen: CodeScreen,
    navigationOptions: {
      title: `Code`,
      ...headerStyle
    }
  },
  Readme: {
    screen: ReadmeScreen,
    navigationOptions:{
      title: 'Readme',
      ...headerStyle
    }
  },
  OtherUserProfile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.githubLogin}'s profile`,
      ...headerStyle
    })
  },
  Followers: {
    screen: FollowerScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('screenType'),
      ...headerStyle
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
          <Octicons name="mark-github" color={tintColor} size={20} />
        ),
      ...headerStyle
      })
    },
    Search: {
      screen: SearchStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Octicons name="search" color={tintColor} size={20} />
        ),
      ...headerStyle
      })
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Octicons name="bell" color={tintColor} size={20} />
        ),
      ...headerStyle
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Octicons name="octoface" color={tintColor} size={20} />
        ),
      ...headerStyle
      })
    },

  },
  {
    tabBarOptions: {
      activeTintColor: colors.Blue,
      inactiveTintColor: colors.BlueLight,
      inactiveBackgroundColor: colors.whiteFont,
      labelStyle:{
        fontSize: 12,
        fontWeight: "400"
      },
      tabStyle: {
        // borderLeftWidth: 0.5,
        // borderLeftColor: colors.whiteFont,
        // borderLeftStyle: 'solid',
        // borderTopWidth : 0.5,
        // borderTopColor : colors.GrayDark,
        // borderTopStyle : 'solid',
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

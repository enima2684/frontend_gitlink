import { createStackNavigator, createAppContainer } from "react-navigation";
import FeedScreen from "./views/FeedScreen";
import HomeScreen from "./views/HomeScreen";
import PostScreen from "./views/PostScreen";

const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({
        title: 'Login'}
      )
    },
    Feed: {
      screen: FeedScreen,
      navigationOptions: ({
        title: 'Feed list', headerLeft: null, gesturesEnabled: false,}
      )
    },
    Post: {
      screen: PostScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.item.actor.login}'s post`
      })
    }
  },
  {
    initialRouteName: "Home",
    headerLayoutPreset: "center"
  }
);

const AppContainer = createAppContainer(AppStackNavigator);

export default AppContainer;

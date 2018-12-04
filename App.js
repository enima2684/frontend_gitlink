import { createStackNavigator, createAppContainer } from "react-navigation";
import FeedScreen from "./FeedScreen";
import HomeScreen from "./HomeScreen";
import PostScreen from "./PostScreen";

const AppStackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Feed: FeedScreen,
    Post: PostScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppStackNavigator);

export default AppContainer;
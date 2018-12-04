import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from "react-native";

export default class HomeScreen extends React.Component {

  handleButton = () => {
    this.props.navigation.navigate('Feed');
  };

  render() {
    console.log("HELLO");
    return (
      <View style={styles.container}>
        <Button
          onPress={this.handleButton}
          title="LOG IN"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#fff"
  }
});

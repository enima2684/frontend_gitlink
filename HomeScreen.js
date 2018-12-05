import React from "react";
import {
  StyleSheet,
  View,
  Button,
} from "react-native";

export default class HomeScreen extends React.Component {

  handleButton = () => {
    this.props.navigation.navigate('Feed');
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.handleButton}
          title="LOG IN"
          color="#841584"
          accessibilityLabel="Click me to log in"
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

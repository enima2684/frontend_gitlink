import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TouchableOpacity
} from "react-native";

export default class FeedScreen extends React.Component {
  state = {
    message: "hello",
    countries: [
      {
        name: "Australia",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png"
      },
      {
        name: "Belgium",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png"
      },
      {
        name: "Bulgaria",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png"
      },
      {
        name: "Canada",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ca.png"
      },
      {
        name: "Switzerland",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ch.png"
      },
      {
        name: "China",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cn.png"
      },
      {
        name: "Czech Republic",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cz.png"
      },
      {
        name: "Germany",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/de.png"
      },
      {
        name: "Spain",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/es.png"
      },
      {
        name: "Ethiopia",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/et.png"
      },
      {
        name: "Croatia",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hr.png"
      },
      {
        name: "Hungary",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hu.png"
      },
      {
        name: "Italy",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/it.png"
      },
      {
        name: "Jamaica",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/jm.png"
      },
      {
        name: "Romania",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ro.png"
      },
      {
        name: "Russia",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ru.png"
      },
      {
        name: "United States",
        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/us.png"
      }
    ]
  };

  handleButton = () => {
    this.setState({
      message: "button was clicked"
    });
  };

  handleListTap(item){
    this.props.navigation.navigate('Post', {
      name: item.name,
      imageSrc: item.imageSrc,
    })
  }

  render() {
    console.log("HELLO");
    return (
      <View style={styles.container}>
        <Text>FEED</Text>
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{ height: 1, width: "100%", backgroundColor: "lightgray" }}
            />
          )}
          data={this.state.countries}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10
              }}
              onPress={() => this.handleListTap(item)}
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={{
                  uri: item.imageSrc
                }}
              />
              <Text style={{ padding: 20 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

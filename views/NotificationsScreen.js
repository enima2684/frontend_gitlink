import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from "react-native";
import NotificationPost from "./NotificationPost";
import requestBuilder from "../lib/request";
import { Card, CardItem, Thumbnail } from "native-base";

export default class NotificationsScreen extends React.Component {
  state = {
    loading: true,
    refreshing: false,
    notifs: []
  };

  async fetchNotifs() {
    try {
      const req = await requestBuilder();
      let response = await req.get("/notifs/currentUser");
      return response.data;
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  async updateNotifs() {
    let notifs = await this.fetchNotifs();
    this.setState({
      notifs,
      loading: false,
      refreshing: false
    });
  }

  componentDidMount() {
    this.updateNotifs();
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    this.updateNotifs();
  };

  render() {
    const { notifs } = this.state;
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {this.state.loading && (
          <ActivityIndicator size="large" color="#00ff00" padding="10%" />
        )}
        {notifs.map((oneNotif, idx) =>{
          return(
            <Card key={idx}>
            <CardItem>
              <NotificationPost feedEvent={oneNotif} navigation={this.props.navigation} />
            </CardItem>
          </Card>
          )
        })}
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginRight: "2%",
    marginLeft: "2%",
  },
  listItem: { height: 1, width: "100%", backgroundColor: "lightgray" },
  searchIcon: { marginRight: 20 }
});
import React from "react";
import { Route, NativeRouter, Switch } from "react-router-native";
import Login from "./views/Login";

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Route path="/" component={Login} />
      </NativeRouter>
    );
  }
}

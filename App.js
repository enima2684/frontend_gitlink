import React, { Component } from "react";
import Navigator from "./routes";

import { Provider } from "react-redux";
import { store } from "./stateManagement/stores";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator>
        </Navigator>
      </Provider>
    );
  }
}

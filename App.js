import React, { Component } from "react";
import Sendbird from "sendbird";
import Config from "./src/config";
import LocalChat from "./src/components/index";
import { MyProvider } from "./src/components/Provider";

export default class App extends Component {
  constructor(props) {
    super(props);

    // Initialize sendbird using our app id
    var sb = new Sendbird({ appId: Config.appId });
  }

  render() {
    return (
      <MyProvider>
        <LocalChat />
      </MyProvider>
    );
  }
}

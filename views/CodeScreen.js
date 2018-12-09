import React, {Component} from "react";
import { WebView } from 'react-native';

export default class CodeScreen extends Component{
  render(){
    return (
      <WebView
        source={{uri: this.props.navigation.getParam('repo_html_url') + '?files=1'}}
      />
    )
  }
}

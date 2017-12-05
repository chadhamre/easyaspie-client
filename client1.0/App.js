import React from 'react';
import { View } from 'react-native';
import { Font } from "expo";

import Landing from './containers/LandingComponent.js'
import RestaurantModal from './containers/Modal'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentWillMount() {
    await Font.loadAsync({
      raleway: require("./assets/fonts/Raleway/Raleway-Regular.ttf"),
      "raleway-blackitalic": require("./assets/fonts/Raleway/Raleway-BlackItalic.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  renderApp = () => {
    return this.state.fontLoaded ? <Landing /> : <View />
  }
  render() {
    return (
        this.renderApp()
    );
  }
}

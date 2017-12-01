import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import Map from "./MapComponent";
import RestoList from "./ListComponent";
import { MapView, Font } from "expo";
import Icon from "react-native-vector-icons/Ionicons";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moved: false,
      fontLoaded: false,
      modal: false,
      map: true
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      raleway: require("../assets/fonts/Raleway/Raleway-Regular.ttf"),
      "raleway-blackitalic": require("../assets/fonts/Raleway/Raleway-BlackItalic.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  triggerLogoChange = (moved, end) => {
    this.setState({ moved, end });
  };
  triggerRerender = () => {
    this.refs.map.handleButtonClick(this.state.moved);
  };

  // show list view
  toggleList = () => {
    if (this.state.map === true) {
      this.setState({ map: false });
    } else {
      this.setState({ map: true });
    }
  };

  triggerModal = () => {
    this.setState({ modal: !this.state.modal });
  };
  // render a toggle to swtich to list view
  renderListToggle() {
    return (
      <TouchableOpacity
        style={styles.togglecontainer}
        onPress={this.toggleList}
      >
        <Icon
          name={this.state.map === true ? "ios-list" : "ios-globe-outline"}
          size={30}
          style={{ color: "black", backgroundColor: "transparent" }}
        />
      </TouchableOpacity>
    );
  }
  // render map action button
  renderMapButton(moved, end) {
    let text;
    if (moved) {
      text = "Search Again";
    } else if (end) {
      text = "No More Places";
    } else {
      text = "Load More";
    }
    //IF BROKEN, check text below
    return this.state.fontLoaded && text ? (
      <View style={styles.image_text_container}>
        <Text style={styles.text}> {text} </Text>
      </View>
    ) : (
      <View />
    );
  }
  renderMapButtonContainer() {
    return !this.state.modal ? (
      <View style={styles.mapbuttoncontainer}>
        <TouchableHighlight onPress={this.triggerRerender}>
          <View>{this.renderMapButton(this.state.moved, this.state.end)}</View>
        </TouchableHighlight>
      </View>
    ) : (
      <View />
    );
  }
  renderMainContent() {
    return (
      <Map
        ref="map"
        triggerLogoChange={this.triggerLogoChange}
        triggerModal={this.triggerModal}
        renderWhat={this.state.map}
      />
    );
  }
  // final render -------------------------------------------------
  render() {
    return (
      <View style={styles.container}>
        {this.renderListToggle()}
        {this.renderMapButtonContainer()}
        {this.renderMainContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column"
  },
  logo: {
    height: 85,
    width: 85
  },
  mapbuttoncontainer: {
    backgroundColor: "white",
    position: "absolute",
    marginTop: 38,
    zIndex: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    borderRadius: 20
  },
  togglecontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 10,
    top: 30,
    height: 50,
    width: 50,
    position: "absolute",
    zIndex: 1,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    borderRadius: 50,
    padding: 0
  },
  image_text_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8
  },
  text: {
    color: "black",
    fontFamily: "raleway"
  }
});

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
import { MapView, Font } from "expo";
import Icon from "react-native-vector-icons/Ionicons";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moved: false,
      modal: false,
      map: true
    };
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
    return !this.state.modal ? (
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.togglecontainer}
            onPress={this.state.map ? this.toggleList : null}
          >
            <Icon
              name={"ios-list-outline"}
              size={30}
              style={!this.state.map ? styles.iconBlue : styles.iconGrey}
            />
          </TouchableOpacity>
          <View style={styles.greyBar} />
          <TouchableOpacity
            style={styles.togglecontainer}
            onPress={!this.state.map ? this.toggleList : null}
          >
            <Icon
              name={"ios-pin"}
              size={30}
              style={this.state.map ? styles.iconBlue : styles.iconGrey}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: '21%', marginTop:'7%'}}>
          <Image style={styles.topLogo} source={require('../assets/logo_easyaspie_blue.png')}></Image>
        </View>
      </View>
    ) : null;
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
    return text ? (
      <View style={styles.image_text_container}>
        <Text style={styles.text}> {text} </Text>
      </View>
    ) : (
      <View />
    );
  }
  renderMapButtonContainer() {
    return !this.state.modal && this.state.map ? (
      <View style={styles.mapbuttoncontainer}>
        <TouchableOpacity onPress={this.triggerRerender}>
          <View>{this.renderMapButton(this.state.moved, this.state.end)}</View>
        </TouchableOpacity>
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
  topLogo: {
    position: 'absolute',
    alignSelf: 'center',
    width: 70,
    height: 50,
    zIndex: 20
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
    alignItems: "center",
    top: "3%"
  },
  iconGrey: {
    color: "#888888",
    backgroundColor: "transparent"
  },
  iconBlue: {
    color: "#48B9D0",
    backgroundColor: "transparent"
  },
  greyBar: {
    width: 2,
    height: 40,
    top: "5%",
    left: "12%",
    backgroundColor: "#f2f2f2",
    zIndex: 55
  },
  header: {
    display: "flex",
    flexDirection: "row",
    height: 100,
    width: "100%",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1.5,
    borderBottomColor: "#48B9D0"
  },
  logo: {
    height: 85,
    width: 85
  },
  mapbuttoncontainer: {
    backgroundColor: "white",
    alignItems: "center",
    position: "absolute",
    minWidth: "33%",
    marginTop: 84,
    zIndex: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    borderRadius: 7,
    borderColor: "#48B9D0",
    borderWidth: 1.5
  },
  togglecontainer: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: 10,
    top: 30,
    height: 50,
    width: 50,
    alignSelf: "flex-start",
    zIndex: 1,
    padding: 0
  },
  image_text_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8
  },
  text: {
    color: "#333",
    fontFamily: "raleway-blackitalic"
  }
});

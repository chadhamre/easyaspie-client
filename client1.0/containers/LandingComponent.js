import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import Map from "./MapComponent";
import ModalSearch from "./ModalSearch";
import { MapView, Font } from "expo";
import Icon from "react-native-vector-icons/Ionicons";
import Collapsible from "react-native-collapsible";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moved: false,
      modal: false,
      map: true,
      collapsed: true
    };
  }

  triggerLogoChange = (moved, end) => {
    this.setState({ moved, end });
  };
  triggerRerender = () => {
    this.refs.map.handleButtonClick(this.state.moved);
  };
  triggerFilter = async food => {
    console.log("TRIGGER FILTER:", food);
    await this.refs.map.handleButtonClick(false, food);
    if (this.refs.map.refs.list) {
      // console.log(this.refs.map.state.restaurants)
      this.refs.map.refs.list.listRestaurants(this.refs.map.state.restaurants);
    }
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

  triggerModalSearch = () => {
    this.setState({ modalSearch: !this.state.modalSearch });
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
              size={40}
              style={this.state.map ? styles.iconBlue : styles.iconGrey}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.topLogo}>
          <Image
            style={styles.topLogoImg}
            source={require("../assets/logo_easyaspie_blue.png")}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.lastTogglecontainer}
            onPress={() => this.refs.modalSearch.refs.modalSearch.open()}
          >
            <Icon
              name={"ios-search"}
              size={40}
              style={!this.state.collapsed ? styles.iconBlue : styles.iconGrey}
            />
          </TouchableOpacity>
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
        triggerModalSearch={this.triggerModalSearch}
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
        <ModalSearch ref={"modalSearch"} triggerFilter={this.triggerFilter} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 200,
    backgroundColor: "lime"
  },
  collapse: {
    position: "absolute",
    zIndex: 60,
    left: 0,
    top: 0,
    width: 200,
    height: 200,
    backgroundColor: "red"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column"
  },
  topLogo: {
    position: "absolute",
    zIndex: 20,
    left: "50%",
    top: "50%",
    transform: [{ translateX: -35 }, { translateY: -20 }]
  },
  topLogoImg: {
    width: 70,
    height: 50
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
    borderBottomColor: "#48B9D0",
    justifyContent: "space-between"
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
  lastTogglecontainer: {
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
    padding: 0,
    marginRight: 20
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

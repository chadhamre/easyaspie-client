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

import OwnHeader from './OwnHeader.js'

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    //boolean, has swiped around the screen more than a predetermined size
      moved: false,
    //boolean, wether modal or map is up
      modal: false,
      map: true,
      collapsed: true
    };
  }

  //changes the button text when a user moves around the map
  triggerLogoChange = (moved, end) => {
    this.setState({ moved, end });
  };
  //reRenders the pins only when the user clicks to either search a new area or load more restaurants
  triggerRerender = () => {
    this.refs.map.handleButtonClick(this.state.moved);
  };
  triggerFilter = async food => {
    await this.refs.map.handleButtonClick(false, food);
    if (this.refs.map.refs.list) {
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

  //opens or closes the modal
  triggerModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  triggerModalSearch = () => {
    this.setState({ modalSearch: !this.state.modalSearch });
  };

  // render a toggle to swtich to list view
  renderHeader() {
    return !this.state.modal ? (
      <OwnHeader
        map={this.state.map}
        toggleList={this.toggleList}
        collapsed={this.state.collapsed}
        modalSearch={this.refs.modalSearch ? this.refs.modalSearch.refs.modalSearch : null }
      />
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
        {this.renderHeader()}
        {this.renderMapButtonContainer()}
        {this.renderMainContent()}
        <ModalSearch ref={"modalSearch"} triggerFilter={this.triggerFilter} />
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

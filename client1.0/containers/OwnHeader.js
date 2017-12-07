import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from "react-native";

export default class OwnHeader extends React.Component {

  render() {
    return (
      <View style={styles.header}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.togglecontainer}
          onPress={this.props.map ? this.props.toggleList : null}
        >
          <Icon
            name={"ios-list-outline"}
            size={30}
            style={!this.props.map ? styles.iconBlue : styles.iconGrey}
          />
        </TouchableOpacity>
        <View style={styles.greyBar} />
        <TouchableOpacity
          style={styles.togglecontainer}
          onPress={!this.props.map ? this.props.toggleList : null}
        >
          <Icon
            name={"ios-pin"}
            size={40}
            style={this.props.map ? styles.iconBlue : styles.iconGrey}
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
          onPress={() => this.props.modalSearch.open()}
        >
          <Icon
            name={"ios-search"}
            size={40}
            style={!this.props.collapsed ? styles.iconBlue : styles.iconGrey}
          />
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
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
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
    alignItems: "center",
    top: "3%"
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
});



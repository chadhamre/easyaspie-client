import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Price extends Component {
  // render chips

  render() {
    let string1 = "";
    let string2 = "$$$$$";
    for (let i = this.props.price; i > 0; i--) {
      string1 += "$";
      string2 = string2.slice(0, -1);
    }
    return (
      <View style={styles.container}>
        <Text style={styles.blue}>{string1}</Text>
        <Text style={styles.grey}>{string2}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  grey: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#b7b7b7"
  },
  blue: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#5C91CA"
  }
});

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
    backgroundColor: "#e9e9e9",
    width: "100%",
    padding: 10
  },
  grey: {
    fontSize: 30,
    color: "#b7b7b7"
  },
  blue: {
    fontSize: 30,
    color: "#4eb9ce"
  }
});

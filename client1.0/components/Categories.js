import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Categories extends Component {
  // render chips
  renderCategoryChips = () => {
    return this.props.categories.map(cat => (
      <View key={cat} style={styles.wrapper}>
        <Text style={styles.chip}>{cat}</Text>
      </View>
    ));
  };

  render() {
    return <View style={styles.categories}>{this.renderCategoryChips()}</View>;
  }
}

const styles = StyleSheet.create({
  categories: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginBottom: 10,
    marginTop: 10
  },
  wrapper: {
    borderColor: "#4eb9ce",
    borderWidth: 2,
    marginLeft: 12,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 0.3
  },
  chip: {
    fontFamily: "raleway-blackitalic",
    fontStyle: "italic"
  }
});

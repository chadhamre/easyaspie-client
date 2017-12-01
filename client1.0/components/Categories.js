import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Categories extends Component {
  // render chips
  renderCategoryChips = () => {
    return this.props.categories.map(cat => (
      <Text key={cat} style={styles.chip}>
        {cat}
      </Text>
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
    width: "100%",
    padding: 10
  },
  chip: {
    color: "#b7b7b7",
    padding: 10,
    borderColor: "#b7b7b7",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    lineHeight: 10,
    height: 25,
    color: "#4eb9ce"
  }
});

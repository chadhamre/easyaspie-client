import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class OpenNow extends Component {
  renderContent = () => {
    if (this.props.open === 'true')
      return (
        <View style={styles.container}>
          <View style={styles.green} />
          <Text style={styles.text}>open now</Text>
        </View>
      );
    else if (this.props.open === 'false') {
      return (
        <View style={styles.container}>
          <View style={styles.red} />
          <Text style={styles.text}>closed now</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.yellow} />
          <Text style={styles.text}>Unknown</Text>
        </View>
      )
    }
  };
  // render chips
  render() {
    return <View style={styles.open}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  text: {
    color: "#888888"
  },
  open: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    width: "100%",
    paddingRight: 10
  },
  green: {
    width: 10,
    height: 10,
    backgroundColor: "#4eb9ce",
    marginRight: 10,
    borderRadius: 10,
    marginTop: 4
  },
  red: {
    width: 10,
    height: 10,
    backgroundColor: "#b44316",
    marginRight: 10,
    borderRadius: 10,
    marginTop: 4
  },
  yellow: {
    width: 10,
    height: 10,
    backgroundColor: "#888888",
    marginRight: 10,
    borderRadius: 10,
    marginTop: 4
  }
});

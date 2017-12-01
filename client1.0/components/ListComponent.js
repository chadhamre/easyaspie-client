import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List, ListItem } from "react-native-elements";

export default class RestoList extends React.Component {
  render() {
    return (
      <View style={styles.listContainer}>
        <List>
          {this.props.restaurants.results.map((l, i) => (
            <ListItem
              key={i}
              title={l.name}
              subtitle={`google rating ${l.rating}`}
              avatar={l.icon}
            />
          ))}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

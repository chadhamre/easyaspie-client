import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements";
import geodist from "geodist";

export default class RestoList extends React.Component {
  pressed = (id) => this.props.handelPress(id);
  render() {
    return (
      <ScrollView style={styles.listContainer}>
        <List>
          {this.props.restaurants.results.map((item, key) => (
            <ListItem
              onPress={() => this.pressed(item.place_id)}
              key={key}
              title={(l = item.name)}
              subtitle={
                Math.round(
                  100 *
                    geodist(
                      {
                        lat: item.geometry.location.lat,
                        lon: item.geometry.location.lng
                      },
                      {
                        lat: this.props.location.coords.latitude,
                        lon: this.props.location.coords.longitude
                      },
                      { exact: true, unit: "km" }
                    )
                ) /
                  1 +
                " meters away"
              }
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 80,
    width: "100%"
  }
});

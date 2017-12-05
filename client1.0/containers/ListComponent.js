import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { List, ListItem, Avatar } from "react-native-elements";
import geodist from "geodist";
import { GOOGLE_PLACES_API_KEY } from "react-native-dotenv";

export default class RestoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }
  // sort data
  componentWillMount() {
    // calculate distance for each location, and get opening times
    this.props.restaurants.results.forEach(item => {
      // console.log('============', item.photos[0].photo_reference)
      item.distance = Math.round(
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
      );
      if (item.opening_hours && item.opening_hours.open_now) {
        item.description = "Open Now";
        item.line2Style = styles.line2Open;
      } else if (item.opening_hours) {
        item.description = "Closed";
        item.line2Style = styles.line2Closed;
      } else {
        item.description = "Opening Hours Not Available";
        item.line2Style = styles.line2Unknown;
      }
      this.state.restaurants.push(item);
    });
    // sort array by distance
    this.state.restaurants.sort((a, b) => {
      return a.distance - b.distance;
    });
  }
  //
  subtitleLines = item => {
    return (
      <View style={styles.subtitleContainer}>
        <Text style={styles.line1}>{item.distance + " meters away"}</Text>
        <Text style={item.line2Style}>{item.description}</Text>
      </View>
    );
  };
  // handle press event
  pressed = id => this.props.handelPress(id);
  // final render -------------------------------------------------------------
  render() {
    return (
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={styles.explanation}> Ordered by distance </Text>
        <List
          containerStyle={{
            backgroundColor: "#F2F2F2",
            borderColor: "#F2F2F2"
          }}
        >
          {this.state.restaurants
            .filter(item => item.photos)
            .map((item, key) => (
              <ListItem
                containerStyle={styles.listItemContainer}
                avatar={
                  <Avatar
                    rounded
                    large
                    source={
                      item.photos
                        ? {
                            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                              item.photos[0].photo_reference
                            }&key=${GOOGLE_PLACES_API_KEY}`
                          }
                        : require("../assets/logo_easyaspie_bw.png")
                    }
                  />
                }
                avatarStyle={styles.avatar}
                onPress={() => this.pressed(item.place_id)}
                key={key}
                title={item.name}
                titleStyle={styles.title}
                subtitle={this.subtitleLines(item)}
                subtitleNumberOfLines={2}
              />
            ))}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    backgroundColor: "#F2F2F2"
  },
  listItemContainer: {
    backgroundColor: "#ffffff",
    display: "flex",
    height: 100,
    width: "95%",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderBottomColor: "#48B9D0",
    borderBottomWidth: 1.5,
    borderRadius: 7,
    borderColor: "#48B9D0",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowRadius: 7,
    shadowOpacity: 0.2
  },
  explanation: {
    fontFamily: "raleway-blackitalic",
    paddingTop: "7%",
    marginBottom: "-1.5%",
    fontSize: 20,
    color: "#333"
  },
  subtitleContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20
  },
  title: {
    fontFamily: "raleway-blackitalic",
    marginLeft: 20
  },
  line1: {
    fontFamily: "raleway"
  },
  line2Open: {
    fontFamily: "raleway",
    color: "#4eb9ce"
  },
  line2Closed: {
    fontFamily: "raleway",
    color: "#b44316"
  },
  line2Unknown: {
    fontFamily: "raleway",
    color: "#888888"
  }
});

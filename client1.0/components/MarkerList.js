import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";
import { MapView, Location, Permissions } from "expo";

export default class MarkerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
  }
  render() {
    let list = this.props.restaurants ? (
      this.props.restaurants.results.filter(item => item.photos).map(el => {
        let latlong = {
          latitude: el.geometry.location.lat,
          longitude: el.geometry.location.lng
        };
        if (el.opening_hours && el.opening_hours.open_now) {
          description = "Open Now";
          open = true;
          styleCallout = styles.descriptionOpen;
        } else if (el.opening_hours) {
          description = "Closed";
          open = false;
          styleCallout = styles.descriptionClosed;
        } else {
          description = "Opening Hours Not Available";
          open = "Unknown";
          styleCallout = styles.descriptionUnknown;
        }
        return (
          <MapView.Marker
            image={require("../assets/pin-easyaspie-final.png")}
            identifier={`${el.place_id} ${open}`}
            open={open}
            key={el.id}
            title={el.name}
            coordinate={latlong}
            pinColor="fuchsia"
            onPress={e => {
              let array = e.nativeEvent.id.split(" ");
              let id = array[0];
              let open = array[1];
              this.setState({ id, open });
            }}
          >
            <MapView.Callout
              onPress={e =>
                this.props.handelMarkerPress(this.state.id, this.state.open)
              }
              tooltip={false}
            >
              <View style={styles.callout}>
                <Text style={styles.title}>{el.name}</Text>
                <Text style={styleCallout}>{description}</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        );
      })
    ) : (
      <View />
    );
    return list;
  }
}
const styles = StyleSheet.create({
  callout: {
    padding: 12,
    maxWidth: 150,
    backgroundColor: "#ffffff"
  },
  calloutPressed: {
    padding: 12,
    maxWidth: 150,
    backgroundColor: "#ffffff"
  },
  title: {
    fontFamily: "raleway-blackitalic",
    fontSize: 12
  },
  descriptionOpen: {
    fontFamily: "raleway",
    fontSize: 12,
    marginTop: 3,
    color: "#4eb9ce"
  },
  descriptionClosed: {
    fontFamily: "raleway",
    fontSize: 12,
    marginTop: 3,
    color: "#b44316"
  },
  descriptionUnknown: {
    fontFamily: "raleway",
    fontSize: 12,
    marginTop: 3,
    color: "#888888"
  }
});

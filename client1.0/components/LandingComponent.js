import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MapView, Location, Permissions }  from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
    }
  }

  componentWillMount() {
    this.getLocation();
  }


  getLocation = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let location = await Location.watchPositionAsync({}, (pos) => {
      this.setState({ location: pos });
    })
  }
  handleRegionChangeComplete(e) {
    console.log('changed', e);
  }
  render() {
    let map = this.state.location ?
        <MapView
          style={styles.map}
          initialRegion={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: .005,
          longitudeDelta: .005
          }}
          onRegionChangeComplete = {this.handleRegionChangeComplete}
          showsUserLocation={true}
          showsMyLocationButton={true}
        /> : <Text> Loading </Text>
    return (
      <View style = {styles.container}>
        {map}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
    alignSelf: 'flex-end',
    width: '100%',
    height: '100%',
  },
  loader: {
    flex: 1,
    alignSelf: 'stretch',
  }
});

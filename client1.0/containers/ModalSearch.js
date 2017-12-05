import Modal from "react-native-modalbox";
import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

export default class ModalSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      initial: true,
      restaurants: null,
      pagetoken: null,
      locationChange: null
    };
  }
  onOpened = () => {
  }
  triggerFilter = (food) => {
    this.props.triggerFilter(food);
    this.refs.modalSearch.close();
  }


  // final render --------------------------------------------------------------
  render() {
    return (
      <Modal
        style={styles.modal}
        ref={"modalSearch"}
        swipeToClose={this.state.swipeToClose}
        onClosed={this.onClosed}
        swipeArea={250}
        onOpened={this.onOpened}
        onClosingState={this.onClosingState}
      >
        <View>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <Text>Modal Search</Text>
          <TextInput placeholder={"HELLO WORLD"} onSubmitEditing={(e) => {this.triggerFilter(e.nativeEvent.text)}}></TextInput>
        </View>
      </Modal>

    )
  }
}

const styles = StyleSheet.create({
});

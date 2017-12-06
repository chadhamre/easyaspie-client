import Modal from "react-native-modalbox";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

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

  triggerFilter = async food => {
    await this.props.triggerFilter(food);
    setTimeout(() => {
      this.refs.modalSearch.close();
    }, 700);
  };

  // final render --------------------------------------------------------------
  render() {
    return (
      <Modal
        style={styles.modal}
        ref={"modalSearch"}
        swipeArea={250}
        onClosed={() => console.log("CLOSED")}
        onOpened={() => console.log("OPENED")}
      >
        <View style={styles.wrap}>
          <Icon name={"ios-search"} size={50} style={styles.iconBlue} />
          <Text style={styles.text}>what kind of food do you feel like?</Text>
          <TextInput
            style={styles.input}
            placeholder={"Type here"}
            onSubmitEditing={e => {
              this.triggerFilter(e.nativeEvent.text);
            }}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#F2F2F2",
    paddingTop: "20%"
  },
  wrap: {
    width: "90%"
  },
  input: {
    fontFamily: "raleway",
    height: 60,
    borderWidth: 1.5,
    borderColor: "#48B9D0",
    paddingLeft: 6,
    borderRadius: 7,
    backgroundColor: "#FFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowRadius: 7,
    shadowOpacity: 0.2
  },
  text: {
    fontFamily: "raleway-blackitalic",
    fontSize: 18,
    marginVertical: 20,
    color: "#333",
    textAlign: "center"
  },
  iconBlue: {
    color: "#48B9D0",
    backgroundColor: "transparent",
    textAlign: "center"
  }
});

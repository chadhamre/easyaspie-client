import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";

export default class Timetable extends Component {
  renderTimetable() {
    let hours = this.props.hours;
    return hours.map((el, i) => {
      return <Text key={i}>{el}}</Text>;
    });
  }

  render() {
    const tableHead = ["Day", "Opening", "Closing"];
    const tableData = [
      ["mon", "8am", "11pm"],
      ["tues", "8am", "11pm"],
      ["wed", "8am", "11pm"],
      ["thu", "8am", "11pm"],
      ["fri", "8am", "11pm"],
      ["sat", "8am", "11pm"],
      ["sun", "8am", "11pm"]
    ];

    return (
      <View style={styles.table}>
        <Table>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} style={styles.row} textStyle={styles.text} />
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingsList: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 24
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { marginLeft: 5 },
  row: { height: 30 },
  table: { paddingHorizontal: 18, marginBottom: 24 }
});

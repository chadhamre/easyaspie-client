import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PercentageCircle from "react-native-percentage-circle";

import SourceIcons from "./SourceIcons";

export default class Ratings extends Component {

  renderIfRatings() {
    if (!this.props.ratings.rating) {
      return (
        <View>
          <Text style={styles.easyRatingNumber}>
            Sorry. There are no ratings for this location.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.rating}>
          <View style={styles.wrapper}>
          <PercentageCircle
            style={styles.roundthingy}
            radius={60}
            borderWidth={10}
            percent={this.props.ratings.rating}
            color={"#4eb9ce"}
          >
            <Text style={styles.easyRatingNumber}>
              {this.props.ratings.rating / 10}
            </Text>
          </PercentageCircle>
          </View>
        </View>
      );
    }
  }

  renderSources() {
    if (this.props.rating) {
      return <Text style={styles.title}>Our sources</Text>;
    }
  }

  render() {
    let count = 0;
    Object.keys(this.props.ratings.counts).forEach(
      key => (count += this.props.ratings.counts[key])
    );
    const hasRating = this.props.ratings.rating;
    return (
      <View style={styles.ratingsList}>

        <View style={styles.rating}>{this.renderIfRatings()}</View>
        <View style={styles.containerboth}>
          <View style={styles.sourcecounts}>
            <Text style={styles.countText}>{count} ratings from</Text>
          </View>
          <View style={styles.sources}>
            <SourceIcons sources={this.props.ratings.ratings} />
          </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerboth: {
    flexDirection: "column"
  },
  roundthingy: {
    alignSelf: "center",
    justifyContent: "center"
  },
  title: {
    color: "black",
    fontSize: 20,
    fontFamily: "raleway-blackitalic",
    marginBottom: 12
  },
  rating: {
    marginRight: 10
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12
  },
  sources: {
    flexDirection: "row",
    width: 200,
    alignItems: "center",
    justifyContent: "center"

  },
  sourcecounts: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  ratingsList: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingVertical: 12
  },
  easyRating: {
    fontSize: 24
  },
  easyRatingNumber: {
    color: "black",
    fontSize: 40,
    fontFamily: "raleway-blackitalic",
    marginBottom: 8
  },
  logos: {
    flexDirection: "row",
    paddingHorizontal: -5
  },
  countText: {
    paddingVertical: 6,
    fontWeight: "bold",
    fontStyle: "italic",
    alignSelf: "center"
  },
  icon: {
    height: 20,
    width: 20
  }
});

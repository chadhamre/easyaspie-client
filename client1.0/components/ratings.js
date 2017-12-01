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
        <View>
          <View style={styles.sourcecounts}>
            <Icon
              name="ios-arrow-round-back-outline"
              size={30}
              style={{
                paddingRight: 10,
                color: "grey",
                backgroundColor: "transparent"
              }}
            />
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
  roundthingy: {
    marginTop: 12
  },
  title: {
    color: "black",
    fontSize: 20,
    fontFamily: "raleway-blackitalic",
    marginBottom: 12
  },
  rating: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  sources: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  sourcecounts: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  ratingsList: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 20,
    paddingTop: 0
  },
  easyRating: {
    fontSize: 24
  },
  easyRatingNumber: {
    color: "#4eb9ce",
    fontSize: 40,
    fontFamily: "raleway-blackitalic",
    marginBottom: 8
  },
  logos: {
    flexDirection: "row",
    paddingHorizontal: -5
  },
  countText: {
    paddingTop: 5
  },
  icon: {
    height: 20,
    width: 20
  }
});

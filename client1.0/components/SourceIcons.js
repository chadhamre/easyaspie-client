import React, { Component } from "react";
import { Image } from "react-native";

export default class SourceIcons extends Component {
  render() {
    const providers = Object.keys(this.props.sources);
    return providers.map((el, i) => {
      if (el === "facebook")
        return (
          <Image
            key={i}
            style={{ width: 40, height: 40, marginRight: 3}}
            source={require("../assets/logos/fb.png")}
          />
        );
      if (el === "foursquare")
        return (
          <Image
            key={i}
            style={{ width: 40, height: 40, marginRight: 3}}
            source={require("../assets/logos/fs.png")}
          />
        );
      if (el === "happycow")
        return (
          <Image
            key={i}
            style={{ width: 40, height: 40, marginRight: 3}}
            source={require("../assets/logos/hc.png")}
          />
        );
      if (el === "tripadvisor")
        return (
          <Image
            key={i}
            style={{ width: 40, height: 40, marginRight: 3}}
            source={require("../assets/logos/ta.png")}
          />
        );
      if (el === "yelp")
        return (
          <Image
            key={i}
            style={{ width: 40, height: 40, marginRight: 3}}
            source={require("../assets/logos/yp.png")}
          />
        );
      // if (el === "google" && this.props.ratings.rating)
      //   return (
      //     <Image
      //       key={i}
      //       style={{ width: 35, height: 35 }}
      //       source={require("../assets/logos/go.png")}
      //     />
      //   );
    });
  }
}

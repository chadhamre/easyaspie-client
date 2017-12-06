import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

<<<<<<< HEAD
import RestaurantModal from "../containers/ModalComponent.js";
=======
import RestaurantModal from '../containers/ModalComponent.js'
>>>>>>> search

const restaurantModal = renderer.create(<RestaurantModal />);
const RestaurantModalInstance = restaurantModal.root;
const rendered = restaurantModal.toJSON();
const restaurantModalShallow = shallow(<RestaurantModal />);
const restaurantModalRender = restaurantModalShallow.dive();

it("ModalComponent renders without crashing", () => {
  expect(rendered).toBeTruthy();
});

it("ModalComponent renders correctly", () => {
  expect(rendered).toMatchSnapshot();
});

it("ModalComponent should not be affected by props", () => {
  const restaurantModalShallow = shallow(<RestaurantModal foo="bar" />);
  expect(restaurantModalShallow).toMatchSnapshot();
  restaurantModalShallow.setProps({ random: "prop" });
  expect(restaurantModalShallow).toMatchSnapshot();
});

describe("Test the different render depending on the state", () => {
  it("Should not render if no state", () => {
    expect(restaurantModalRender.find("ScrollView").length).toBe(0);
  });
  // it('Should render once the state is set', () => {
  //   let restaurantModalShallow = shallow(
  //     <RestaurantModal />, {lifecycleExperimental: true}
  //   );
  //   restaurantModalShallow = restaurantModalShallow.setProps({isOpen: true})
  //   restaurantModalShallow.setState({restaurantInfo:{placeHolderData}});
  //   expect(restaurantModalShallow.dive().find('ScrollView')).toBe(1);
  // })
});

const placeHolderData = {
  address: "Not Available!",
  bestPhoto:
    "https://memegenerator.net/img/instances/500x/67453856/you-know-what-really-grinds-our-gears-too-muchtoo-little-information.jpg",
  categories: ["none"],
  counts: {},
  hours: ["never"],
  location: {
    lat: 0,
    lng: 0
  },
  name: "Unknown",
  names: {
    foursquare: "",
    google: ""
  },
  phone: "+66 66 66 66",
  photos: [
    {
      checkin: {
        createdAt: 0,
        id: "0",
        timeZoneOffset: 0,
        type: "none"
      },
      suffix: "/12013472_j0-aWZubfISESmExbsVFpBWX8GMUupXDghjVJj70Duc.jpg",
      user: {
        firstName: "Dan",
        gender: "male",
        id: "12013472",
        lastName: "Ciocoiu",
        photo: {
          prefix: "https://igx.4sqi.net/img/user/",
          suffix: "/ZQJNY12VTHWG4D1M.jpg"
        }
      },
      width: 720
    }
  ],
  place_id: "None",
  price: 0,
  prices: {
    foursquare: 9999
  },
<<<<<<< HEAD
  rating: 11,
  ratings: {
    google: 0
  }
};
=======
}
>>>>>>> search

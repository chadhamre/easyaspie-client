import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import sinon from "sinon";

import Map from "../containers/MapComponent";

const map = renderer.create(<Map />);
const mapInstance = map.root;
const rendered = map.toJSON();
const mapShallow = shallow(<Map />);
const mapRender = mapShallow.dive();

it("MapComponent renders without crashing", () => {
  expect(rendered).toBeTruthy();
});

it("MapComponent renders correctly", () => {
  expect(rendered).toMatchSnapshot();
});

it("MapComponent should not be affected by props", () => {
  const mapShallow = shallow(<Map foo="bar" />);
  expect(mapShallow).toMatchSnapshot();
  mapShallow.setProps({ random: "prop" });
  expect(mapShallow).toMatchSnapshot();
});

describe("Testing render of MapView", () => {
  it("should not render a MapView if no initial location", () => {
    expect(mapRender.find("MapView").length).toBe(0);
  });
});

it("MapComponent should always have a RestaurantModal", () => {
  expect(mapRender.find("RestaurantModal").length).toBe(1);
  mapShallow.setState({ location: { coords: { longitude: 1, latitude: 1 } } });
  expect(mapShallow.dive().find("RestaurantModal").length).toBe(1);
});

describe("Testing functions", () => {
  const instance = map.getInstance();
  it("handleButtonClick changes the state when calledd", () => {
    expect(instance.handleButtonClick(false)).toMatchSnapshot();
    expect(instance.handleButtonClick(true)).toMatchSnapshot();
  });
  it("getPlaces doesn't get places if a state is not set", () => {
    fetch.mockReject();
    expect(instance.getPlaces()).toMatchSnapshot();
    expect(instance.getPlaces(41.390205, 2.154007)).toMatchSnapshot();
    expect(instance.getPlaces(41.390205, 2.154007, 0.003)).toMatchSnapshot();
  });
  it("getPlaces correctly calls the api once the state is set", () => {
    instance.setState({ intial: true });
    fetch.mockResponse(JSON.stringify(mockPlaces));
    expect(instance.getPlaces(41.390205, 2.154007, 0.003)).toMatchSnapshot();
    expect(
      instance.getPlaces(41.390205, 2.154007, 0.003, mockPageToken)
    ).toMatchSnapshot();
  });
  it("calls getPlaces when region changes", () => {
    const regionChangeSpy = sinon.spy(instance, "handleRegionChangeComplete");
    const stateSpy = sinon.spy(instance, "setState");
    instance.handleRegionChangeComplete(mockLocation);
    expect(regionChangeSpy.calledOnce).toBe(true);
    expect(stateSpy.calledOnce).toBe(false);
  });
});

const mockStateLocation = {
  coords: { latitude: 41.390891, longitude: 2.152048 }
};
const mockLocation = { latitude: 41.390891, longitude: 2.152048 };
const mockLocationDiff = { latitude: 43.390891, longitude: 4.152048 };
const mockPageToken =
  "CqQCGwEAAEhnE7xgqGaX8izyyX6fPTL2K6GIon6ltuIiwYIXElHeMfVFSwV8iBIy-sY0NGi8g5kuizD2KcqG2IuaTVt9N5AksILM0ASxNqHAAkYNLORBwvZqSAlxGAHZGYGMOIXKQHGZcIpA1gBEw-auO4rxaXcQuzu-pu7ok_kmdbwYPvQoB7aFgCmkqP8m5xsCLTW-WqYFQCiLPfF2XFWlbtxEBve4BkIaDoN4CM1AQis6VYGSraZafjkvd4weH3f_DPFUBnbSlH_V7pHAw4S0JUslsEM5EmTCq23A7H9c0bLFNpCKMqhd8Nm-0Ivr6AELKmGOcxbVkC2ZV1uiZgdYUb4jIcR5JAx1SihCkCG_eb9sSKmGFtPVcvIbA692oD42jb7u4RIQMuP11qIxchtDSmrbhtye7xoUnZDi-CLOfOccybSb9IpBWalIaPQ";
const mockPlaces = {
  html_attributions: [],
  next_page_token:
    "CqQCGwEAAEhnE7xgqGaX8izyyX6fPTL2K6GIon6ltuIiwYIXElHeMfVFSwV8iBIy-sY0NGi8g5kuizD2KcqG2IuaTVt9N5AksILM0ASxNqHAAkYNLORBwvZqSAlxGAHZGYGMOIXKQHGZcIpA1gBEw-auO4rxaXcQuzu-pu7ok_kmdbwYPvQoB7aFgCmkqP8m5xsCLTW-WqYFQCiLPfF2XFWlbtxEBve4BkIaDoN4CM1AQis6VYGSraZafjkvd4weH3f_DPFUBnbSlH_V7pHAw4S0JUslsEM5EmTCq23A7H9c0bLFNpCKMqhd8Nm-0Ivr6AELKmGOcxbVkC2ZV1uiZgdYUb4jIcR5JAx1SihCkCG_eb9sSKmGFtPVcvIbA692oD42jb7u4RIQMuP11qIxchtDSmrbhtye7xoUnZDi-CLOfOccybSb9IpBWalIaPQ",
  results: [
    {
      geometry: {
        location: {
          lat: 41.3910101,
          lng: 2.1557304
        },
        viewport: {
          northeast: {
            lat: 41.39237833029151,
            lng: 2.157105980291502
          },
          southwest: {
            lat: 41.38968036970851,
            lng: 2.154408019708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "12c1001ddba194bccf64d95c2d2c44198a81308a",
      name: "La Camarga Restaurant",
      photos: [
        {
          height: 3024,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/107753976199586761081/photos">SERGIO I. DUARTE</a>'
          ],
          photo_reference:
            "CmRaAAAAFbmpuLtMJhXUmWWIe6SHzWUqkbz-LEXCQ30A02vJVP2f7MrU0HyazrFm6FNQF5w-2tnDDS9h4ZeIOWcDaNOqloYR60qGW6l6ClNxQTTwgy9dj_IPUBvL9opyQ1FRJYYZEhDhIPGxb07tfGXrUSOPyaSXGhQK6Yo4yLvmbFrV8f3QzexVhTrukA",
          width: 4032
        }
      ],
      place_id: "ChIJQ6Ii4o-ipBIRuNA6MGCtKUM",
      rating: 3.9,
      reference:
        "CmRRAAAA9h6MA4DCFnXlB7sh4iNZS8m9kmwc11vK0jral8d0XSkfON658dDXmWgVFI5rg35jzfzfUxnVsSHucwN8t4kFJpeBUz2r_ZR3F8Y6hePCbjGJpw4CCgVY4wjTJkMToBWoEhBJCif_QKWIhwyMPd_7wgQiGhSNr-SuszDrlR01doMy7FBcQcKLSg",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer d'Aribau, 117, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.3921398,
          lng: 2.1533297
        },
        viewport: {
          northeast: {
            lat: 41.3934494802915,
            lng: 2.154731730291502
          },
          southwest: {
            lat: 41.3907515197085,
            lng: 2.152033769708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "d3978a3c57b1ee71ed6b472f73944af2458f16cd",
      name: "Totora",
      opening_hours: {
        open_now: false,
        weekday_text: []
      },
      photos: [
        {
          height: 314,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/101174528354363707260/photos">Totora</a>'
          ],
          photo_reference:
            "CmRaAAAA1JZyCnNxyqSWxJ2HfSfZl39zRmGNDQelxK--EK440YAIsXLyichLZmln53pP5Ro9wVP7wLm4ZYaKDQCmUAzTEtNE_jtUuMbLgB_uTYhOnCUqMjSE2gRyBGU2DwxdaOnmEhDekLLZd3O5rI0JFcz9D5ceGhQhCdFeYJoSDGtCAVNU6Mi3L12sEA",
          width: 559
        }
      ],
      place_id: "ChIJeWtbwZqipBIR_PmptyMC6SM",
      rating: 4.1,
      reference:
        "CmRRAAAAcJrItzZKwDy7tvdVTrp1r8zD54jueTcjPftSQ7gGObUUUDxEf4juxFC_7DkLBQ9WbAU3jhKvouMkXrCPCxfIe6IMv15iRCo8tERXsEDPR650Etu3-jt4pGoPIHGBq-L7EhA-Sd7dJb1sggUSaiDj1tlAGhT_afuIC8AZ_WDNmQV7tBGyXF8haQ",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer de Còrsega, 235, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.3919343,
          lng: 2.155344399999999
        },
        viewport: {
          northeast: {
            lat: 41.3932399802915,
            lng: 2.156752930291501
          },
          southwest: {
            lat: 41.3905420197085,
            lng: 2.154054969708497
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "8e4690f0fb0184e26248780d13eb7760d87cbe63",
      name: "Balthazar",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      photos: [
        {
          height: 852,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/101409544747291360618/photos">Balthazar</a>'
          ],
          photo_reference:
            "CmRaAAAA0tgEpZdPizQDHyYibkB5bDx4SEtwjsI--7FORK0VQ8swa0v7f1iavuCw9vzQGIjlDsYPw7aFeg1am8-xkr2_VqXtjy9LXxl3cfSAIZ-1o9dS1WhxTSEeo4HRI3vw58f2EhD9CRZY9oJ746k-FEsmoaipGhRnW0oREziqKr9y5C9zLCCb7rOsCg",
          width: 1280
        }
      ],
      place_id: "ChIJH0DTCJCipBIRJDTuMCJ1Hkc",
      rating: 3.9,
      reference:
        "CmRRAAAAxpADeCOtV4VRxtf2W8ytNJCRf7PA4r1rzq4sJmhwlssL6q-CFVttNjG_99DuV7ICOdsSU45_kzm85_5zzftIbUx0d-Wj1yPCh3t3eaS5NP8Dl0zGOLR6qKtDGrt2aa5vEhBJIleFAORipgekvv6P5G-NGhQ7wo5OU4tqWhqf8h-4CStaBMrElg",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer del Rosselló, 189, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.39119700000001,
          lng: 2.154704
        },
        viewport: {
          northeast: {
            lat: 41.3925663802915,
            lng: 2.156026730291502
          },
          southwest: {
            lat: 41.3898684197085,
            lng: 2.153328769708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "f639994c28e53af86d332d9c19cf3e8c7eabaf2a",
      name: "On sushi restaurant",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      photos: [
        {
          height: 600,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/116606883912554528583/photos">On sushi restaurant</a>'
          ],
          photo_reference:
            "CmRaAAAA5jCN9zOTmwpl-POYokg3HqCqWLuT86qJalpdAF7ygXOeUV1lTdL-QfEsGoBxU-kgbL6kXdeCQxqxWFbIA40zQoyo1v3esZRbP3yncXfzg9QqWWY8XzXDCjJM5k4cWC9qEhCEsZlu7RmBtEa3FTruM_4sGhRVUpTUelLLcex8JdgSxaXijB-cdw",
          width: 800
        }
      ],
      place_id: "ChIJVf7gqpqipBIRJpWKuE3SP3Y",
      rating: 4.4,
      reference:
        "CmRRAAAAqre_SzaxCvBXdB02EoF8oIbBLBfiqbiQ-2OpuXdxxdSYG6biJ3B1pNh805qTYUmiBj5PqA0bUBKzMivFFOCEhSBoRSCeDulJYNgwsf0naBUGYMuSj6z3HOTvuuFU6FLYEhCV341mhHgt0Tgb36oRiI4uGhRKIKNGK91tpo1iUAGEb3M0JI6rZg",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer del Rosselló, 154, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.3910565,
          lng: 2.1545282
        },
        viewport: {
          northeast: {
            lat: 41.3924304302915,
            lng: 2.155845080291502
          },
          southwest: {
            lat: 41.3897324697085,
            lng: 2.153147119708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "611b0b2125e0cc3485cb610658b372295781e325",
      name: "Restaurant Semproniana",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      photos: [
        {
          height: 2832,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/112896420664095050984/photos">Francesc Meseguer</a>'
          ],
          photo_reference:
            "CmRaAAAAfZx3Bh8PCj_Bc09IK2bo3ZkevAqNN1GulRhtgnMN-_mtMfeMo2HOTrz07_hacnI6PwLpDKaWZee5HnwoEnnAd3vVNPBNwl5pZ0SJXobqzg52KQLBC0MaqOUrXLkY0fJ4EhDUojnM0WYw75OFB-ygjSvqGhQ3cIlcICIatZnWbmMoUNDAMIi1Rg",
          width: 4256
        }
      ],
      place_id: "ChIJba4xU4WipBIRWnFcrrb1CpY",
      rating: 4.4,
      reference:
        "CmRSAAAA27Cfv4BHoDQW6bFYq_ct3I7UeHUg2cm5pHW-OBHKrp1i8StcA1Rn_FWu3wTpN5S4rXt6kZDHh_vQkdkqPQPgvM5jdv1K9ZCWJfvgnkJ9DLwFdbkRthawRQwUyNuAHABCEhCLh0ZaIGrBETK8gi46Z5dxGhSw-GDWNqk7Zi5C1ZSWyncwxzYHCA",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer del Rosselló, 148, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.3909935,
          lng: 2.1534845
        },
        viewport: {
          northeast: {
            lat: 41.3923666302915,
            lng: 2.154865530291501
          },
          southwest: {
            lat: 41.38966866970851,
            lng: 2.152167569708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "d047cf7e86fa1e9b3530a2ffd302da39ae9dacca",
      name: "Tempura Ya Restaurant",
      opening_hours: {
        open_now: false,
        weekday_text: []
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/102622168428702340028/photos">EDUARDO AMOROS ARGOS</a>'
          ],
          photo_reference:
            "CmRaAAAAKWXdKHHcB4SHbDBU1ZvWXM0oXHTKk5uZb6IYXxzxbMNiJPdzaoFtHeOTbAUkpEqqr7txNv_vmAorBlK5YWpcOyvVMP3qXbGR-VJcq6aheNBcoOCeuD-3qDItUpHJrwU0EhCznuf_8KYQ9ElREiRKgv1fGhSdSx-SQM7wHL3fgMpf_8uRgrRS8Q",
          width: 4032
        }
      ],
      place_id: "ChIJKZjWNIWipBIRPfTXz_HYFFs",
      rating: 4.6,
      reference:
        "CmRRAAAACJFNb84__Xpsg1elFgrF-5DBvS5rg_GnUQQlQp6khHk9Rim-c4ZhYboHHQPhDjyo1W1uIIz5UFaVVgY28tK6nfx6DxTFjZrVmM7sPf4T0uiWqMJmz50YktrC8mq8x4CVEhB9EnvkhwNDZ3V973XtfoKaGhTukW0zRIXemV9FlhcIcnrov7uqNQ",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer de Muntaner, 153, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.3912972,
          lng: 2.1519885
        },
        viewport: {
          northeast: {
            lat: 41.39256423029151,
            lng: 2.153446830291502
          },
          southwest: {
            lat: 41.38986626970851,
            lng: 2.150748869708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "1d88924fb5d9a50f37c14cd1addb6686c29234b6",
      name: "Sindur Indian Restaurant, Cuisine Barcelona, Spain",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      photos: [
        {
          height: 923,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/107238809828524766101/photos">Sindur Indian Restaurant, Cuisine Barcelona, Spain</a>'
          ],
          photo_reference:
            "CmRaAAAAixspZOwxIrPZg4bXY3TqTTcaj7lcgBDsvRjmMRH6dCcnJt6DZ94sFKGhd-dfND_qu7ZU_9GWSfkijv4zZqB9xNDYtNlCAPRwoL18oaeoppQ5nkV0_eDRbb3Z1tnmxSixEhARJsp6V6l8XC32U1oLiuWDGhQzymNvdNjpiDFB4gd0KNP8LH8f0Q",
          width: 928
        }
      ],
      place_id: "ChIJqxlH04SipBIRlCYTR11AFsw",
      rating: 4.2,
      reference:
        "CmRSAAAAzzWKIKYEcrRrD71TJmba8_Kp8vtPIoIq4GKcnilHKGTkeoJ5TQN1h24BMhud-mNMoObZXM3EKOwrR8b-n6VPTw122lKKnRkOIWJV8RMmY43gAuh16qaHKg70rvpkdUl-EhBKgrhRcznrFFf97bbSl1hXGhSDdnPQwscX23hP1kpDA9rXjymQfg",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer de Còrsega, 211, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.39168059999999,
          lng: 2.1524923
        },
        viewport: {
          northeast: {
            lat: 41.3930675302915,
            lng: 2.153892480291502
          },
          southwest: {
            lat: 41.3903695697085,
            lng: 2.151194519708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "113270771934e1ba21aaaee7a72ca1ef4e8c8d88",
      name: "Paco Meralgo",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      photos: [
        {
          height: 315,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/114727150647107464101/photos">Paco Meralgo</a>'
          ],
          photo_reference:
            "CmRaAAAAsMNwZ27MzKvGqunQrmet_NdQ9IMgY_wy-a9d0bryFHrKyChQ1vJGbQg6Q-4-NmLXL_HwVCKc8PwhOp0jTpy43n_uDMaVN0u-7LN7sw_6RRzRuFJD2pnGZlZTIf_gIPyYEhCB9L3LIUzWliopbLGDFc6eGhT2n6SJH5kTJbDM8pbxEH4Ov0bufQ",
          width: 851
        }
      ],
      place_id: "ChIJzeQs2JqipBIREQ4pkufEXzM",
      price_level: 1,
      rating: 4.3,
      reference:
        "CmRRAAAAuRebM2wNX40Z4qWZTwbmTugMczzkU34DZ8nWnAuSg1JuyJsD_bTuIs8gVYTBcdYds42KvnYqoYm8m-j0h_kcaumzbaoZensF9gYJffX1qONgPyIQfi5khRku-TTZ_Xo6EhDdrxKSe3wigeEgT7B03pFPGhSImp79IygHD9PApy86V5z2DoP6Ug",
      scope: "GOOGLE",
      types: [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      vicinity: "Carrer de Muntaner, 171, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.3905614,
          lng: 2.1566464
        },
        viewport: {
          northeast: {
            lat: 41.3918697302915,
            lng: 2.157942180291502
          },
          southwest: {
            lat: 41.3891717697085,
            lng: 2.155244219708499
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "158e6b126b3b3bdd6a0e165666e554b3880f9bf9",
      name: "Out of China",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/117795304713727990557/photos">Gregory Demeyer</a>'
          ],
          photo_reference:
            "CmRaAAAAZaxuQtGr9b4XhsQdN815FuC0vaAlWMxB89RmIhSiskc1REXg9Tc-ajf49GUEyAgui0m_O-8jAFviEzzZ9nVFAgroKnSZUkhigi_YueumjZZ0Ri_4TZQ1fljiEdluilAdEhD1dldx1WlfbqmR-TJVaI-GGhTxCtTPN21JymdsFjzf9JCEQT5MhQ",
          width: 4032
        }
      ],
      place_id: "ChIJwx2rAI-ipBIREEBZZQjlgGk",
      rating: 4.3,
      reference:
        "CmRRAAAAzQ9r1ewFbLPo6f5gLAr9NGZZmA5fzIzmmXi4YSc8OjLqgs7rIB6LG7IfU_danHzfl2cxCqrJiIdwOa7MI7bJiLQt6nf1EcFOTnHVzCpDdcJAUiOInJOwoOtT8UF-7m7HEhDFiNkKFlV8LQWck3qDs3OsGhRIIPg2TzTVLwIwT75GKyT0up-ntw",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer d'Aribau, 112, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.3896858,
          lng: 2.154946
        },
        viewport: {
          northeast: {
            lat: 41.3911078302915,
            lng: 2.156391980291501
          },
          southwest: {
            lat: 41.3884098697085,
            lng: 2.153694019708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "452cf472af6d535e3e4f5d6f4c1907347744242a",
      name: "Restaurant Maur Muntaner",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      photos: [
        {
          height: 2322,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/115855062999032654918/photos">Montse Llorens</a>'
          ],
          photo_reference:
            "CmRaAAAAqDYf-smkgSDayFqthgPQoeAgtMhebybpxAqVZSDiz_7uObOLWxJR4Jh_7fsLm0iaONoMDH_STpINUGIO2cCMec3nd9ksxy5uS09ipcLEo7v3uyXvSLmRNt1iRJrBkqHSEhDmGuPXYWPKdM5kEqXovGEyGhRY89Cpy-u5RaPhg0eZwfy_oz79kQ",
          width: 4128
        }
      ],
      place_id: "ChIJTZ99i4-ipBIRnbXFB_KdaE0",
      rating: 3.9,
      reference:
        "CmRRAAAA1Ms_IaGfuuz1lWuTJEa9Yxofpa_Rygf_AEh-FEXiPnv7sa9a7XqUZBZ65UjnJ8lsSKmgIQxSkrEHV6rO3xVwfJLhsg8YvIg6r-9gAFvZ1vyWRzLokeHit37oTjOXfkioEhB6ARUBF7CEzROP_OEyRRc5GhRTPV00f17TAMUnuqo4QccqniEdyA",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer de Muntaner, 121, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.3919026,
          lng: 2.154540599999999
        },
        viewport: {
          northeast: {
            lat: 41.3932790802915,
            lng: 2.155927080291502
          },
          southwest: {
            lat: 41.3905811197085,
            lng: 2.153229119708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "3f601b91320ab50d24c200ff9babd52b46e269b7",
      name: "Jardinet d'Aribau",
      opening_hours: {
        open_now: false,
        weekday_text: []
      },
      photos: [
        {
          height: 533,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/106134591092998320202/photos">Jardinet d&#39;Aribau</a>'
          ],
          photo_reference:
            "CmRaAAAAD-HXlbdUsZEiXkaGDlKiRzK0xHFza7h_p8eRohBJWUPtsvBCTgbSEXtTaZWZspWRstgD-enKT8tkttW6eH0-crlXukM1HTIbZJC7Gt8X1tM1ZYV0h8bcul14mvggTWYrEhDCV4cFT_69PGA0_l6BjixeGhTsLCDN9BA1JhOMUoz2lN9etg6daQ",
          width: 800
        }
      ],
      place_id: "ChIJM6_vppqipBIRl0l4gxPl4Rs",
      rating: 3.6,
      reference:
        "CmRRAAAAruvS5p2Cc42hIt5rcZ7U0Mk1DuM6K2YUEBjN-ci39cd_2CGF7FREoRQDs2SXsM4tVWCB25cER6ZVwnA1vO3h-37jFQnjNAU-uMHPQ3JaJrO_I1g8bIeRhN8P4E6oEUBAEhB70KALi9XcNG_DtQunVA_EGhTm4ahV4MCBhJqDpRCxLNbep5Rqrw",
      scope: "GOOGLE",
      types: [
        "restaurant",
        "bar",
        "food",
        "point_of_interest",
        "establishment"
      ],
      vicinity: "Carrer d'Aribau, 133, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.391043,
          lng: 2.15222
        },
        viewport: {
          northeast: {
            lat: 41.3923919802915,
            lng: 2.153568980291502
          },
          southwest: {
            lat: 41.3896940197085,
            lng: 2.150871019708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "9edd825c93698c820294be64c07f3e0b3190e98c",
      name: "Restaurant Gaig",
      opening_hours: {
        open_now: false,
        weekday_text: []
      },
      photos: [
        {
          height: 945,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/105431942257017783950/photos">Restaurant Gaig</a>'
          ],
          photo_reference:
            "CmRaAAAAvCI3vEEC270SSWicwIH47KSPmMelACwqc_2svDTFWz-aaZYI9hvD_GOuNm4bNu2Po6mzGoLhYlKzcN_J53c6bVj-7UN_CEhUd3YK55cayFPUAZxnf1VNqAxBlm4bHPVfEhDkhY2temGqDMW51aZl75PAGhQ8YowjXEiruYhAVewoluYc83GM4w",
          width: 1418
        }
      ],
      place_id: "ChIJ09Z704SipBIRhSUv_gnn7eQ",
      rating: 4.3,
      reference:
        "CmRSAAAARjg1W9falxhEjUyjn53TIp0cpG7C27iEpuCbJG0ucPKj1njVxYAE4MazUmSHPcYzNkg32hmpZtRc_9QVxkK0MeaOuWo8zzr1dvSWQeogpoTfKzhVRAydSvDhQ8htpZJSEhABz7_z-Mv5_nejFQS-JIbwGhTXbpukpCAJESy--wfIXmZ6qfnQOA",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer de Còrsega, 200, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.390891,
          lng: 2.152048
        },
        viewport: {
          northeast: {
            lat: 41.39227063029149,
            lng: 2.153356080291502
          },
          southwest: {
            lat: 41.38957266970849,
            lng: 2.150658119708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "5d6a9ebc225cb060cd3483fad1b0096ea05985c4",
      name: "El Racó",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      photos: [
        {
          height: 3120,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/104764614283723715513/photos">Helena</a>'
          ],
          photo_reference:
            "CmRaAAAAxUJ7BEsWqSQso8yfanDWdu_6CM5ypnWZ_JwFUGTwKcb9lI7_X9C156nrWOaU04Cb2VnHlrqg6bb7mFtmFh_I17-o-jqXsOljladhI6Ha2PeNEzlF8RSXqsmRxFOYFCDCEhBuSWYgh7Art2PtfhbEsPFyGhT3Id3fycDA8ph-I9C-TSuvuAKoqQ",
          width: 4160
        }
      ],
      place_id: "ChIJJ_cczoSipBIRe6YhucIbMOA",
      rating: 3.7,
      reference:
        "CmRSAAAAl1uRgfDcLFJRvDZeplzRYCl0jv_pY_6Asu1AEPhMSWZPePd-LOyvNT1KA0xWAQD7_AFJ3per_Nsb_R0rYO8uwxI0RLZMXpoRtL2aAbvZCwwTOrbIzBY5bQjgbINNr6i-EhD_T_3myMhNXsHwSWdINZDYGhSjojQJwRQjR0hAdfLR635q_kpifw",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer de Còrsega, 196, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.3913194,
          lng: 2.1551673
        },
        viewport: {
          northeast: {
            lat: 41.3927199802915,
            lng: 2.156587680291502
          },
          southwest: {
            lat: 41.3900220197085,
            lng: 2.153889719708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "0cfd28b5e64d2769effcc71bed057c2ba2018d0a",
      name: "Soda Bus",
      opening_hours: {
        open_now: false,
        weekday_text: []
      },
      photos: [
        {
          height: 640,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/114464640109845599194/photos">Soda Bus</a>'
          ],
          photo_reference:
            "CmRaAAAArM-pQZilH5tUqC94qDdALRTIzCAc9iKpCW8o6IjrY-YgBsolgu21jfQ9fs9TpWaBWcw07riPpkwv-WFgyTzPGbMYTlcj3nycOXdy_xCqr085UcgJ3W-ppz3jYNsoWuwaEhAf_Sq0GZ0hIue9GTo0HW1-GhSWp-v-mpNNJ1vT2VGBc3DTwOh0IQ",
          width: 960
        }
      ],
      place_id: "ChIJHWeTA5CipBIRRKhYM4-E_hM",
      rating: 3.8,
      reference:
        "CmRRAAAAIXkKjWOLQvlI3s93xXv7MEUr73BY9D4EnseAblNfIM10Cj6MwG9jvsgMqu6JGeVQ-cqLpIuLRLJkJFCRuFEUcc-D5jp_T4H3xUe-FUsXYJpOzzvx9bIlJpNv3RXruJReEhBoafQ7USauKfPewG97GJ_0GhRyXkiGycN38Lto72uTsv8mPHAe5Q",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer d'Aribau, 125, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.392092,
          lng: 2.154257
        },
        viewport: {
          northeast: {
            lat: 41.3934753802915,
            lng: 2.155652880291502
          },
          southwest: {
            lat: 41.39077741970851,
            lng: 2.152954919708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "7a59ec1ee9bcda5c7ed4f4a0f7c1ab5deccc2f9f",
      name: "Nostrum Aribau Barcelona",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      photos: [
        {
          height: 549,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/104733143780069985227/photos">Nostrum Aribau Barcelona</a>'
          ],
          photo_reference:
            "CmRaAAAA0ejLc8Hjs7VxYdEED1EwVknGg_d1Nezf0Nb-2cSOATopuu5634wpOvx-YxGZjDhLSwqY8lEQK_5foVN2qcuoWujfF2-ohw73zZ5j44sy_A-ESEUgqNqiJtUimf7QHkgxEhB8zXpmL4DZjf_UOIKoxZbvGhQw1_aB_Xw6VupAS2SVw_0gW4J5nA",
          width: 547
        }
      ],
      place_id: "ChIJu9NEo5qipBIRr0ewRY5BJtg",
      rating: 3.2,
      reference:
        "CmRSAAAAlXbQXLzpevTIp7KUzV80Si5efF0Vvfm3V1U7fJb-IMMpF9aDGIImg8Jsu9yGxrwrnEbt_pdSogdTyVc4oRdE_jKK5FYoDMbev5WP8XxVOCoqKDltCYxJ1X5JbbUFqujKEhDjk6nyrrzy-Vcv7F-WPaZDGhRWSd0kopbpdGdDiFB6lpVfcm8hiQ",
      scope: "GOOGLE",
      types: [
        "meal_takeaway",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      vicinity: "Carrer d'Aribau, 139, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.3918232,
          lng: 2.1523695
        },
        viewport: {
          northeast: {
            lat: 41.3931979302915,
            lng: 2.153753180291502
          },
          southwest: {
            lat: 41.3904999697085,
            lng: 2.151055219708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "7878a596c76f7c2d8d7ed87e9a62cf9d35eda7e0",
      name: "Restaurante Las Viñas De Muntaner",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      photos: [
        {
          height: 1080,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/109118843532137473487/photos">Joan García</a>'
          ],
          photo_reference:
            "CmRaAAAAqfxCrMGioq7wmv645rwJ_58QuxraAF3pQ10XZLWrf6Z2sljvj8BRqcrm81m6rMUbBx37nIiAuznyUuLo1Jua6W8exlLz69wuEboQOFk5CnZrZCuNfTs_F8GYUSKTKOLPEhAkRmiGxqu7qpTQTSxb9NpdGhTEcs14sGVlOwupMpSWs6KQ-Z1w1w",
          width: 1920
        }
      ],
      place_id: "ChIJXz5UJ5uipBIRDy-WDE4oXg8",
      rating: 4.4,
      reference:
        "CmRRAAAAyxyRj3GxfrnzjGGU7qVlmCsI1SDH0bjqil2h-BrZIYeX08W4xq_tHlGS2i3Qss3mi_PFtmM2C5Ct1ikBqAf49-of6FhaJL5cCxhX__yjRyFn7QkmTeCq-g0SJuIQhPHmEhAyYFB2wGnRhcnsF-t9fLqBGhQeFfPUE83ml7X16rc9yzeeviBAvg",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer de Muntaner, 173, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.3895639,
          lng: 2.1557036
        },
        viewport: {
          northeast: {
            lat: 41.3908744302915,
            lng: 2.157001530291502
          },
          southwest: {
            lat: 41.3881764697085,
            lng: 2.154303569708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "160e827ac8d4ddc0581930d2f2817e9c7a054028",
      name: "Can Pep",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      place_id: "ChIJXWp_kY-ipBIR-oxFlEVK2fs",
      rating: 4.4,
      reference:
        "CmRSAAAAECUqXof9oOLACp_oSziTi9fhci0gELndCC441Tkvz90Itl9UnS2trxmGx-kJNX4JnJQlpemJ73HV83ynbBO8nXrjzw8fklH7x8vspcOdzCvmjPk14q0wCi2Stsk2f3FREhDlrJYs8FRYj0I319MchqEaGhRiTAl7RA6Tk0LdRUtzzDs65QzIYA",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer de Muntaner, 124, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.3921801,
          lng: 2.1545212
        },
        viewport: {
          northeast: {
            lat: 41.3934924302915,
            lng: 2.155820180291502
          },
          southwest: {
            lat: 41.3907944697085,
            lng: 2.153122219708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "b17c7fe355f4c9a17a7f37138ebbae7393a290b6",
      name: "I Sapori d'Italia",
      photos: [
        {
          height: 3264,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/100675118632959483080/photos">Damián García - Mediaty</a>'
          ],
          photo_reference:
            "CmRaAAAAg0ozt4pSZ93LCGmVOmoSc1fkrW54aICSI2J8d-Mz2TOrVe3G0btVGX020B8tnkXZfOZdbVdIzOLkodgKJFeJeU4bE1J72QVENZf2AMSkytqiDATLEVBp15dWy6jtxXF0EhD0zFwFrdAO2QolumTybgfzGhRSP6iWJ2J3ISr3SyTtHxl2YBOzHw",
          width: 4928
        }
      ],
      place_id: "ChIJgYlnoZqipBIRhe2TwF9WOJs",
      rating: 3.8,
      reference:
        "CmRSAAAA7Y7Ulhn2SAt5Tem_mB2CRrigZMf4F9qGw0xxbEPE63fLKFo-N1u7EzghtiOC0B1uzdoHyXb7_w-lhRcg_ur1y0QQLbLdR1rYrOJz7ujsVVZNVTYgFpK1WR-RfGAlFittEhCQT_1r6EIpOkPgvFNvsDjGGhQfFjS58guuygCDKRqOWT1OMZfp7A",
      scope: "GOOGLE",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      vicinity: "Carrer d'Aribau, 152, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.391701,
          lng: 2.155481
        },
        viewport: {
          northeast: {
            lat: 41.39308878029149,
            lng: 2.156776580291502
          },
          southwest: {
            lat: 41.3903908197085,
            lng: 2.154078619708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "d853793f661fcd2035ec32beae748f613e559436",
      name: "Bodega Joan",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      photos: [
        {
          height: 659,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/100623719493916741517/photos">Bodega Joan</a>'
          ],
          photo_reference:
            "CmRaAAAAVPYzbqe2P7ZlDrnDB2eZldhjAzUUKtM11xTf-osXwPDbLApGUD_-5ujaq5t2Yan_O0txrrZwTRvfcsswK52Lmg6TZDiwSb-9uecOOHWuBSg-5GjrqxZWIQUaXm-PNx4fEhDLvsCiCpVa3OutdmQh2rWgGhR1L1wo-mybVAi5R8ivVWdz32ZzzQ",
          width: 1738
        }
      ],
      place_id: "ChIJ5YkqEJCipBIRytgEt290J5Q",
      rating: 4.3,
      reference:
        "CmRSAAAA9RECKJYDB05pkIkiW8nLLPSWeYTCKP4mFsp89Xe912VNG6hyQXd-u24W75t0bNNZwCtUBOXTQxzAgwaRpRwhxJHicHHrig51jHeKWL3pdR-bvYJVazZlqbkzfChVBDmWEhClETzNJ-cWQpvtD_6HosDvGhSTsP4I7FOIQB1G40fY4tD-z0D9RA",
      scope: "GOOGLE",
      types: [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      vicinity: "Carrer del Rosselló, 164, Barcelona"
    },
    {
      geometry: {
        location: {
          lat: 41.38993920000001,
          lng: 2.153485
        },
        viewport: {
          northeast: {
            lat: 41.3912210802915,
            lng: 2.154741780291502
          },
          southwest: {
            lat: 41.3885231197085,
            lng: 2.152043819708498
          }
        }
      },
      icon:
        "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "4415580c018054a79c6f4651694529af19f5cce8",
      name: "Public Cafè",
      opening_hours: {
        open_now: true,
        weekday_text: []
      },
      photos: [
        {
          height: 1536,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/118437675724857495857/photos">Public Cafè</a>'
          ],
          photo_reference:
            "CmRaAAAA2HU0OLPJC2AjQfphAK4Z1cRKfqreIkS38-dzTS-4JJxWg9Qett9IGef5b1avAEqLIaFUP-du-IyWMUaDDMnOA8TyVsMND9eXzmidGG0DHsE9yqypiGfJnxow0Z46pehJEhBbRQi7llFGk_uy06vYyrwBGhSib8Kfpn27DJnw3lGTdAsBl7MZ5A",
          width: 2048
        }
      ],
      place_id: "ChIJq1OEFYWipBIRXm8Yu5yzoh8",
      rating: 3.8,
      reference:
        "CmRRAAAAqduwl0gnmsZOTvVbAvCXbS_CrRcGxYoPb-TrdZxDQe-dc5WRHNYb04LIqjKzo__2HPA96T61dJXt48W1aPS-6LsGG0vWcg7n5_ZYu95PjIuXM-GIrSevE73fXxuxbqIDEhBnSreB2dZJ4tiJwQgdHC48GhRT4NnDRRrpEpYtl1hPHyxARO-k5w",
      scope: "GOOGLE",
      types: [
        "cafe",
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      vicinity: "Carrer de Casanova, 158, Barcelona"
    }
  ],
  status: "OK"
};

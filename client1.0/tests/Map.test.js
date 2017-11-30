import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Map from '../components/MapComponent'

const map = renderer.create(<Map />)
const mapInstance = map.root;
const rendered = map.toJSON();
const mapShallow = shallow(
    <Map />
  );
const mapRender = mapShallow.dive();

it('MapComponent renders without crashing', () => {
  expect(rendered).toBeTruthy();
});

it('MapComponent renders correctly', () => {
  expect(rendered).toMatchSnapshot();
});

it('MapComponent should not be affected by props', () => {
  const mapShallow = shallow(
    <Map foo='bar'/>
  );
  expect(mapShallow).toMatchSnapshot();
  mapShallow.setProps({random:'prop'});
  expect(mapShallow).toMatchSnapshot();
});

describe('Testing render of MapView', () => {
  it('should not render a MapView if no initial location', () => {
    expect(mapRender.find('MapView').length).toBe(0)
  })
  it('should render a MapView if there is a location', () => {
    mapShallow.setState({location: {coords: {longitude: 1, latitude: 1}}})
    expect(mapShallow.dive().find('MapView').length).toBe(1);
  })
});

it('MapComponent should always have a RestaurantModal', () => {
  expect(mapRender.find('RestaurantModal').length).toBe(1);
  mapShallow.setState({location: {coords: {longitude: 1, latitude: 1}}})
  expect(mapShallow.dive().find('RestaurantModal').length).toBe(1);
});


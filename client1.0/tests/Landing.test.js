import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Landing from '../components/LandingComponent'

const landing = renderer.create(<Landing />)
const landingInstance = landing.root;
const rendered = landing.toJSON();
const landShallow = shallow(
  <Landing />
);
const landRender = landShallow.dive();


it('LandingComponent renders without crashing', () => {
  expect(rendered).toBeTruthy();
});

it('LandingComponent renders correctly', () => {
  expect(rendered).toMatchSnapshot();
});

it('LandingComponent should not be affected by props', () => {
  const landShallow = shallow(
    <Landing foo='bar'/>
  );
  expect(landShallow).toMatchSnapshot();
  landShallow.setProps({random:'prop'});
  expect(landShallow).toMatchSnapshot();
});

it('has a Map subcomponent', () => {
  expect(landRender.find('Map').length).toBe(1);
});

it('has a TouchableHighlight subcomponent', () => {
  expect(landRender.find('TouchableHighlight').length).toBe(1);
})

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Landing from '../components/LandingComponent';

const landing = renderer.create(<Landing />)
const landingInstance = landing.root;
const rendered = landing.toJSON();
const landingShallow = shallow(
  <Landing />
);
const landRender = landingShallow.dive();

it('LandingComponent renders without crashing', () => {
  expect(rendered).toBeTruthy();
});

it('LandingComponent renders correctly', () => {
  expect(rendered).toMatchSnapshot();
});

it('has a Map subcomponent', () => {
  expect(landRender.find('Map').length).toBe(1);
});

it('has a TouchableHighlight subcomponent', () => {
  expect(landRender.find('TouchableHighlight').length).toBe(1);
});

it('LandingComponent should not be affected by props', () => {
  const landingShallow = shallow(
    <Landing foo='bar'/>
  );
  expect(landingShallow).toMatchSnapshot();
  landingShallow.setProps({random:'prop'});
  expect(landingShallow).toMatchSnapshot();
});

describe('Testing functions', () => {
  const instance = landing.getInstance();
  it('triggerLogoChange changes the logo, when the function is called', () => {
    expect(instance.triggerLogoChange(false, false)).toMatchSnapshot();
    expect(instance.triggerLogoChange(true, true)).toMatchSnapshot();
    expect(instance.triggerLogoChange(true, false)).toMatchSnapshot();
    expect(instance.triggerLogoChange(false, true)).toMatchSnapshot();
  });
  it('triggers the modal when caled', () => {
    expect(instance.triggerModal()).toMatchSnapshot();
  });
  it('triggers a rerender', () => {
    expect(instance.triggerRerender()).toMatchSnapshot();
  })
});
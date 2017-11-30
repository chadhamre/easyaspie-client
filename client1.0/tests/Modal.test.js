import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Modal from '../components/modal'

const modal = renderer.create(<Modal />)
const ModalInstance = modal.root;
const rendered = modal.toJSON();
const modalShallow = shallow(
  <Modal />
);
const modalRender = modalShallow.dive();

it('ModalComponent renders without crashing', () => {
  expect(rendered).toBeTruthy();
});

it('ModalComponent renders correctly', () => {
  expect(rendered).toMatchSnapshot();
});

it('ModalComponent should not be affected by props', () => {
  const modalShallow = shallow(
    <Modal foo='bar'/>
  );
  expect(modalShallow).toMatchSnapshot();
  modalShallow.setProps({random:'prop'});
  expect(modalShallow).toMatchSnapshot();
});

describe('Test the different render depending on the state', () => {
  it('Should not render if no state', () => {
    expect(modalRender.find('ScrollView').length).toBe(0);
  })
})
import React from 'react';
import Header from './Header';
import DropDown from '../DropDown/DropDown';
import { shallow } from 'enzyme';

const props = {
  currentUser: {
    profileName: 'samer',
    _id: '123',
  },
};

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Header {...props} />);
});

it('renders Dropdown with correct properties', () => {
  expect(wrapper.contains(<DropDown profileName="samer" userId="123" />)).toBe(
    true
  );
});

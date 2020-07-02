import React from 'react';
import LoadingPage from './LoadingPage';
import { shallow } from 'enzyme';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<LoadingPage />);
});
it('renders without error', () => {
  expect(wrapper.length).toBe(1);
});

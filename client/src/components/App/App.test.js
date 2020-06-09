import { shallow, mount } from 'enzyme';
import React from 'react';

import App from './App';
import { storeFactory } from '../../../tests/testUtils';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return shallow(<App store={store} />);
};

describe('rendering', () => {
  it('Renders App', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });
});

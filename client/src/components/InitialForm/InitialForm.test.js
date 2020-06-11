import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';

import InitialForm from './InitialForm';
import { storeFactory } from '../../../tests/testUtils';
import { findByTestAttr } from '../../../tests/testUtils';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const onSubmit = (fn) => fn;
  return mount(
    <Provider store={store}>
      <InitialForm onSubmit={onSubmit} />
    </Provider>
  );
};

it.skip('component initialForm submits', () => {
  const store = storeFactory({});
  const onSubmit = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <InitialForm onSubmit={onSubmit} />
    </Provider>
  );

  expect(wrapper.length).toBe(1);

  const form = findByTestAttr(wrapper, 'initial-form');

  form.simulate('submit', onSubmit());

  expect(onSubmit).toHaveBeenCalledTimes(1);
});

//need to go back to this test

import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';

import InitialForm from './InitialForm';
import { storeFactory } from '../../../tests/testUtils';
import { findByTestAttr } from '../../../tests/testUtils';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const onSubmit = jest.fn();
  return mount(
    <Provider store={store}>
      <InitialForm onSubmit={onSubmit} initialValues={{ oi: 'oi' }} />
    </Provider>
  );
};

it('component initialForm renders', () => {
  const store = storeFactory({});
  const onSubmit = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <InitialForm onSubmit={onSubmit} />
    </Provider>
  );
  expect(wrapper.length).toBe(1);
  const form = findByTestAttr(wrapper, 'initial-form');
  form.simulate('submit');
  expect(handleSubmit).toHaveBeenCalled();
});

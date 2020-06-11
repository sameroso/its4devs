import { mount } from 'enzyme';
import React from 'react';

import { storeFactory } from '../../../tests/testUtils';
import { findByTestAttr } from '../../../tests/testUtils';
import InitialForm from '../InitialForm/InitialForm';
import InitialFormField from './InitialFormField';
import { Provider } from 'react-redux';

const initialValues = {
  userName: 'oi',
  facebookLink: 'face',
  whatsApp: 'whats',
  gitHub: 'github',
  description: 'Hello',
};

describe('render initial Values', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={storeFactory({})}>
        <InitialForm initialValues={initialValues} />
      </Provider>
    );
  });
  it('render inputs with initial values', () => {
    const form = findByTestAttr(wrapper, 'initial-form');
    const inputs = wrapper.find('input');
    const textareas = wrapper.find('textarea');

    expect(textareas.at(0).prop('value')).toBe('Hello');
    expect(inputs.at(0).prop('value')).toBe('oi');
    expect(inputs.at(1).prop('value')).toBe('face');
    expect(inputs.at(2).prop('value')).toBe('whats');
    expect(inputs.at(3).prop('value')).toBe('github');
  });
});

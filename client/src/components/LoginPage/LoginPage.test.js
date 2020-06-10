import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../../tests/testUtils';
import LoginPage from './LoginPage';

const setup = () => {
  return shallow(<LoginPage />);
};

describe('render 3 login buttons', () => {
  it('render facebook button', () => {
    const wrapper = setup();
    const fbBtn = findByTestAttr(wrapper, 'facebook-btn');
    expect(fbBtn.length).toBe(1);
  });
  it('render google button', () => {
    const wrapper = setup();
    const googleBtn = findByTestAttr(wrapper, 'google-btn');
    expect(googleBtn.length).toBe(1);
  });
  it('render github button', () => {
    const wrapper = setup();
    const githubBtn = findByTestAttr(wrapper, 'github-btn');
    expect(githubBtn.length).toBe(1);
  });
});

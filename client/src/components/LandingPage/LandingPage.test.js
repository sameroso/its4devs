import React from 'react';
import { shallow } from 'enzyme';

import LandingPage from './LandingPage';
import { storeFactory } from '../../../tests/testUtils';
import { findByTestAttr } from '../../../tests/testUtils';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return shallow(<LandingPage store={store} />);
};

describe('renders without error', () => {
  it('render Landing Page component withou error', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });
  it('render Login Page component without error', () => {
    const wrapper = setup({ user: false });
    const component = wrapper.dive().dive();
    const loginPage = findByTestAttr(component, 'login-page');
    expect(loginPage.length).toBe(1);
  });
  it('renders main page component without error', () => {
    const wrapper = setup({ user: true });
    const component = wrapper.dive().dive();
    const mainPage = findByTestAttr(component, 'main-page');
    expect(mainPage.length).toBe(1);
  });
  it('renders loading component without error', () => {
    const wrapper = setup({ user: null });
    const component = wrapper.dive().dive();
    const mainPage = findByTestAttr(component, 'loading-page');
    expect(mainPage.length).toBe(1);
  });
});

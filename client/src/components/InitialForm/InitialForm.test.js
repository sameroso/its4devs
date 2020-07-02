import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import moxios from 'moxios';

import InitialForm from './InitialForm';
import { storeFactory } from '../../../tests/testUtils';

let wrapper;

const responseUpdated = {
  _id: 'updatedId',
  facebookId: 'updatedfbId',
  profilePic: 'updatedProfilePic',
  profileName: 'updatedProfileName',
  whatsApp: 'samer',
  facebookLink: 'fbaaaaa',
  gitHub: 'updatedGithub',
  description: 'updatedDescription',
  dateCreated: '2020-06-23T11:14:11.000Z',
  __v: 0,
  initialFormFilled: true,
};

const props = {
  profilePic: 'profilePicsrc',
  initialValues: {
    profileName: 'initialFormProfileName',
    description: 'initialFormDescription',
    facebookLink: 'initialFormFbLink',
    whatsApp: 'initialFormWpp',
    gitHub: 'initialFormGithub',
  },
};

const store = storeFactory();
beforeEach(() => {
  wrapper = mount(
    <Provider store={store}>
      <InitialForm {...props} />
    </Provider>
  );
});

it('profilepic gets rendered from props', () => {
  expect(wrapper.find('._PofilePIcInitialFormField').prop('src')).toBe(
    'profilePicsrc'
  );
});

it('render initial values from props', () => {
  const inputs = wrapper.find('input');

  expect(inputs.at(0).prop('value')).toBe(props.initialValues.profileName);
  expect(inputs.at(1).prop('value')).toBe(props.initialValues.facebookLink);
  expect(inputs.at(2).prop('value')).toBe(props.initialValues.whatsApp);
  expect(inputs.at(3).prop('value')).toBe(props.initialValues.gitHub);
  expect(wrapper.find('textarea').prop('value')).toBe(
    props.initialValues.description
  );
});

describe('form gets submitted', () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('/api/updateuser', {
      status: 200,
      response: responseUpdated,
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('saving form updates store', (done) => {
    wrapper.find('form').simulate('submit');
    moxios.wait(() => {
      expect(store.getState().user).toBe(responseUpdated);
      done();
      wrapper.unmount();
    });
  });
});

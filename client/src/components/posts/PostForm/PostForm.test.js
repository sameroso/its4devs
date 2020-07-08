import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import PostForm from './PostForm';
import moxios from 'moxios';

import { storeFactory } from '../../../../tests/testUtils';
import { act } from '@testing-library/react';

let wrapper;
const store = storeFactory();
const props = {
  userInfoForPost: { profileName: 'profileName', profilePic: 'profilepic' },
};
beforeEach(() => {
  moxios.install();
  moxios.stubRequest('/api/sendpost', {
    status: 200,
    response: [{ response: 'response' }, { response: 'post 2' }],
  });
  wrapper = mount(
    <Provider store={store}>
      <PostForm {...props} />
    </Provider>
  );
});
afterEach(() => {
  moxios.uninstall();
  wrapper.unmount();
});

it('shows error message after submit blank', () => {
  expect(wrapper.find('._Initial_Form_Field_Render_Error').length).toBe(0);

  wrapper.find('form').simulate('submit');

  expect(wrapper.find('._Initial_Form_Field_Render_Error').length).toBe(1);
});

it('shows error message after submit blank', async (done) => {
  expect(wrapper.find('._Initial_Form_Field_Render_Error').length).toBe(0);

  wrapper
    .find('._InitialFormFiel_textarea')
    .at(1)
    .simulate('change', { target: { value: 'new text' } });

  await act(async () => {
    wrapper.find('form').simulate('submit');
  });

  expect(wrapper.find('._Initial_Form_Field_Render_Error').length).toBe(0);

  moxios.wait(() => {
    expect(store.getState().postsData).toEqual([
      { response: 'response' },
      { response: 'post 2' },
    ]);

    done();
  });
});

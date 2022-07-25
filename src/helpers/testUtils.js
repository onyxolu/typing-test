import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import reducer from 'store/reducer'
import { createStore } from 'redux'


const TestProvider = ({
  store,
  children
}) => <Provider store={store}>{children}</Provider>

export function testRender(ui, { store, ...otherOpts }) {
  return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts)
}

export function makeTestStore() {
    const Store = createStore(
        reducer,
        (window).__REDUX_DEVTOOLS_EXTENSION__ &&
            (window).__REDUX_DEVTOOLS_EXTENSION__()
    );
  const origDispatch = Store.dispatch
  Store.dispatch = jest.fn(origDispatch)
  return Store
}

export const fixtureSet = {
  name: 'Bogus lego set',
  num_parts: 666,
  last_modified_dt: 'long ago',
  set_img_url: 'http://arent.i.pretty',
  set_num: '666_2',
  set_url: 'http://somewhere',
  theme_id: 666,
  year: 666
}
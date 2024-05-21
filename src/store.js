import { createStore } from 'redux';

const initialState = {
  // votre état initial
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // vos cas de réduction
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;


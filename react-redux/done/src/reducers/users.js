import {USERS_SET} from '../types';

const initialState = {
  listOfUsers: [],
};

export function users(state = initialState, action) {
  switch (action.type) {
  case USERS_SET:
    return {...state, listOfUsers: action.payload};
  default:
    return state;
  }
}

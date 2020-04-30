import {combineReducers} from 'redux';
import {users} from './reducers/users';

const rootReducer = combineReducers({
  users,
});

export default rootReducer;

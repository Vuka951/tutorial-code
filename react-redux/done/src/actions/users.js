import {USERS_SET} from '../types';
import axios from 'axios';

const usersSet = (users) => ({
  type: USERS_SET,
  payload: users,
});

export const fetchUsers = () => async (dispatch) => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  const users = res.data;
  dispatch(usersSet(users));
};

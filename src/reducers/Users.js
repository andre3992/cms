/**
 * @author Victor Andrade <victor.andrade@caixamagica.pt>,
 *
 * @description redux Reducers - Utils
 *
 * @version 20200116
 * @since 20200116 Initial release
 *
 */

import {
  INITIAL_USERS,
  REQUEST_GET_USERS,
  REQUEST_GET_USERS_SUCCESS,
  REQUEST_GET_USERS_FAIL,
  DELETE_USER,
} from "../constants/Users";

const Users = (state = INITIAL_USERS, action) => {
  switch (action.type) {
    case REQUEST_GET_USERS:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.data.items,
        loading: false,
      };
    case REQUEST_GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
      };

    case DELETE_USER:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default Users;

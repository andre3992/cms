/**
 * @author Victor Andrade <victor.andrade@caixamagica.pt>,
 *
 * @description Saga-redux Examples
 * @inheritDoc o nome das funcoes e const no saga tem de começar com o '_" por exemplo
 * 		const _handlerName /.. || function* _callABC() /..
 *
 * @version 20200116
 * @since 20200116 Initial release
 *
 */

import { all, call, put, takeLatest } from "redux-saga/effects";
//actions
import { requestGetUsersFail, requestGetUsersSuccess } from "../actions/Users";

//constants
import { REQUEST_GET_USERS } from "../constants/Users";
//api
import { getUsers } from "../api/github";

/**
 * _callGetExamples  request an API
 *
 * @param payload
 * @returns {Promise<postcss.Result|any|void>}
 * @private
 */
const _callGetUsers = async (payload) => {
  return await getUsers(payload)
    .then((response) => response)
    .catch((error) => {
      console.log("[SAGA] catch error _callGetExamples ", error);
      return error;
    });
};

/**
 *
 * @param payload
 * @returns {IterableIterator<<"PUT", PutEffectDescriptor<{payload: *, type: *}>>|<"CALL", CallEffectDescriptor>>}
 * @private
 */
function* _handlerGetUsers({ payload }) {
  try {
    const fetchResult = yield call(_callGetUsers, payload);
    if (fetchResult.status === 200)
      yield put(requestGetUsersSuccess({ data: fetchResult.data }));
    else yield put(requestGetUsersFail({ error: fetchResult }));
  } catch (error) {
    console.log("[SAGA] catch error _handlerGetExamples ", error);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(REQUEST_GET_USERS, _handlerGetUsers)]);
}

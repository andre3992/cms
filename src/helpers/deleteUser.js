export function newState(login, state) {
  return state.filter((x) => x.login !== login);
}

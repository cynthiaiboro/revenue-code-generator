export const SHOW_TOAST = (state, payload) => {
  state.toast = payload;
};
export const SHOW_ALERT = (state, payload) => {
  state.modal = payload;
};
export const ERROR_ON_ORDER = (state, payload) => {
  state.errorOnOrder = payload;
};

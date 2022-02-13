export const showToast = ({ commit }, payload) => {
  commit("SHOW_TOAST", payload);
};
export const showAlert = ({ commit }, payload) => {
  commit("SHOW_ALERT", payload);
};

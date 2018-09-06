import axios from 'axios';

// получить полный источник данных
export const getCustomers = async ({ commit, getters }) => {
  const response = await axios.get(getters.customersUrl);
  commit('setDsCustomers', response.data);
  commit('setLoading', false);
  return response;
};

// удалить заказчика
export const deleteCustomer = async ({ commit, getters, dispatch }, id) => {
  const custUrl = getters.customersUrl;
  const url = `${custUrl}/${id}`;

  const response = await axios.delete(url);
  await dispatch('getCustomers');
  commit('setLoading', false);
  return response;
};

// добавить заказчика
export const addCustomer = async ({ commit, getters, dispatch }, customerObj) => {
  const url = getters.customersUrl;

  const response = await axios.post(url, customerObj);
  await dispatch('getCustomers');
  commit('setLoading', false);
  return response;
};

export { getCustomers as default };

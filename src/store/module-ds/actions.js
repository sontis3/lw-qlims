import axios from 'axios';

// получить полный источник данных
export const getCustomers = async ({ commit, getters }) => {
  const response = await axios.get(getters.customersUrl);
  commit('setDsCustomers', response.data);
  return response;
};

// удалить заказчика
export const deleteCustomer = async ({ getters, dispatch }, id) => {
  const custUrl = getters.customersUrl;
  const url = `${custUrl}/${id}`;

  const response = await axios.delete(url);
  dispatch('getCustomers');
  return response;
};

// добавить заказчика
export const addCustomer = async ({ getters, dispatch }, customerObj) => {
  const url = getters.customersUrl;

  const response = await axios.post(url, customerObj);
  dispatch('getCustomers');
  return response;
};

export { getCustomers as default };

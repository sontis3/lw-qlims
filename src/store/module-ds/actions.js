import axios from 'axios';

// получить полный источник данных
export const getCustomers = async ({ commit, getters }) => {
  const result = await axios.get(getters.customersUrl)
    .then((response) => { commit('setDsCustomers', response.data); });
  return result;
};

// удалить заказчика
export const deleteCustomer = async ({ getters, dispatch }, id) => {
  const custUrl = getters.customersUrl;
  const url = `${custUrl}/${id}`;
  const result = await axios.delete(url)
    .then((response) => {
      dispatch('getCustomers');
      return response;
    });
  return result;
};

// добавить заказчика
export const addCustomer = async ({ getters, dispatch }, customerObj) => {
  const url = getters.customersUrl;
  const result = await axios.post(url, customerObj)
    .then((response) => {
      dispatch('getCustomers');
      return response;
    });
  return result;
};

export { getCustomers as default };

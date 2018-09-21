import axios from 'axios';

// получить полный источник данных
export const getCustomers = async ({ commit, getters }) => {
  const response = await axios.get(getters.customersUrl);
  commit('setDsCustomers', response.data);
  // commit('setLoading', false);
  return response;
};

// добавить документ
export const addCustomer = async ({ getters, dispatch }, obj) => {
  const url = getters.customersUrl;

  const response = await axios.post(url, obj);
  await dispatch('getCustomers');
  // commit('setLoading', false);
  return response;
};

// удалить документ
export const deleteCustomer = async ({ getters, dispatch }, id) => {
  const url = `${getters.customersUrl}/${id}`;

  const response = await axios.delete(url);
  await dispatch('getCustomers');
  // commit('setLoading', false);
  return response;
};

// изменить документ
export const updateCustomer = async ({ getters, dispatch }, obj) => {
  const url = `${getters.customersUrl}/${obj.id}`;

  const putData = {
    name: obj.name,
    enabled: obj.enabled
  };

  const header = { 'Content-type': 'application/json' };
  const response = await axios.put(url, putData, { headers: header });
  await dispatch('getCustomers');
  // commit('setLoading', false);
  return response;
};

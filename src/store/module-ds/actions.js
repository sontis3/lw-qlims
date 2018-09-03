import axios from 'axios';

// получить полный источник данных
export const getDs = async ({ commit, getters }) => {
  const result = await axios.get(getters.customersUrl)
    .then((response) => { commit('setDsCustomers', response.data); });
  return result;
};

// получить полный источник данных
export const deleteCustomer = async ({ getters, dispatch }, id) => {
  const custUrl = getters.customersUrl;
  const url = `${custUrl}/${id}`;
  const result = await axios.delete(url)
    .then((response) => {
      dispatch('getDs');
      return response;
    });
  return result;
};

export { getDs as default };

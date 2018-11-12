import axios from 'axios';

// получить полный источник данных
export const getDeliveryMethods = async ({ commit, getters }) => {
  const response = await axios.get(getters.deliveryMethodsUrl).then((resp) => { commit('setDsDeliveryMethods', resp.data); return resp; });
  return response;
};

// добавить документ
export const addDeliveryMethod = async ({ getters, dispatch }, obj) => {
  const url = getters.deliveryMethodsUrl;

  const response = await axios.post(url, obj);
  await dispatch('getDeliveryMethods');
  return response;
};

// удалить документ
export const deleteDeliveryMethod = async ({ getters, dispatch }, id) => {
  const url = `${getters.deliveryMethodsUrl}/${id}`;

  const response = await axios.delete(url);
  await dispatch('getDeliveryMethods');
  return response;
};

// изменить документ
export const updateDeliveryMethod = async ({ getters }, obj) => {
  const url = `${getters.deliveryMethodsUrl}/${obj.id}`;

  const putData = {
    name: obj.name,
    enabled: obj.enabled
  };

  const header = { 'Content-type': 'application/json' };
  const response = await axios.put(url, putData, { headers: header });
  return response;
};

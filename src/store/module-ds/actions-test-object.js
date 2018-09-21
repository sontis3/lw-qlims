import axios from 'axios';

// получить полный источник данных
export const getTestObjects = async ({ commit, getters }) => {
  const response = await axios.get(getters.testObjectsUrl);
  commit('setDsTestObjects', response.data);
  // commit('setLoading', false);
  return response;
};

// добавить документ
export const addTestObject = async ({ getters, dispatch }, obj) => {
  const url = getters.testObjectsUrl;

  const response = await axios.post(url, obj);
  await dispatch('getTestObjects');
  // commit('setLoading', false);
  return response;
};

// удалить документ
export const deleteTestObject = async ({ getters, dispatch }, id) => {
  const url = `${getters.testObjectsUrl}/${id}`;

  const response = await axios.delete(url);
  await dispatch('getTestObjects');
  // commit('setLoading', false);
  return response;
};

// изменить документ
export const updateTestObject = async ({ getters, dispatch }, obj) => {
  const url = `${getters.testObjectsUrl}/${obj.id}`;

  const putData = {
    name: obj.name,
    enabled: obj.enabled
  };

  const header = { 'Content-type': 'application/json' };
  const response = await axios.put(url, putData, { headers: header });
  await dispatch('getTestObjects');
  // commit('setLoading', false);
  return response;
};

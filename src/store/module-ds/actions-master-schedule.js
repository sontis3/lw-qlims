import axios from 'axios';

// получить полный источник данных
export const getStudies = async ({ commit, getters }, yearFilter) => {
  const response = await axios.get(getters.studiesUrl, { params: { year: yearFilter } }).then((resp) => { commit('setDsMasterSchedules', { data: resp.data, year: yearFilter }); return resp; });
  return response;
};

// добавить документ
export const addStudy = async ({ getters, dispatch }, obj) => {
  const url = getters.studiesUrl;

  const response = await axios.post(url, obj);
  await dispatch('getStudies', obj.planYear);
  return response;
};

// пока не реализовано 14.12.18 OOA
// // удалить документ
// export const deleteStudy = async ({ getters, dispatch }, id) => {
//   const url = `${getters.customersUrl}/${id}`;

//   const response = await axios.delete(url);
//   await dispatch('getCustomers');
//   return response;
// };

// изменить документ
export const updateStudy = async ({ getters }, obj) => {
  const url = `${getters.customersUrl}/${obj.id}`;

  const putData = {
    name: obj.name,
    enabled: obj.enabled
  };

  const header = { 'Content-type': 'application/json' };
  const response = await axios.put(url, putData, { headers: header });
  return response;
};

// добавить файл
export const uploadStudyFile = async ({ getters }, obj) => {
  const url = getters.studiesUploadUrl;

  const response = await axios.post(url, obj, { headers: { 'Content-Type': 'multipart/form-data' } });
  // await dispatch('getStudies', obj.planYear);
  return response;
};

// получить адреса сервисов web API
export const customersUrl = state => `${state.apiUrl}/${state.dirPartUrl}/${state.customersPartUrl}`;
export const testObjectsUrl = state => `${state.apiUrl}/${state.dirPartUrl}/${state.testObjectsPartUrl}`;
export const deliveryMethodsUrl = state => `${state.apiUrl}/${state.dirPartUrl}/${state.deliveryMethodsPartUrl}`;

export const studiesUrl = state => `${state.apiUrl}/${state.catalogsPartUrl}/${state.studiesPartUrl}`;
export const studiesUploadUrl = state => `${state.apiUrl}/${state.catalogsPartUrl}/${state.studiesPartUrl}/${state.uploadPartUrl}`;

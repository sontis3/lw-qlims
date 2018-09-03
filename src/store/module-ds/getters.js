// получить адреса сервисов web API
export const customersUrl = state => `${state.apiUrl}/${state.dirPartUrl}/${state.customersPartUrl}`;

export { customersUrl as default };

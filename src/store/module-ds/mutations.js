// установить новый источник данных Заказчики
export const setDsCustomers = (state, newDs) => {
  state.dsCustomers = newDs;
};

// установить значение индикатора загрузки
export const setLoading = (state, newValue) => {
  state.isLoading = newValue;
};

export { setDsCustomers as default };

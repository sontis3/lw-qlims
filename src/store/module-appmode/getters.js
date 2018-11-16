import { filter } from 'quasar';

// получить список акций для текущего режима
export const currentActionsList = state => filter(state.currentMode.id, { field: 'modeId', list: state.allActions })[0].actions;

// получить текущую акцию в текущем режиме
export const currentAction = state => filter(state.currentMode.id, { field: 'modeId', list: state.allActions })[0].currentAction;

// сформировать сообщение об ошибке от сервера
/* eslint no-unused-vars: ["error", { "args": "none" }] */
export const getErrorMessage = state => (httpMethod, err) => {
  // запись уведомления об ошибке
  const errNotification = {
    dateTime: new Date(),
    message: err.message
  };
  state.errorNotifications.push(errNotification);

  /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
  const responseURL = err.request.responseURL ? err.request.responseURL : err.config.url; // err.config;
  const { method } = err.config;

  if (err.response) {
    return `Status: ${err.response.status}.  ${err.response.data.message} = ${method} ${responseURL}`;
  }
  return `${err.message} = ${httpMethod} ${responseURL}`;
};

export { currentActionsList as default };

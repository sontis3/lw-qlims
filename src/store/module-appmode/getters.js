import { filter } from 'quasar';

// получить список акций для текущего режима
export const currentActionsList = state => filter(state.currentMode.id, { field: 'modeId', list: state.allActions })[0].actions;

// получить текущую акцию в текущем режиме
export const currentAction = state => filter(state.currentMode.id, { field: 'modeId', list: state.allActions })[0].currentAction;

// сформировать сообщение об ошибке от сервера
/* eslint no-unused-vars: ["error", { "args": "none" }] */
export const getErrorMessage = state => (httpMethod, err) => {
  /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
  const responseURL = err.request.responseURL ? err.request.responseURL : err.config.url; // err.config;
  const { method } = err.config;

  let errStatus;
  if (err.response) {
    errStatus = `Status: ${err.response.status}.  ${err.response.data.message} = ${method} ${responseURL}`;
  } else {
    errStatus = `${err.message} = ${httpMethod} ${responseURL}`;
  }

  // запись уведомления об ошибке
  const errNotification = {
    dateTime: new Date(),
    message: err.message,
    status: errStatus
  };
  state.errorNotifications.push(errNotification);

  return errStatus;
};

export { currentActionsList as default };

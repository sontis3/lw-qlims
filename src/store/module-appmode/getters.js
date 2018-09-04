import { filter } from 'quasar';

// получить список акций для текущего режима
export const currentActionsList = state => filter(state.currentMode.id, { field: 'modeId', list: state.allActions })[0].actions;

// получить текущую акцию в текущем режиме
export const currentAction = state => filter(state.currentMode.id, { field: 'modeId', list: state.allActions })[0].currentAction;

// сформировать сообщение об ошибке от сервера
/* eslint no-unused-vars: ["error", { "args": "none" }] */
export const getErrorMessage = state => (httpMethod, url, err) => {
  if (err.response) {
    return `Status: ${err.response.status}.  ${err.response.data.message} = ${httpMethod} ${url}`;
  }
  return `${err.message} = ${httpMethod} ${url}`;
};

export { currentActionsList as default };

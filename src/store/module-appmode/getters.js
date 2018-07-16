import { filter } from 'quasar';

// получить список акций для текущего режима
export const currentActionsList = state => filter(state.currentMode.id, { field: 'modeId', list: state.allActions })[0].actions;

// получить текущую акцию в текущем режиме
export const currentAction = state => filter(state.currentMode.id, { field: 'modeId', list: state.allActions })[0].currentAction;

export { currentActionsList as default };

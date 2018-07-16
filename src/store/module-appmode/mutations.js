import { filter } from 'quasar';

// мутация смены текущего режима
export const changeMode = (state, newMode) => {
  state.currentMode = newMode;
};

// мутация смены текущей акции
export const changeAction = (state, newAction) => {
  // т.к. getter currentAction не доступен здесь, то скопирован его код
  filter(state.currentMode.id, { field: 'modeId', list: state.allActions })[0].currentAction = newAction;
};

export { changeMode as default };

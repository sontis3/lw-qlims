import Vue from 'vue';
import Vuex from 'vuex';

import appMode from './module-appmode';
import ds from './module-ds';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    appMode,
    ds
  }
});

export default store;

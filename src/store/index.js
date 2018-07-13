import Vue from 'vue';
import Vuex from 'vuex';

import appMode from './module-appmode';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    appMode
  }
});

export default store;

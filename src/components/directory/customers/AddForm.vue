<template>
  <q-dialog
    v-model="showDialog"
  >
    <span slot="title">Favorite Sup</span>

  </q-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({
      showAddDialog: state => state.appMode.showAddDialog
    }),

    showDialog: {
      get() { return this.showAddDialog; },
      set(newValue) { this.changeShowAddDialog(newValue); }
    }
  },

  methods: {
    ...mapMutations({
      changeShowAddDialog: 'appMode/changeShowAddDialog'
    })
  }
};
</script>

<style>

</style>

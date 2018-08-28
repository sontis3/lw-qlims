<template>
  <q-dialog
    v-model="showDialog"
    prevent-close
    ok="OK"
    cancel="Cancel"
    @ok="onOk"
  >
    <span slot="title">Добавление нового заказчика</span>
    <div slot="body">
       <div class="row q-mb-md">
        <q-input v-model="form.name" type="text" float-label="Наименование заказчика" />
      </div>
       <div class="row q-mb-md">
        <q-checkbox v-model="form.active" label="Активен" />
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({
      showAddDialog: state => state.appMode.showAddDialog
    }),

    // флаг показа диалога
    showDialog: {
      get() { return this.showAddDialog; },
      set(newValue) { this.changeShowAddDialog(newValue); }
    }
  },

  methods: {
    ...mapMutations({
      changeShowAddDialog: 'appMode/changeShowAddDialog'
    }),
    onOk() {
      this.$q.notify({
        color: 'positive',
        position: 'top',
        message: 'OK.',
        icon: 'save'
      });
    },

    onCancel() {
      this.$q.notify({
        color: 'positive',
        position: 'top',
        message: 'Cancel.',
        icon: 'delete'
      });
    }
  },

  data: () => ({
    form: {
      name: null,
      active: true
    }
  })
};
</script>

<style>

</style>

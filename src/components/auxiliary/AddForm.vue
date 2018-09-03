<template>
  <q-dialog
    v-model="showDialog"
    prevent-close
    ok="OK"
    cancel="Cancel"
    @ok="onOk"
  >
    <span slot="title">{{title}}</span>

    <div slot="body">
      <slot name="bodyForm"></slot>
    </div>
  </q-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    baseUrl: String,
    title: String,
    formFields: Object
  },

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

    getErrorMessage(httpMethod, url, err) {
      if (err.response) {
        return `Status: ${err.response.status}.  ${err.response.data.message} = ${httpMethod} ${url}`;
      }
      return `${err.message} = ${httpMethod} ${url}`;
    },

    async onOk() {
      const url = this.baseUrl;
      await this.$axios.post(url, this.formFields)
        .then((response) => {
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: `Документ '${response.data.name}' успешно создан.`,
            icon: 'save'
          });
          this.$root.$emit('changeDs');
        })
        .catch((err) => {
          const errMessage = this.getErrorMessage('post', url, err);
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: errMessage,
            icon: 'report_problem'
          });
        });
    }
  }
};
</script>

<style>

</style>

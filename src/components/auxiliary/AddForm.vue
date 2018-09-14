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
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex';

export default {
  props: {
    title: String,
    formFields: Object
  },

  computed: {
    ...mapState({
      showAddDialog: state => state.appMode.showAddDialog
    }),
    ...mapGetters({
      getErrorMessage: 'appMode/getErrorMessage'
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
    ...mapActions({
      addCustomer: 'ds/addCustomer'
    }),

    async onOk() {
      const res = this.addCustomer(this.formFields);
      res.then((response) => {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: `Документ '${response.data.name}' успешно создан.`,
          icon: 'save'
        });
      })
        .catch((err) => {
          /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
          const url = err.config.url;
          const errMessage = this.getErrorMessage('post', url, err);
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: errMessage,
            icon: 'report_problem'
          });
        });
      // const url = this.baseUrl;
      // await this.$axios.post(url, this.formFields)
      //   .then((response) => {
      //     this.$q.notify({
      //       color: 'positive',
      //       position: 'top',
      //       message: `Документ '${response.data.name}' успешно создан.`,
      //       icon: 'save'
      //     });
      //     this.$root.$emit('changeDs');
      //   })
      //   .catch((err) => {
      //     const errMessage = this.getErrorMessage('post', url, err);
      //     this.$q.notify({
      //       color: 'negative',
      //       position: 'top',
      //       message: errMessage,
      //       icon: 'report_problem'
      //     });
      //   });
    }
  }
};
</script>

<style>

</style>

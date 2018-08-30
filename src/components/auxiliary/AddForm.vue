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
          if (err.response) {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: `Status: ${err.response.status}.  ${err.response.data.message} = post ${url}`,
              icon: 'report_problem'
            });
          } else {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: `${err.message} = post ${url}`,
              icon: 'report_problem'
            });
          }
        });
    }
  }
};
</script>

<style>

</style>

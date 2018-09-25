<template>
  <q-page>
    <BaseDirTable
      :title="title"
      :columns="columns"
      :visibleColumns="visibleColumns"
      :ds="ds"
    >
    </BaseDirTable>
    <q-dialog
      v-model="showDialog"
      prevent-close
      ok="OK"
      cancel="Cancel"
      @ok="onOk"
      @show="onShow"
    >
      <span slot="title">Добавление нового заказчика</span>
      <div slot="body">
        <div class="row q-mb-md">
          <q-input v-model="addFormFields.name" type="text" float-label="Наименование заказчика" ref="ff" />
        </div>
        <div class="row q-mb-md">
          <q-checkbox v-model="addFormFields.enabled" label="Активен" />
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex';

import BaseDirTable from '../auxiliary/BaseTable.vue';
// import AddForm from '../auxiliary/AddForm.vue';

export default {
  components: {
    BaseDirTable
    // AddForm
  },
  data: () => ({
    title: 'Список заказчиков',
    columns: [
      {
        name: 'desc',
        required: true,
        label: 'Наименование',
        align: 'left',
        field: 'name',
        sortable: true,
        classes: 'popup-edit'
      },
      {
        name: 'enabled',
        label: 'Действующий',
        align: 'center',
        field: 'enabled',
        sortable: true,
        sort: (a, b) => a - b,
        classes: 'as-checkbox'
      },
      {
        name: 'dateCreated',
        label: 'Дата создания',
        align: 'center',
        field: 'dateCreated',
        sortable: true
      },
      {
        name: 'dateUpdated',
        label: 'Дата изменения',
        align: 'center',
        field: 'dateUpdated',
        sortable: true
      },
      {
        name: 'rowActions',
        label: 'Действия',
        align: 'right',
        field: 'rowActions',
        required: true
      }
    ],
    visibleColumns: ['desc', 'enabled', 'row-actions'],
    addFormFields: {
      name: null,
      enabled: true
    },
    showDialog: false
  }),

  computed: {
    ...mapState({
      // источник данных
      ds: state => state.ds.dsCustomers
    }),
    ...mapGetters({
      getErrorMessage: 'appMode/getErrorMessage'
    })
  },

  methods: {
    ...mapMutations({
      setLoading: 'ds/setLoading'
    }),
    ...mapActions({
      getDocuments: 'ds/getCustomers',
      addDocument: 'ds/addCustomer',
      deleteDocument: 'ds/deleteCustomer',
      updateDocument: 'ds/updateCustomer'
    }),

    onShow() {
      this.$nextTick(() => this.$refs.ff.select());
    },
    onAddDocument() {
      this.showDialog = true;
    },
    async onOk() {
      const res = this.addDocument(this.addFormFields);
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
    },
    // удалить документ
    onDeleteDocument(id) {
      this.setLoading(true);
      const res = this.deleteDocument(id);
      res.then((response) => {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: `Документ '${response.data.name}' успешно удален.`,
          icon: 'delete'
        });
      })
        .catch((err) => {
          /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
          const url = err.config.url;
          const errMessage = this.getErrorMessage('delete', url, err);
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: errMessage,
            icon: 'report_problem'
          });
        })
        .finally(() => {
          this.setLoading(false);
        });
    },

    // изменить документ
    onUpdateDocument(obj) {
      this.setLoading(true);
      const res = this.updateDocument(obj);
      res.then((response) => {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: `Документ '${response.data.name}' успешно изменен.`,
          icon: 'update'
        });
      })
        .catch((err) => {
          /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
          const url = err.config.url;
          const errMessage = this.getErrorMessage('put', url, err);
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: errMessage,
            icon: 'report_problem'
          });
        })
        .finally(() => {
          // принудительное обновление документов необходимо, т.к. чекбокс при ощибке остается в неправильном состоянии
          this.getDocuments();
          this.setLoading(false);
        });
    }

  },

  // хук когда компонент загружен
  mounted() {
    this.$root.$on('addDocument', this.onAddDocument);
    this.$root.$on('deleteDocument', this.onDeleteDocument);
    this.$root.$on('updateDocument', this.onUpdateDocument);

    this.setLoading(true);
    const res = this.getDocuments();

    res.then(() => {})
      .catch((err) => {
        /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
        const url = err.config.url;
        const errMessage = this.getErrorMessage('get', url, err);
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: errMessage,
          icon: 'report_problem'
        });
      })
      .finally(() => {
        this.setLoading(false);
      });
  },

  beforeDestroy() {
    this.$root.$off('addDocument', this.onAddDocument);
    this.$root.$off('deleteDocument', this.onDeleteDocument);
    this.$root.$off('updateDocument', this.onUpdateDocument);
  }
};
</script>

<style>
</style>

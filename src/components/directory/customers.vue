<template>
  <q-page>
    <BaseDirTable
      :title="title"
      :columns="columns"
      :visibleColumns="visibleColumns"
      :ds="ds"
    >
    <template slot="addForm">
      <AddForm title="Добавление нового заказчика" :formFields="addFormFields">
        <template slot="bodyForm">
          <div class="row q-mb-md">
            <q-input v-model="addFormFields.name" type="text" float-label="Наименование заказчика" />
          </div>
          <div class="row q-mb-md">
            <q-checkbox v-model="addFormFields.enabled" label="Активен" />
          </div>
        </template>
      </AddForm>
    </template>
    </BaseDirTable>
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
import AddForm from '../auxiliary/AddForm.vue';

export default {
  components: {
    BaseDirTable,
    AddForm
  },
  data: () => ({
    title: 'Список заказчиков',
    columns: [
      {
        name: 'desc',
        required: true,
        label: 'Наименование заказчика',
        align: 'left',
        field: 'name',
        sortable: true
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
    visibleColumns: ['desc', 'enabled', 'dateCreated', 'dateUpdated', 'row-actions'],
    addFormFields: {
      name: null,
      enabled: true
    }

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
      getCustomers: 'ds/getCustomers',
      deleteCustomer: 'ds/deleteCustomer',
      updateCustomer: 'ds/updateCustomer'
    }),

    // удалить документ
    DeleteDocument(id) {
      this.setLoading(true);
      const res = this.deleteCustomer(id);
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
        });
      this.setLoading(false);
    },

    // изменить документ
    UpdateDocument(customerObj) {
      this.setLoading(true);
      const res = this.updateCustomer(customerObj);
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
        });
      this.setLoading(false);
    }

  },

  // хук когда компонент загружен
  mounted() {
    this.$root.$on('deleteDocument', this.DeleteDocument);
    this.$root.$on('updateDocument', this.UpdateDocument);

    this.setLoading(true);
    const res = this.getCustomers();
    this.setLoading(false);

    res.catch((err) => {
      /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
      const url = err.config.url;
      const errMessage = this.getErrorMessage('get', url, err);
      this.$q.notify({
        color: 'negative',
        position: 'top',
        message: errMessage,
        icon: 'report_problem'
      });
    });
  }
};
</script>

<style>
</style>

<template>
  <q-page>
    <BaseDirTable
      :title="title"
      :columns="columns"
      :visibleColumns="visibleColumns"
      :ds="ds"
      ref="baseTable"
    >
    <template slot="addForm">
      <AddForm title="Добавление нового заказчика" :formFields="addFormFields">
        <template slot="bodyForm">
          <div class="row q-mb-md">
            <q-input v-model="addFormFields.name" type="text" float-label="Наименование заказчика" />
          </div>
          <div class="row q-mb-md">
            <q-checkbox v-model="addFormFields.active" label="Активен" />
          </div>
        </template>
      </AddForm>
    </template>
    </BaseDirTable>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import BaseDirTable from '../auxiliary/BaseTable.vue';
import AddForm from '../auxiliary/AddForm.vue';

export default {
  components: {
    BaseDirTable,
    AddForm
  },
  data: () => ({
    title: 'Список заказчиков',
    columns: [],
    visibleColumns: [],
    addFormFields: {
      name: null,
      active: true
    }

  }),

  computed: {
    ...mapState({
      ds: state => state.ds.dsCustomers
    }),
    ...mapGetters({
      getErrorMessage: 'appMode/getErrorMessage'
    })
  },

  methods: {
    ...mapActions({
      getCustomers: 'ds/getCustomers',
      deleteCustomer: 'ds/deleteCustomer'
    })
  },

  // хук когда компонент загружен
  mounted() {
    const res = this.getCustomers();
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

    this.visibleColumns = ['desc', 'active', 'dateCreated', 'dateUpdated', 'row-actions'];
    this.columns = [
      {
        name: 'desc',
        required: true,
        label: 'Наименование заказчика',
        align: 'left',
        field: 'name',
        sortable: true
      },
      {
        name: 'active',
        label: 'Действующий',
        align: 'center',
        field: 'active',
        sortable: true
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
    ];
  }
};
</script>

<style>
</style>

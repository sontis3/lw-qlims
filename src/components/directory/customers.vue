<template>
  <q-page>
    <BaseDirTable
      :title="title"
      :columns="columns"
      :visibleColumns="visibleColumns"
      :baseUrl="customersUrl"
      ref="baseTable"
    >
    <template slot="addForm">
      <AddForm :baseUrl="customersUrl" title="Добавление нового заказчика">
      </AddForm>
    </template>
    </BaseDirTable>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseDirTable from '../auxiliary/BaseTable.vue';
import AddForm from './customers/AddForm.vue';

export default {
  components: {
    BaseDirTable,
    AddForm
  },
  data: () => ({
    title: 'Список заказчиков',
    columns: [],
    visibleColumns: []
  }),

  computed: {
    ...mapGetters({
      customersUrl: 'appMode/customersUrl'
    })
  },

  // хук когда компонент загружен
  mounted() {
    this.$refs.baseTable.getAll();
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
  },
  methods: {
  }
};
</script>

<style>
</style>

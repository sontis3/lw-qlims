<template>
  <q-page>
    <q-table
      title="Список заказчиков"
      :data="tData"
      :columns="columns"
      :visible-columns="visibleColumns"
      :filter="filter"
      row-key="name"
      dense
      separator="cell"
    >
    <template slot="top-left" slot-scope="props">
      <q-search
        hide-underline
        color="secondary"
        v-model="filter"
        class="col-6"
      />
    </template>
    <template slot="top-right" slot-scope="props">
      <q-table-columns
        color="secondary"
        class="q-mr-sm"
        v-model="visibleColumns"
        :columns="columns"
      />
      <q-btn
        flat round dense
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="props.toggleFullscreen"
      />
    </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  data: () => ({
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
      }
    ],
    visibleColumns: ['desc', 'active', 'dateCreated', 'dateUpdated'],
    filter: '',
    tData: []
  }),

  // хук когда компонент загружен
  mounted() {
    this.fetchCustomers();
  },
  methods: {
    async fetchCustomers() {
      return this.$axios({
        method: 'get',
        url: 'http://localhost:3000/api/dir/customers'
      })
        .then((response) => { this.tData = response.data; })
        .catch((err) => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: `${err.message} = get http://localhost:3000/api/dir/customers`,
            icon: 'report_problem'
          });
        });
    }
  }
};
</script>

<style>
</style>

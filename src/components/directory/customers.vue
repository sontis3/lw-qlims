<template>
  <q-page>
    <q-table
      title='Список заказчиков'
      :data='tData'
      :columns='columns'
      row-key='name'
      dense
      separator='cell'
    />
  </q-page>
</template>

<script>
export default {
  data: () => ({
    columns: [
      {
        name: 'name',
        required: true,
        label: 'Наименование заказчика',
        align: 'left',
        field: 'name',
        sortable: true
      },
      {
        name: 'active',
        required: true,
        label: 'Действующий',
        align: 'center',
        field: 'active',
        sortable: true
      },
      {
        name: 'dateCreated',
        required: true,
        label: 'Дата создания',
        align: 'center',
        field: 'dateCreated',
        sortable: true
      },
      {
        name: 'dateUpdated',
        required: true,
        label: 'Дата изменения',
        align: 'center',
        field: 'dateUpdated',
        sortable: true
      }
    ],
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

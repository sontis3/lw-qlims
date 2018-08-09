<template>
  <q-page>
    <q-table
      title="Список заказчиков"
      :data="tData"
      :columns="columns"
      row-key="name"
      dense
    />
  </q-page>
</template>

<script>
export default {
  data: () => ({
    columns: [
      {
        name: 'desc',
        required: true,
        label: 'Dessert (100g serving)',
        align: 'left',
        field: 'name',
        sortable: true
      },
      {
        name: 'calories',
        label: 'Calories',
        field: 'calories',
        sortable: true
      },
      {
        name: 'fat',
        label: 'Fat (g)',
        field: 'fat',
        sortable: true
      },
      {
        name: 'carbs',
        label: 'Carbs (g)',
        field: 'carbs'
      },
      {
        name: 'protein',
        label: 'Protein (g)',
        field: 'protein'
      },
      {
        name: 'sodium',
        label: 'Sodium (mg)',
        field: 'sodium'
      },
      {
        name: 'calcium',
        label: 'Calcium (%)',
        field: 'calcium',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
      },
      {
        name: 'iron',
        label: 'Iron (%)',
        field: 'iron',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
      }
    ],
    tData: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%'
      },
      {
        name: 'Frozen Yogurt2',
        calories: 1592,
        fat: 6.02,
        carbs: 242,
        protein: 4.02,
        sodium: 872,
        calcium: '14%',
        iron: '12%'
      }
    ]
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
        .then((response) => {
          this.columns = [
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
              align: 'left',
              field: 'active',
              sortable: true
            }
          ];
          this.tData = response.data;
        })
        .catch();
    }
  }
};
</script>

<style>
</style>

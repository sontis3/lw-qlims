<template>
  <q-page>
    <q-list>
      <q-collapsible v-for="item in dsYears" :key="item" :label="item" icon="event" :opened="item == (new Date()).getFullYear()" separator dense>
        <q-table
          :columns="columns"
          row-key="name"
          dense
          separator="cell"
        >
        </q-table>
      </q-collapsible>
    </q-list>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    columns: [
      {
        name: 'studyNo',
        required: true,
        label: 'Код исследования',
        align: 'left',
        field: 'name',
        sortable: true,
        classes: 'popup-edit'
      },
      {
        name: 'testItem',
        required: true,
        label: 'Тестируемый объект',
        align: 'left',
        field: 'name',
        sortable: true,
        classes: 'popup-edit'
      },
      {
        name: 'customer',
        required: true,
        label: 'Заказчик',
        align: 'left',
        field: 'name',
        sortable: true,
        classes: 'popup-edit'
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
    visibleColumns: ['studyNo', 'testItem', 'customer']
  }),

  computed: {
    ...mapState({
      dsYears: state => state.ds.dsYears
    })
  }
};
</script>

<style>

</style>

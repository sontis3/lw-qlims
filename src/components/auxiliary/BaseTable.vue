<template>
    <q-table
    :title="title"
    :data="ds"
    :columns="columns"
    :visible-columns="visibleColumns"
    :filter="filter"
    row-key="name"
    dense
    separator="cell"
  >
  <template slot="top-right" slot-scope="props">
    <q-search
      hide-underline
      color="secondary"
      v-model="filter"
      class="col-6"
    />
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

</template>

<script>
export default {
  name: 'BaseDirTable',
  props: {
    title: String,
    columns: Array,
    visibleColumns: Array
  },
  methods: {
    async getAll(apiUrl) {
      return this.$axios({
        method: 'get',
        url: apiUrl
      })
        .then((response) => { this.ds = response.data; })
        .catch((err) => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: `${err.message} = get ${apiUrl}`,
            icon: 'report_problem'
          });
        });
    }
  },
  data: () => ({
  //   title: '',
  //   columns: [],
  //   visibleColumns: [],
    filter: '',
    ds: []
  })


};
</script>

<style>
</style>

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
    <!-- <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer"> -->
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td v-for="col in props.cols" v-if="col.name !== 'rowActions'" :key="col.name" :props="props">
        {{ col.value }}
      </q-td>
      <q-td key="rowActions" :props="props">
        <q-btn round size="xs" icon="edit" @click="EditDocument(props.row)"/>
        <q-btn round size="xs" icon="delete" @click="showing = true">
        <!-- <q-btn round size="xs" icon="delete" @click="DeleteDocument(props.row)"> -->
          <q-popover anchor="bottom left" style="background-color:red">
            <span>Удаление документа</span>
            <q-btn outliner rounded dense size="form-label-inverted" color="red-14" text-color="white" label="Отменить" />
            <q-btn outliner rounded dense color="red-4" text-color="white" label="Удалить" />
          </q-popover>
        </q-btn>
      </q-td>
    </q-tr>
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
    },
    DeleteDocument(row) {
      this.$q.dialog({
        title: 'Удаление документа',
        message: `Документ: ${row.name} будет удален!`,
        color: 'negative',
        preventClose: true,
        ok: true,
        cancel: true
      });
    },
    notify() {
      this.$q.notify(`${(this.$q.platform.is.desktop ? 'Clicked' : 'Tapped')} on a Popover item`);
    },
    rowClick(row) {
      const idd = row.id;
      return idd;
    }
  },
  data: () => ({
    filter: '',
    ds: []
  })
};
</script>

<style>
/* .q-table td {
    background: none !important;
} */
/* цвет строки под курсором */
.q-table tbody tr:hover {
  background-color: #b4d3d0;
}
</style>

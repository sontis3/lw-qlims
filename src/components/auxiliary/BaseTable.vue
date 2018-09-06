<template>
  <div>
    <q-table
      :title="title"
      :data="ds1"
      :columns="columns"
      :visible-columns="visibleColumns"
      :filter="filter"
      :loading="isLoading"
      row-key="name"
      dense
      separator="cell"
    >
      <template slot="top-right" slot-scope="props">
        <q-btn
          flat round dense
          icon="add_box"
          @click="AddDocument"
        />
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
          <q-btn round size="xs" icon="delete">
            <q-popover anchor="bottom left" :style="popoverStyle" @show="showPopover">
              <span>Документ выбран для удаления</span>
              <div id="del-buttons">
                <q-btn outliner rounded dense size="form-label-inverted" color="red-14" text-color="white" label="Отменить" v-close-overlay />
                <q-btn outliner rounded dense color="red-4" text-color="white" label="Удалить" v-close-overlay @click="DeleteDocument(props.row)" />
              </div>
            </q-popover>
          </q-btn>
        </q-td>
      </q-tr>
    </q-table>
    <slot name="addForm"></slot>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'BaseDirTable',
  // свойства базового компонента устанавливаются из потомков
  props: {
    title: String,
    columns: Array,
    visibleColumns: Array,
    ds: Array
  },

  computed: {
    ...mapState({
      isLoading: state => state.ds.isLoading
    }),

    ...mapGetters({
      getErrorMessage: 'appMode/getErrorMessage'
    }),

    // источник данных для таблицы
    ds1: {
      get() { return this.ds; }
      // ,
      // set(newValue) { this.changeShowAddDialog(newValue); }
    }
  },

  methods: {
    ...mapMutations({
      changeShowAddDialog: 'appMode/changeShowAddDialog'
    }),

    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    // удалить документ
    DeleteDocument(row) {
      this.$root.$emit('deleteDocument', row._id);
    },
    // создать документ
    AddDocument() {
      this.changeShowAddDialog(true);
    },
    showPopover() {
      // выставить ширину как у строки таблицы
      this.popoverStyle.minWidth = `${this.$el.querySelector('.q-table tbody tr').clientWidth}px`;
    }
    // ,
    // rowClick(row) {
    //   const idd = row.id;
    //   return idd;
    // }
  },
  data: () => ({
    filter: '',
    popoverStyle: {
      backgroundColor: 'red',
      minWidth: '0px',
      display: 'inline-flex',
      flexWrap: 'nowrap'
    }
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

.q-popover > span {
  margin-left: 8px;
}

#del-buttons {
  display: inline-flex;
  margin-left: auto;
  justify-content: space-around;
  width: 176px;
}

</style>

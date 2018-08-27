<template>
  <div>
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
          <!-- <q-btn round size="xs" icon="delete" @click="DeleteDocument(props.row)"> -->
            <!-- <q-popover anchor="bottom left" style="background-color: red; min-width: 700px" @show="showPopover" ref="myRef"> -->
            <q-popover anchor="bottom left" :style="popoverStyle" ref="delPopover" @show="showPopover">
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
import { mapMutations } from 'vuex';

export default {
  name: 'BaseDirTable',
  // свойства базового компонента устанавливаются из потомков
  props: {
    title: String,
    columns: Array,
    visibleColumns: Array,
    baseUrl: String
  },
  methods: {
    ...mapMutations({
      changeShowAddDialog: 'appMode/changeShowAddDialog'
    }),

    // показать все документы
    async getAll() {
      await this.$axios.get(this.baseUrl)
        .then((response) => { this.ds = response.data; })
        .catch((err) => {
          if (err.response) {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: `Status: ${err.response.status}.  ${err.response.data.message} = get ${this.baseUrl}`,
              icon: 'report_problem'
            });
          } else {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: `${err.message} = get ${this.baseUrl}`,
              icon: 'report_problem'
            });
          }
        });
    },
    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    // удалить документ
    async DeleteDocument(row) {
      const url = `${this.baseUrl}/${row._id}`;
      await this.$axios.delete(url)
        .then(() => {
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: 'Документ успешно удален.',
            icon: 'delete'
          });
          this.getAll();
        })
        .catch((err) => {
          if (err.response) {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: `Status: ${err.response.status}.  ${err.response.data.message} = delete ${url}`,
              icon: 'report_problem'
            });
          } else {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: `${err.message} = delete ${url}`,
              icon: 'report_problem'
            });
          }
        });
    },
    // создать документ
    AddDocument() {
      this.changeShowAddDialog(true);
      // const url = `${this.baseUrl}/${row._id}`;
      // await this.$axios.delete(url)
      //   .then(() => {
      //     this.$q.notify({
      //       color: 'positive',
      //       position: 'top',
      //       message: 'Документ успешно удален.',
      //       icon: 'delete'
      //     });
      //     this.getAll();
      //   })
      //   .catch((err) => {
      //     if (err.response) {
      //       this.$q.notify({
      //         color: 'negative',
      //         position: 'top',
      //         message: `Status: ${err.response.status}.  ${err.response.data.message} = delete ${url}`,
      //         icon: 'report_problem'
      //       });
      //     } else {
      //       this.$q.notify({
      //         color: 'negative',
      //         position: 'top',
      //         message: `${err.message} = delete ${url}`,
      //         icon: 'report_problem'
      //       });
      //     }
      //   });
    },
    // отмена удаления документа
    CancelDelete() {
      this.$refs.delPopover.hide();
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
    ds: [],
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

<template>
  <q-page>
    <BaseDirTable
      :title="title"
      :columns="columns"
      :visibleColumns="visibleColumns"
      :ds="ds"
    >
    </BaseDirTable>
    <q-dialog
      v-model="showDialog"
      prevent-close
      ok="OK"
      cancel="Cancel"
      @ok="onOk"
      @show="onShow"
    >
      <span slot="title">Добавление нового тестируемого объекта</span>
      <div slot="body">
        <div class="row q-mb-md">
          <q-input v-model="addFormFields.name" type="text" float-label="Наименование тестируемого объекта" ref="ff" />
        </div>
        <div class="row q-mb-md">
          <q-checkbox v-model="addFormFields.enabled" label="Активен" />
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex';

import BaseDirTable from '../auxiliary/BaseTable.vue';

export default {
  components: {
    BaseDirTable
  },
  data: () => ({
    title: 'Тестируемые объекты',
    columns: [
      {
        name: 'desc',
        required: true,
        label: 'Наименование',
        align: 'left',
        field: 'name',
        sortable: true,
        classes: 'popup-edit'
      },
      {
        name: 'enabled',
        label: 'Действующий',
        align: 'center',
        field: 'enabled',
        sortable: true,
        sort: (a, b) => a - b,
        classes: 'as-checkbox'
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
    ],
    visibleColumns: ['desc', 'enabled', 'row-actions'],
    addFormFields: {
      name: null,
      enabled: true
    },
    showDialog: false
  }),

  computed: {
    ...mapState({
      // источник данных
      ds: state => state.ds.dsTestObjects
    }),
    ...mapGetters({
      getErrorMessage: 'appMode/getErrorMessage'
    })
  },

  provide() {
    return {
      getDocuments: this.getDocuments,
      showAddDialog: this.showAddDialog,
      deleteDocument: this.deleteDocument,
      updateDocument: this.updateDocument
    };
  },

  methods: {
    ...mapMutations({
      setLoading: 'ds/setLoading'
    }),
    ...mapActions({
      getDocuments: 'ds/getTestObjects',
      addDocument: 'ds/addTestObject',
      deleteDocument: 'ds/deleteTestObject',
      updateDocument: 'ds/updateTestObject'
    }),

    onShow() {
      this.$refs.ff.select();
    },
    showAddDialog() {
      this.showDialog = true;
    },
    async onOk() {
      const res = this.addDocument(this.addFormFields);
      res.then((response) => {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: `Документ '${response.data.name}' успешно создан.`,
          icon: 'save'
        });
      })
        .catch((err) => {
          /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
          const url = err.config.url;
          const errMessage = this.getErrorMessage('post', url, err);
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: errMessage,
            icon: 'report_problem'
          });
        });
    }
  }
};
</script>

<style>
</style>

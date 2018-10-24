<template>
  <q-page>
    <q-list>
      <q-collapsible v-for="item in dsYears"
        :key="item"
        :label="item"
        icon="event"
        :opened="item == (new Date()).getFullYear()"
        @show="onShowYearMasterSchedules(item)"
        separator
        dense>
        <!-- таблица планов исследований -->
        <q-table
          :columns="columns"
          row-key="name"
          :data="ds[item]"
          dense
          separator="cell"
        >
          <template slot="top-right" slot-scope="props">
            <!-- кнопка добавления документа -->
            <q-btn
              flat round dense
              icon="add_box"
              @click="AddDocument(item)"
            />
          </template>
        </q-table>
      </q-collapsible>
    </q-list>
    <!-- диалог добавления документа -->
    <q-dialog
      v-model="showDialog"
      prevent-close
      ok="OK"
      cancel="Cancel"
      @ok="onOk"
      @show="onShow"
    >
      <span slot="title">Добавление нового исследования в {{addFormFields.planYear}} год</span>
      <div slot="body">
        <div class="row q-mb-md">
          <q-input v-model="addFormFields.studyNo" type="text" float-label="Код исследования" ref="ff" />
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
    visibleColumns: ['studyNo', 'testItem', 'customer'],
    addFormFields: {
      planYear: 2018,
      studyNo: null,
      enabled: true
    },
    showDialog: false
  }),

  computed: {
    ...mapState({
      dsYears: state => state.ds.dsYears,
      // источник данных
      ds: state => state.ds.dsMasterSchedules
    }),
    ...mapGetters({
      getErrorMessage: 'appMode/getErrorMessage'
    })
  },
  methods: {
    ...mapMutations({
      setLoading: 'ds/setLoading'
    }),

    ...mapActions({
      getDocuments: 'ds/getStudies',
      addDocument: 'ds/addStudy',
      deleteDocument: 'ds/deleteStudy',
      updateDocument: 'ds/updateStudy'
    }),

    // создать документ
    AddDocument(planYear) {
      this.showDialog = true;
      this.addFormFields.planYear = planYear;
    },

    // показ план графика за год
    onShowYearMasterSchedules(year) {
      this.setLoading(true);
      const res = this.getDocuments(year);

      res.then(() => { })
        .catch((err) => {
          const errMessage = this.getErrorMessage('get', err);
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: errMessage,
            icon: 'report_problem'
          });
        })
        .finally(() => {
          this.setLoading(false);
        });


      if (year === 1964) {
        this.showDialog = true;
      }
    },

    // показ формы добавления документа
    onShow() {
      // установка выделенного поля
      this.$refs.ff.select();
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
          const errMessage = this.getErrorMessage('post', err);
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

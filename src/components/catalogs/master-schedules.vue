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
          :visible-columns="visibleColumns"
          row-key="name"
          :data="ds[item]"
          dense
          separator="cell"
        >
          <!-- слот правого заголовка таблицы -->
          <template slot="top-right" slot-scope="props">
            <!-- кнопка добавления документа -->
            <q-btn
              flat round dense
              icon="add_box"
              @click="AddDocument(item)"
            />
          </template>

          <!-- слот строк таблицы -->
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td v-for="col in props.cols" v-if="col.name !== 'rowActions'" :key="col.name" :props="props">
              <template v-if="col.classes === 'as-checkbox'" :props="props">
                <q-checkbox v-model="props.row[col.field]" @input="UpdateDocument(props.row, col.label)"/>
              </template>
              <template v-else-if="col.classes === 'popup-edit'">
                {{ col.value }}
                <q-popup-edit :value="props.row[col.field]" @input="val => UpdateDocument(col.field, val)">
                <!-- <q-popup-edit v-model="props.row[col.field]" @save="UpdateDocument(props.row, col.label)"> -->
                  <q-field count>
                    <q-input v-model="props.row[col.field]" />
                  </q-field>
                </q-popup-edit>
              </template>
              <template v-else>
                {{ col.value }}
              </template>
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
      </q-collapsible>
    </q-list>
    <!-- диалог добавления документа -->
    <q-dialog
      id="add-document-dialog"
      v-model="showDialog"
      prevent-close
      @ok="onOk"
      @show="onShow"
    >
      <span slot="title">Добавление нового исследования в {{addFormFields.planYear}} год</span>
      <div slot="body">
        <div class="row q-mb-md">
          <q-input v-model="addFormFields.studyNo" type="text" float-label="Код исследования" ref="ff" clearable :error="$v.addFormFields.studyNo.$error"/>
        </div>
        <div class="row q-mb-md">
          <q-select v-model="addFormFields.customerId" :options="dsShortCustomers" float-label="Заказчик" :error="$v.addFormFields.customerId.$error"/>
        </div>
        <div class="row q-mb-md">
          <q-select v-model="addFormFields.test_objectId" :options="dsShortTestObjects" float-label="Тестируемый объект" :error="$v.addFormFields.test_objectId.$error"/>
        </div>
        <div class="row q-mb-md">
          <q-checkbox v-model="addFormFields.enabled" label="Активен" />
        </div>
      </div>
      <template slot="buttons" slot-scope="props">
        <q-btn color="primary" label="OK" @click="validateAndClose(props.ok)" />
        <q-btn flat label="Cancel" @click="props.cancel" />
      </template>
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

import { required, minLength } from 'vuelidate/lib/validators';

export default {
  data: () => ({
    columns: [
      {
        name: 'studyNo',
        required: true,
        label: 'Код исследования',
        align: 'left',
        field: 'studyNo',
        sortable: true,
        classes: 'popup-edit'
      },
      {
        name: 'testObject',
        required: true,
        label: 'Тестируемый объект',
        align: 'left',
        field: row => ((row || {}).test_object || {}).name, // защита от ошибки, если customer=undefined
        sortable: true
      },
      {
        name: 'customer',
        required: true,
        label: 'Заказчик',
        align: 'left',
        field: row => ((row || {}).customer || {}).name, // защита от ошибки, если customer=undefined
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
    visibleColumns: ['studyNo', 'testObject', 'customer', 'dateCreated', 'dateUpdated'],
    addFormFields: {
      studyNo: null,
      planYear: 2018,
      customerId: null,
      test_objectId: null,
      enabled: true
    },
    showDialog: false,
    popoverStyle: {
      backgroundColor: 'red',
      minWidth: '0px',
      display: 'inline-flex',
      flexWrap: 'nowrap'
    }
  }),

  validations: {
    addFormFields: {
      studyNo: {
        required,
        minLength: minLength(5)
      },
      customerId: { required },
      test_objectId: { required }
    }
  },

  computed: {
    ...mapState({
      dsYears: state => state.ds.dsYears,
      dsShortCustomers: state => state.ds.dsShortCustomers,
      dsShortTestObjects: state => state.ds.dsShortTestObjects,
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
      updateDocument: 'ds/updateStudy',

      getShortEnabledCustomers: 'ds/getShortEnabledCustomers',
      getShortEnabledTestObjects: 'ds/getShortEnabledTestObjects'
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
    },

    // показ формы добавления документа
    onShow() {
      // установка выделенного поля
      this.$refs.ff.select();
    },

    // валидация формы добавления документа
    validateAndClose(ok) {
      this.$v.addFormFields.$touch();
      if (this.$v.addFormFields.$error) {
        return;
      }
      ok();
    },

    // добавление документа
    async onOk() {
      const res = this.addDocument(this.addFormFields);
      res.then((response) => {
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: `Документ '${response.data.studyNo}' успешно создан.`,
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
    },
    showPopover() {
      // выставить ширину как у строки таблицы
      this.popoverStyle.minWidth = `${this.$el.querySelector('.q-table tbody tr').clientWidth}px`;
    }
  },

  mounted() {
    this.setLoading(true);
    let res = this.getShortEnabledCustomers();
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

    this.setLoading(true);
    res = this.getShortEnabledTestObjects();
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
  }
};
</script>

<style>
/* снимает ограничение высоты диалога, чтобы не было скрола */
#add-document-dialog .modal-body {
  max-height: initial;
}
</style>

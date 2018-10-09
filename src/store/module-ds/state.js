export default {
  // адреса web API
  apiUrl: 'http://localhost:3000/api',
  dirPartUrl: 'dir',
  catalogsPartUrl: 'catalogs',
  customersPartUrl: 'customers',
  testObjectsPartUrl: 'test-objects',
  deliveryMethodsPartUrl: 'delivery-methods',
  studiesPartUrl: 'studies',

  /* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
  // источники данных
  dsCustomers: [],        // Заказчики
  dsTestObjects: [],      // Тестируемые объекты
  dsDeliveryMethods: [],  // Методы доставки
  dsMasterSchedules: [],  // План-график исследований

  // годы
  dsYears: ['2016', '2017', '2018', '2019'],

  // индикатор загрузки данных
  isLoading: false
};

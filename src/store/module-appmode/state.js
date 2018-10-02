export default {
  // Текущий выбранный режим из меню тулбара
  currentMode: { id: 'Directory', name: 'Системные справочники' },

  // Варианты панели команд
  allActions: [
    {
      modeId: 'Directory',
      currentAction: 'Customers',
      actions: [
        { id: 'Customers', name: 'Заказчики' },
        { id: 'TestObjects', name: 'Тестируемые объекты' },
        { id: 'DeliveryMethods', name: 'Способы доставки' },
        { id: 'Couriers', name: 'Курьеры' },
        { id: 'Samples', name: 'Образцы' }
      ]
    },
    {
      modeId: 'Catalogs',
      currentAction: 'MasterSchedules',
      actions: [
        { id: 'MasterSchedules', name: 'План-график исследований' },
        { id: 'Studies', name: 'Реестр исследований' },
        { id: 'StandardSamples', name: 'Реестр стандартных образцов' },
        { id: 'Couriers2', name: 'Курьеры2' },
        { id: 'Samples2', name: 'Образцы2' }
      ]
    }
  ],

  // индикатор показа диалога добавления документа
  showAddDialog: false
};

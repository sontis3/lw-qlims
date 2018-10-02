
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', name: 'Index', component: () => import('pages/index') },
      { path: 'directory/customers', name: 'Customers', component: () => import('components/directory/customers') },
      { path: 'directory/test-objects', name: 'TestObjects', component: () => import('components/directory/test-objects') },
      { path: 'directory/delivery-methods', name: 'DeliveryMethods', component: () => import('components/directory/delivery-methods') },
      { path: 'directory/couriers', name: 'Couriers', redirect: '' },
      { path: 'directory/samples', name: 'Samples', redirect: '' },

      { path: 'catalogs/master-schedules', name: 'MasterSchedules', component: () => import('components/catalogs/master-schedules') },
      { path: 'catalogs/studies', name: 'Studies', component: () => import('components/catalogs/studies') },
      { path: 'catalogs/standard-samples', name: 'StandardSamples', component: () => import('components/catalogs/standard-samples') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
];

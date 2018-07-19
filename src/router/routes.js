
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', name: 'Index', component: () => import('pages/index') },
      { path: 'directory/customers', name: 'Customers', component: () => import('components/directory/customers') },
      { path: 'directory/test-objects', name: 'TestObjects', component: () => import('components/directory/test-objects') },
      { path: 'directory/delivery-kinds', name: 'DeliveryKinds', redirect: '' },
      { path: 'directory/couriers', name: 'Couriers', redirect: '' },
      { path: 'directory/samples', name: 'Samples', redirect: '' }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
];

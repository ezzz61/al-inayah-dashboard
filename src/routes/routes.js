import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'
import Login from 'src/pages/Login.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'

import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import Floor from 'src/pages/Floor/Floor.vue'


const routes = [

  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview',

  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'floor',
        name: 'floor',
        component: Floor
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('src/pages/Category/Category.vue'),

      },
      {
        path: 'category/add',
        name: 'add_category',
        component: () => import('src/pages/Category/Add.vue'),

      },
      {
        path: 'category/update/:id',
        name: 'update_category',
        component: () => import('src/pages/Category/Update.vue'),

      },
      {
        path: 'floor/add',
        name: 'add_floor',
        component: () => import('src/pages/Floor/Add.vue'),

      },
      {
        path: 'floor/update/:id',
        name: 'update_floor',
        component: () => import('src/pages/Floor/Update.vue'),

      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes

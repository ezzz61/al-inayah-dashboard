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
        path: 'verification',
        name: 'verification',
        component: () => import('src/pages/Verification/Verification.vue'),

      },

      {
        path: 'verification/c/:id',
        name: 'confirm_event',
        component: () => import('src/pages/Verification/Confirmation.vue'),
      },
      {
        path: 'candidate/e/:event_id',
        name: 'add_candidate',
        component: () => import('src/pages/Verification/Candidate.vue'),
      },


      {
        path: 'verification/:id_event/detail/:id_candidate',
        name: 'detail_event_confirm',
        component: () => import('src/pages/Verification/VerificationDetail.vue'),

      },
      {
        path: 'verification/update/:id',
        name: 'update_verification',
        component: () => import('src/pages/Verification/Update.vue'),

      },
      {
        path: 'result',
        name: 'result',
        component: () => import('src/pages/Result/Result.vue'),

      },
      {
        path: 'result/:id',
        name: 'result_detail',
        component: () => import('src/pages/Result/Detail.vue'),

      },
      // {
      //   path: 'tenant',
      //   name: 'result',
      //   component: () => import('src/pages/Tenant/Tenant.vue'),

      // },
      // {
      //   path: 'tenant/add',
      //   name: 'add_tenant',
      //   component: () => import('src/pages/Tenant/Add.vue'),

      // },
      // {
      //   path: 'tenant/update/:id',
      //   name: 'update_tenant',
      //   component: () => import('src/pages/Tenant/Update.vue'),

      // },
      {
        path: 'event',
        name: 'event',
        component: () => import('src/pages/Event/Event.vue'),

      },
      {
        path: 'event/add',
        name: 'add_event',
        component: () => import('src/pages/Event/Add.vue'),

      },
      {
        path: 'event/update/:id',
        name: 'update_event',
        component: () => import('src/pages/Event/Update.vue'),

      },


      {
        path: 'user',
        name: 'User',
        component: () => import('src/pages/User/User.vue'),
      },
      {
        path: 'user/u/:id',
        name: 'User_update',
        component: () => import('src/pages/User/Update.vue'),
      },
      {
        path: 'user/add',
        name: 'User_add',
        component: () => import('src/pages/User/Add.vue'),
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

import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core';
import { AuthLayoutComponent } from './core';

import { AuthGuard } from './guards/auth.guard'

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: '',
      //   loadChildren: './dashboard/dashboard.module#DashboardModule'
      // },
      {
        path: '',
        redirectTo: 'buscar-historia-de-credito',
        pathMatch: 'full'
      },
      
      {
        path: 'docs',
        loadChildren: './docs/docs.module#DocsModule'
      },


      //FINEXUS

      {
        path: 'buscar-historia-de-credito',
        loadChildren: './search-history-credit/search-history-credit.module#SearchHistoryCreditModule'
      },
      {
        path: 'consultar-historia-de-credito',
        loadChildren: './consultar-historia-de-credito/consultar-historia-de-credito.module#ConsultarHistoriaDeCreditoModule'
      },
      {
        path: 'users',
        loadChildren: './pages/users/users.module#UsersModule'
      },
      {
        path: 'offices',
        loadChildren: './pages/offices/offices.module#OfficesModule'
      },
      {
        path: 'pagadurias',
        loadChildren: './pages/pagadurias/pagadurias.module#PagaduriasModule'
      },
      {
        path: 'profiles',
        loadChildren: './pages/profiles/profiles.module#ProfilesModule'
      },
      {
        path: 'requests',
        loadChildren: './pages/requests/requests.module#RequestsModule'
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'account',
        loadChildren: './account/account.module#AccountModule'
      },
      {
        path: 'error',
        loadChildren: './error/error.module#ErrorModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

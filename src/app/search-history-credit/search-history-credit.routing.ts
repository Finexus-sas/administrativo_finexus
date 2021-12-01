import { Routes } from '@angular/router';

import { SearchHistoryCreditComponent } from './search-history-credit.component';

export const SearchHistoryCreditRoutes: Routes = [
    {
        path: '',
        component: SearchHistoryCreditComponent,
        data: {
            heading: 'Consultar cliente',
            titleSearch: "Buscar por cedula del cliente"
        }
    }
];

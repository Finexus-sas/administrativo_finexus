import { Routes } from '@angular/router';

import { PagaduriasListComponent } from './pagadurias-list/pagadurias-list.component';
import { PagaduriasCreateComponent } from './pagadurias-create/pagadurias-create.component'

export const PagaduriasRoutes: Routes = [
    {
        path: '',
        component: PagaduriasListComponent,
        data: {
            heading: 'Pagadurias',
            titleSearch: "Buscar Pagaduria"
        }
    },
    {
        path: 'create',
        component: PagaduriasCreateComponent,
        data: {
            heading: 'Creación de pagadurias',
        }
    },

    {
        path: 'create/:pagaduria',
        component: PagaduriasCreateComponent,
        data: {
            heading: 'Edición de pagaduria',
        }
    }
];

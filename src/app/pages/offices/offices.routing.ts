import { Routes } from '@angular/router';

import { OfficesListComponent } from './offices-list/offices-list.component'
import { OfficesCreateComponent } from './offices-create/offices-create.component';

export const UserRoutes: Routes = [
    {
        path: '',
        component: OfficesListComponent,
        data: {
            heading: 'Oficinas',
            titleSearch: "Buscar oficina"
        }
    },
    {
        path: 'create',
        component: OfficesCreateComponent,
        data: {
            heading: 'Creacion de oficinas',
        }
    },
    {
        path: 'edit/:oficina',
        component: OfficesCreateComponent,
        data: {
            heading: 'Edicion de usuario',
        }
    }
];

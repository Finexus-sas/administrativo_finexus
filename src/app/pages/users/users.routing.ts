import { Routes } from '@angular/router';

import { UsersComponent } from './list-users/users.component'
import { UsersCreateComponent } from './users-create/users-create.component';

export const UserRoutes: Routes = [
    {
        path: '',
        component: UsersComponent,
        data: {
            heading: 'Usuarios del sistema',
            titleSearch: "Buscar por cedula del cliente"
        }
    },
    {
        path: 'create',
        component: UsersCreateComponent,
        data: {
            heading: 'Creacion de usuarios',
        }
    },
    {
        path: 'edit/:user',
        component: UsersCreateComponent,
        data: {
            heading: 'Edicion de usuario',
        }
    }
];

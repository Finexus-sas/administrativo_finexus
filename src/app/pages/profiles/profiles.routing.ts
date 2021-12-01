import { Routes } from '@angular/router';

import { ProfilesListComponent } from './profiles-list/profiles-list.component';

export const ProfilesRoutes: Routes = [
    {
        path: '',
        component: ProfilesListComponent,
        data: {
            heading: 'Perfiles'
        }
    },
    // {
    //     path: 'create',
    //     component: OfficesCreateComponent,
    //     data: {
    //         heading: 'Creacion de oficinas',
    //     }
    // },
    // {
    //     path: 'edit/:oficina',
    //     component: OfficesCreateComponent,
    //     data: {
    //         heading: 'Edicion de usuario',
    //     }
    // }
];

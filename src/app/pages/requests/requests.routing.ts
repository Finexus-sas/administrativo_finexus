import { Routes } from '@angular/router';
import { RequestsListComponent } from './requests-list/requests-list.component';

export const RequestsRoutes: Routes = [
    {
        path: '',
        component: RequestsListComponent,
        data: {
            heading: 'Solicitudes',
            titleSearch: "Buscar solicitudes"
        }
    },
];

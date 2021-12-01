import { Routes } from '@angular/router';

import { ConsultarHistoriaDeCreditoComponent } from './consultar-historia-de-credito.component'

export const ConsultarHistoriaRoutes: Routes = [
    {
        path: '',
        component: ConsultarHistoriaDeCreditoComponent,
        data: {
            heading: 'Historias de credito',
            titleSearch: "Buscar por cedula del cliente"
        }
    }
];

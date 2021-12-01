import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryCreditService {

  constructor(private http: HttpService) { }

  all(data) {
    return this.http.post('/hdc/lista-consulta', data)
  }


  get(identification) {
    return this.http.get('/hdc/pdf/' + identification)
  }

  getLegalCheck(identification) {
    return this.http.get('/hdc/pdf/legal-check/' + identification)
  }

  getInfoComercial(identification) {
    return this.http.get('/hdc/pdf/infocomercial/' + identification)
  }

  getHistoryCredit(data: IClient) {
    return this.http.post('/hdc/historia-credito', data);
  }

  requestsAsesor(data) {
    return this.http.post('/generic/request', { "resource": "/generic/request/solicitudes_asesor", data });
  }

  validateFile(data) {
    return this.http.post('/generic/request', { "resource": "/generic/request/validar-certificado-deuda", data });
  }

  generatePazYSalvo(idSolicitud) {
    return this.http.get('/portal/task/email-pazysalvo/' + idSolicitud);
  }

  generateCertificadoDeDeuda(idSolicitud) {
    return this.http.get('/portal/task/email-certificado-deuda/' + idSolicitud);
  }

  downloadCertificadoDeDeuda(idSolicitud) {
    return this.http.get('/portal/download/1/'+idSolicitud);
  }

  downloadPazYSalvo(idSolicitud) {
    return this.http.get('/portal/download/2/'+idSolicitud);
  }

}

export interface IClient {
  "tipo_identificacion": string;
  "identificacion": string;
  "primer_apellido": string;
  "empresa": string;
  "usuario": string;
}

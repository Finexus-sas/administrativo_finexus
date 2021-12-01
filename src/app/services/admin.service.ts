import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpService) { }

  allUsers() {
    return this.http.get('/login/usuarios')
  }

  saveUser(user) {
    return this.http.post('/login/save-user', user)
  }

  changePassword(data) {
    return this.http.post('/login/cambiar-password', data)
  }

  allUsersSeas() {
    return this.http.get('/login/seas/usuarios-all')
  }

  filterUsersSeas(name) {
    return this.http.get('/login/seas/usuarios-filter/' + name)
  }

  getOfficies() {
    return this.http.get('/login/oficinas');
  }

  getSeasOfficies() {
    return this.http.get('/login/seas/oficinas-seas');
  }

  saveOfficies(data){
    return this.http.post('/generic/request', { "resource": "/generic/request/crud-oficinas", data });
  }

  getProfiles() {
    return this.http.get('/login/perfiles');
  }

  saveProfile(data){
    return this.http.post('/generic/request', { "resource": "/generic/request/crud-perfiles", data });
  }

  getOffices() {
    return this.http.get('/login/seas/oficinas-seas');
  }
 
  getPagadurias() {
    return this.http.get('/login/pagadurias-all');
  }
  getSeasPagadurias() {
    return this.http.get('/login/seas/pagadurias-seas');
  }

  filterSeasPagadurias(name) {
    return this.http.get('/login/seas/pagadurias-seas-filter/'+name);
  }

  savePagaduria(data) {
    return this.http.post('/generic/request', { "resource": "/generic/request/crud-pagaduria", data });
  }

  getDptos() {
    return this.http.get('/login/departamentos');
  }

  getCitys(dpto) {
    return this.http.get('/login/municipios/' + dpto);
  }

  

}

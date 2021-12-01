import { Injectable } from '@angular/core';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) { }


  login(data: iLogin) {
    return this.http.post('/login/signin', data)
  }

  getMenu() {
    return this.http.get('/login/menu')
  }



  get user() {
    return JSON.parse(localStorage.getItem('user'))
  }

  set user(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }


  get token() {
    return localStorage.getItem('token')
  }

  set token(token) {
    localStorage.setItem('token', token)
  }

  get homePage() {
    return localStorage.getItem('homePage');
  }

  set homePage(page) {
    localStorage.setItem('homePage', page)
  }
}




export interface iLogin {
  username: string;
  password: string;
}

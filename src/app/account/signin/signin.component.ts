import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {

    this.auth.login(this.form.value).subscribe(Response => {
      this.auth.user = Response.data;
      this.auth.token = Response.data.token
      this.validateUrl()
    }, async err => {
      this.handleLoginerror(err)
    })
  }


  private validateUrl() {
    this.auth.getMenu().subscribe(Response => {
      const initilPage = Response[0].children[0].route;
      this.auth.homePage = initilPage;
      this.router.navigate(['/' + initilPage])
    })
  }


  private async handleLoginerror(err) {
    switch (err.status) {
      case 400:
        return await Swal.fire('Lo sentimos', 'Usuario y/o contraseña incorrecto', 'warning')

      case 500:
        return await Swal.fire('Lo sentimos', 'Al parecer estamos teniendo problemas de conexion, intentelo nuevamente', 'error')

      default:
        return await Swal.fire('Lo sentimos', 'Al parecer estamos teniendo problemas de conexion, intentelo nuevamente', 'error')
    }

  }
}

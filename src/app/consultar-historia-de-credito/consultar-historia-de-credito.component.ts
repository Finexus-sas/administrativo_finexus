import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { HistoryCreditService } from '../services/history-credit.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-historia-de-credito',
  templateUrl: './consultar-historia-de-credito.component.html',
  styleUrls: ['./consultar-historia-de-credito.component.scss']
})
export class ConsultarHistoriaDeCreditoComponent implements OnInit {

  public form: FormGroup;
  public valid: boolean = false;
  public loading = false;

  constructor(private fb: FormBuilder, private history: HistoryCreditService, private router: Router) {
    this.form = this.fb.group({
      tipo_identificacion: ["1", Validators.compose([Validators.required])],
      identificacion: [null, Validators.compose([Validators.required])],
      primer_apellido: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  async getHistoryCredit() {
    this.loading = true;
    let data = {
      ...this.form.value,
      empresa: "FINEXUS",
      usuario: "antojsh",
      identificacion: String(this.form.value.identificacion)
    }
    this.history.getHistoryCredit(data)
      .subscribe(async Response => {
        this.loading = false;
        this.getPDF(String(this.form.value.identificacion))
      }, async response => {
        this.loading = false;
        await Swal.fire('Lo sentimos', response.error.detail || 'Ha ocurrido un problema al generar el PDF', 'error')
      })
  }


  getPDF(id) {

    this.history.get(id).subscribe(Response => {
      window.open(
        Response.data,
        '_blank'
      );
    }, async err => {
      await Swal.fire('Lo sentimos', 'Ha ocurrido un problema al generar el PDF', 'error')
    })

  }

}

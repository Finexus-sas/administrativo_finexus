import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-pagadurias-create',
  templateUrl: './pagadurias-create.component.html',
  styleUrls: ['./pagadurias-create.component.scss']
})
export class PagaduriasCreateComponent implements OnInit {
  form: FormGroup;
  dptos: any[] = [];
  citys: any[] = [];
  loading: boolean = false;
  currentPagaduria;
  closeResult;
  pagaduriaSearch;
  pagadurias: any[] = [];
  pagaduria;

  constructor(private admin: AdminService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private fb: FormBuilder,) {
    this.form = this.fb.group({
      "nit": ["", Validators.compose([Validators.required])],
      "email": ["", Validators.compose([Validators.email])],
      "estado": ["1", Validators.compose([Validators.required])],
      "telefono": [""],
      "direccion": [""],
      "municipio": [""],
      "departamento": [""],
      "nombre_corto": [""],
      "razon_social": ["", Validators.compose([Validators.required])],
      "digito_verificacion": [""]
    })

    this.pagaduria = this.route.snapshot.paramMap.get('pagaduria');
  }

  ngOnInit() {
    this.loadDptos()
    if (this.pagaduria) {
      this.autoCompleteForm()
    }
  }


  autoCompleteForm() {
    const pagaduriaWillSave = JSON.parse(this.pagaduria)

    for (let i in pagaduriaWillSave) {
      if (this.form.controls[i])
        this.form.controls[i].setValue(pagaduriaWillSave[i])
    }

    this.loadCitys()
  }
  savePagaduria() {
    this.loading = true;
    this.admin.savePagaduria(this.prepatePagaduriaData())
      .subscribe(async response => {
        if (response.code === "200") {
          await Swal.fire('Listo', 'Pagaduria creada correctamente', 'success');
          this.form.reset()
        } else {
          await Swal.fire('Lo sentimos', response.respuesta, 'error')
        }
        this.loading = false;

      }, async err => {
        await Swal.fire('Lo sentimos', 'Error al guardar, ' + err.error.detail)
      })
  }

  prepatePagaduriaData() {
    return {
      ...this.form.value,
      estado: this.form.controls.estado.value == '1' ? '' : 'A'
    }
  }

  loadDptos() {
    this.admin.getDptos()
      .subscribe(response => {
        this.dptos = response;
      })
  }

  loadCitys() {
    this.admin.getCitys(this.form.controls.departamento.value)
      .subscribe(response => {
        this.citys = response;
      })
  }

  goToEdit(row) {
    this.currentPagaduria = row;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
    this.getSeasPagaduria()
  }

  close() {
    this.modalService.dismissAll()
  }

  filterSeasPagadurias() {
    this.admin.filterSeasPagadurias(this.pagaduriaSearch)
      .subscribe(response => {
        this.pagadurias = response;
      })

  }

  getSeasPagaduria() {
    this.admin.getSeasPagadurias()
      .subscribe(response => {
        this.pagadurias = response;
      })
  }

  completeForm(row) {
    this.form.controls.nit.setValue(row.nit);
    this.form.controls.razon_social.setValue(row.nombre);
    this.close()
  }

  noLetters(control: any) {
    control.setValue(control.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
  }

}

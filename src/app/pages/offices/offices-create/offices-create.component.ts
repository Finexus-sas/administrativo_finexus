import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-offices-create',
  templateUrl: './offices-create.component.html',
  styleUrls: ['./offices-create.component.scss']
})
export class OfficesCreateComponent implements OnInit {
  form: FormGroup;
  offices: any[] = [];
  office;
  loading: boolean = false;
  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute,
    private admin: AdminService,
    private modalService: NgbModal) {
    this.form = this.fb.group({
      "codigo": [""],
      "nombre_oficina": ["", Validators.compose([Validators.required])],
      "estado": ["", Validators.compose([Validators.required])],
    })

    this.office = this.route.snapshot.paramMap.get('oficina');
  }

  ngOnInit() {
    if(this.office){
      this.autoCompleteForm()
    }
  }

  autoCompleteForm(){
    const officeWillSave = JSON.parse(this.office);
    this.form.controls.nombre_oficina.setValue(officeWillSave.oficina)
    this.form.controls.estado.setValue(officeWillSave.estado)
    this.form.controls.codigo.setValue(officeWillSave.id)
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    });
    this.getSeasOfficies()
  }

  close() {
    this.modalService.dismissAll()
  }


  getSeasOfficies() {
    this.admin.getSeasOfficies()
      .subscribe(response => {
        this.offices = response;
      })
  }

  completeForm(row) {
    this.form.controls.nombre_oficina.setValue(row.nombre)
    this.form.controls.estado.setValue("1")
    this.form.controls.codigo.setValue(row.codigo)
    this.close()
  }

  saveOffice() {
    this.loading = true;
    this.admin
      .saveOfficies(this.prepareDateToDave())
      .subscribe(async response => {
        if (response.code === "200") {
          await Swal.fire('Listo', 'Oficina creada correctamente', 'success');
          this.form.reset()
        } else {
          await Swal.fire('Lo sentimos', 'Error al guardar')
        }
        this.loading = false;
      })
  }

  prepareDateToDave() {
    return {
      ...this.form.value,
      estado: this.form.controls.estado.value == '1' ? '' : 'A',
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent implements OnInit {

  rows = [];
  backupRows = [];
  limit = 1000;
  offset = 0;
  form: FormGroup;
  currentProfile;
  @ViewChild('content', null) modal;

  constructor(private admin: AdminService,
    private modalService: NgbModal,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      "id": ["0", Validators.compose([Validators.required])],
      "nombre_perfil": ["", Validators.compose([Validators.required])],
      "estado": ["", Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
    this.getProfiles()
  }


  getProfiles() {
    this.admin.getProfiles()
      .subscribe(profiles => {
        this.rows = profiles;
        this.backupRows = profiles;
      })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    });
  }

  close() {
    this.modalService.dismissAll()
  }

  save() {
    this.admin.saveProfile(this.prepareDateToDave())
      .subscribe(async response => {
        if (response.code === "200") {
          await Swal.fire('Listo', 'Perfil creado correctamente', 'success');
          this.form.reset()
          this.close()
          this.getProfiles()
        } else {
          await Swal.fire('Lo sentimos', 'Error al guardar')
        }
      })
  }
  prepareDateToDave() {
    return {
      ...this.form.value,
      estado: this.form.controls.estado.value == '1' ? '' : 'A',
      id: parseInt(this.form.controls.id.value)
    }
  }


  goToEdit(row) {
    console.log(row)
    this.currentProfile = row;
    this.open(this.modal);

    this.form.controls.id.setValue(row.id)
    this.form.controls.nombre_perfil.setValue(row.perfil)
    this.form.controls.estado.setValue(row.estado)
  }

  updateFilter(event) {
    const val = event.target.value;
    if (val == '' || !val) {
      return this.rows = this.backupRows;
    }
    console.log(val)
    // filter our data
    const temp = this.backupRows.filter(function (d) {
      return String(d.perfil).toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
  }
}

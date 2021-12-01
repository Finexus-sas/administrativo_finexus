import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {
  closeResult: string;
  public form: FormGroup;
  userSearch;
  usersSeas: any[] = [];
  userWillSave;
  loading = false;
  officies: any[] = [];
  profiles: any[] = [];
  isEditMode: boolean = false;
  password = '';
  passwordValidate = '';

  @ViewChild('content', null) modal;
  user;

  constructor(
    private userService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private admin: AdminService,
    private modalService: NgbModal) {


    this.form = this.fb.group({
      estado: [""],
      nombre: ["", Validators.compose([Validators.required])],
      apellidos: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      telefono: ["", Validators.compose([Validators.maxLength(7), Validators.minLength(7)])],
      celular: ["", Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
      creation_user: [""],
      id_perfil: ["", Validators.compose([Validators.required])],
      id_oficina: ["", Validators.compose([Validators.required])]
    });
    this.user = this.route.snapshot.paramMap.get('user');
    this.isEditMode = this.router.url.includes('edit');

  }

  ngOnInit() {
    this.getAllUsersSeas()
    this.getOfficies()
    this.getProfiles()
    this.autoCompleteForm()
  }


  autoCompleteForm() {
    this.userWillSave = JSON.parse(this.user);

    this.form.controls.nombre.setValue(this.userWillSave.nombres)
    this.form.controls.apellidos.setValue(this.userWillSave.apellidos)
    this.form.controls.email.setValue(this.userWillSave.email)
    this.form.controls.username.setValue(this.userWillSave.username)
    this.form.controls.celular.setValue(this.userWillSave.celular);
    this.form.controls.id_perfil.setValue(this.userWillSave.id_perfil);
    this.form.controls.id_oficina.setValue(this.userWillSave.id_oficina);
    this.form.controls.telefono.setValue(this.userWillSave.telefono);
    this.form.controls.estado.setValue(this.userWillSave.estado);
    this.form.removeControl('password');
  }

  getAllUsersSeas() {
    this.loading = true;
    this.admin.allUsersSeas()
      .subscribe(response => {
        this.usersSeas = response;
        this.loading = false;
      })
  }

  filterUserSeas() {
    this.loading = true;
    if (!this.userSearch) {
      return this.getAllUsersSeas()
    }
    this.admin.filterUsersSeas(this.userSearch)
      .subscribe(response => {
        this.usersSeas = response;
        this.loading = false;
      })
  }

  saveUser() {
    this.loading = true;
    this.admin.saveUser(this.prepareDate())
      .subscribe(async response => {
        this.loading = false;
        await Swal.fire('Listo', 'Usuario guardado correctamente', 'success');
        this.form.reset()
      }, async ResponseError => {
        this.loading = false;
        await Swal.fire('Algo salio mal', ResponseError.error.detail + ' Intentalo nuevamente, si el problema persiste comunicate con soporte', 'error')
      })
  }

  completeForm(user) {
    this.userWillSave = user;
    console.log(this.userWillSave)
    this.form.controls.nombre.setValue(this.userWillSave.nombre)
    this.form.controls.apellidos.setValue(this.userWillSave.apellido)
    this.form.controls.email.setValue(this.userWillSave.email)
    this.form.controls.username.setValue(this.userWillSave.login)
    this.form.controls.celular.setValue(this.userWillSave.celular)
    this.form.controls.telefono.setValue(this.userWillSave.telefono)
    this.close()
  }

  private prepareDate() {
    const userName = this.userService.user.usuario;
    return {
      ...this.form.value,
      id_oficina: parseInt(this.form.controls.id_oficina.value),
      id_perfil: parseInt(this.form.controls.id_perfil.value),
      celular: String(this.form.controls.celular.value),
      creation_user: userName,
      estado: this.form.controls.estado.value == '1' ? '' : 'A',
      username: this.form.controls.username.value.toUpperCase()
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  close() {
    this.modalService.dismissAll()
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getOfficies() {
    this.admin.getOfficies()
      .subscribe(response => {
        this.officies = response.filter(x => x.estado != "0")
      })
  }


  getProfiles() {
    this.admin.getProfiles()
      .subscribe(response => {
        this.profiles = response.filter(x => x.estado != "0")
        console.log(this.profiles)
      })
  }

  validateLengthPassword(password) {
    return password.length <= 3;
  }


  changePasswordUser() {
    this.userWillSave = JSON.parse(this.user);
    this.loading = true;
    this.admin.changePassword({
      password: this.password,
      username: this.userWillSave.username
    })
      .subscribe(async response => {
        this.loading = false;
        this.close()
        await Swal.fire('Listo', 'Contraseña actualizada', 'success');
      }, async ResponseError => {
        this.loading = false;
        await Swal.fire('Algo salio mal', ResponseError.error.detail + ' Intentalo nuevamente, si el problema persiste comunicate con soporte', 'error')
      });
  }


  noLetters(control: any) {
    control.setValue(control.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
  }

  nameCapitalized(name){
    return name.toLowerCase().charAt(0).toUpperCase() + name.toLowerCase().slice(1)
  }
}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offices-list',
  templateUrl: './offices-list.component.html',
  styleUrls: ['./offices-list.component.scss']
})
export class OfficesListComponent implements OnInit {
  rows = [];
  backupRows = [];
  closeResult: string;
  limit = 1000;
  offset = 0;
  constructor(private admin: AdminService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getOffices()
  }

  getOffices() {
    this.admin.getOfficies()
      .subscribe(response => {
        this.rows = response;
        this.backupRows = response;
      })
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

  goToEdit(row) {
    this.router.navigate(['/offices/edit/' + JSON.stringify(row)])
  }


  updateFilter(event) {
    const val = event.target.value;
    if (val == '' || !val) {
      return this.rows = this.backupRows;
    }
    console.log(val)
    // filter our data
    const temp = this.backupRows.filter(function (d) {
      return String(d.oficina).toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
  }

}

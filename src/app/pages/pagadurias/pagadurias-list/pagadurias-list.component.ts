import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagadurias-list',
  templateUrl: './pagadurias-list.component.html',
  styleUrls: ['./pagadurias-list.component.scss']
})
export class PagaduriasListComponent implements OnInit {
  rows = [];
  backupRows = [];
  limit = 1000;
  offset = 0;
  closeResult;
  constructor(
    private admin: AdminService,
    private router: Router,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getPagadurias()
  }


  getPagadurias() {
    this.admin.getPagadurias()
      .subscribe(response => {
        this.rows = response;
        this.backupRows = response;
      })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  close() {
    this.modalService.dismissAll()
  }

  goToEdit(row) {
    this.router.navigate(['/pagadurias/create/' + JSON.stringify(row)])
  }

  updateFilter(event) {
    const val = event.target.value;
    if (val == '' || !val) {
      return this.rows = this.backupRows;
    }
    console.log(val)
    // filter our data
    const temp = this.backupRows.filter(function (d) {
      return String(d.razon_social).toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
  }

}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  rows = [];
  backupRows = [];

  limit = 1000;
  offset = 0;
  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.admin
      .allUsers()
      .subscribe(users => {
        this.rows = users
        this.backupRows = users
      })
  }

  goToEdit(row) {
    this.router.navigate(['/users/edit/' + JSON.stringify(row)])
  }

  updateFilter(event) {
    const val = event.target.value;
    if (val == '' || !val) {
      return this.rows = this.backupRows;
    }
    console.log(val)
    // filter our data
    const temp = this.backupRows.filter(function (d) {
      return String(d.username).toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
  }

}

import { Component, OnInit } from '@angular/core';
import { HistoryCreditService } from '../services/history-credit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-history-credit',
  templateUrl: './search-history-credit.component.html',
  styleUrls: ['./search-history-credit.component.scss']
})
export class SearchHistoryCreditComponent implements OnInit {

  rows = [];
  backupRows = [];

  limit = 1000;
  offset = 0;

  constructor(private creditService: HistoryCreditService) { }

  ngOnInit() {
    this.loadHistorys()
  }

  loadHistorys() {
    this.creditService.all({
      limit: this.limit,
      offset: this.offset
    }).subscribe(data => {
      console.log(data)
      this.rows = data
      this.backupRows = data
    })
  }


  onScroll(ev) {
    if (ev.target) {
      console.log(ev.target.offsetHeight)
      console.log(ev)
    }
  }

  onActivate(id) {

    this.creditService.get(id).subscribe(Response => {
      window.open(
        Response.data,
        '_blank'
      );
    }, async err => {
      await Swal.fire('Lo sentimos', 'Ha ocurrido un problema al generar el PDF', 'error')
    })

  }


  
  onActivateLegalCheck(id) {

    this.creditService.getLegalCheck(id).subscribe(Response => {
      window.open(
        Response.data,
        '_blank'
      );
    }, async err => {
      await Swal.fire('Lo sentimos', 'Ha ocurrido un problema al generar el PDF', 'error')
    })

  }


  onActivateInfoComercial(id) {

    this.creditService.getInfoComercial(id).subscribe(Response => {
      window.open(
        Response.data,
        '_blank'
      );
    }, async err => {
      await Swal.fire('Lo sentimos', 'Ha ocurrido un problema al generar el PDF', 'error')
    })

  }

  updateFilter(event) {
    const val = event.target.value;
    if (val == '' || !val) {
      return this.rows = this.backupRows;
    }
    console.log(val)
    // filter our data
    const temp = this.backupRows.filter(function (d) {
      return String(d.identificacion).toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
  }
}

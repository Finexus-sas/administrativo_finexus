import { Component, OnInit } from '@angular/core';
import { HistoryCreditService } from 'src/app/services/history-credit.service';
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {
  loading: boolean = false
  filters = {
    "id_solicitud": undefined,
    "estado": undefined,
    "id_certificado": undefined
  }
  rows = [];
  backupRows = [];
  limit = 1000;
  offset = 0;
  currentRow;
  states = [
    {
      id: 'SOL',
      name: 'Solicitud'
    },
    {
      id: 'RAD',
      name: 'Radicado'
    },
    {
      id: 'VAI',
      name: 'Validacion de identidad'
    },
    {
      id: 'VAL',
      name: 'Solicitud validada'
    },
    {
      id: 'CEV',
      name: 'Certificado enviado'
    },
    {
      id: 'REC',
      name: 'Solicitud rechazada'
    }
  ]

  certificados = [
    {
      "id": 2,
      "nombre_certificado": "PAZ Y SALVO"
    },
    {
      "id": 1,
      "nombre_certificado": "CERTIFICADO DE DEUDA"
    },
    {
      "id": 3,
      "nombre_certificado": "SALDO A FAVOR"
    }
  ]
  constructor(private historyService: HistoryCreditService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getRequestsList();
  }


  getRequestsList() {
    if (this.filters.id_certificado) {
      this.filters.id_certificado = parseInt(this.filters.id_certificado);
    }
    this.historyService.requestsAsesor(this.filters)
      .subscribe(response => {
        console.log(response);
        this.rows = response;
        this.backupRows = response;
      })
  }

  showFile(doc) {
    console.log(doc);
    window.location.href = environment.apiPath + "/" + doc.ruta.replace('api', '');
  }

  validate() {
    this.historyService.validateFile({ "id_solicitud": this.currentRow.id_solicitud })
      .subscribe(async response => {
        console.log(response);
        this.close();
        await Swal.fire('Listo', 'Documento validado correctamente', 'success');
        this.getRequestsList();
      })
  }


  open(content, row) {
    this.currentRow = row;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    });
  }

  close() {
    this.modalService.dismissAll()
  }

  generatePDFPazYSalvo(row) {
    this.loading = true;
    this.historyService.generatePazYSalvo(row.id_solicitud)
      .subscribe(async response => {
        this.loading = false;
        if (response && response.length > 0) {
          const responseRequest = response[0];
          await Swal.fire('Listo', 'Documento generado correctamente y enviado al correo ' + responseRequest.email, 'success');
        } else {
          await Swal.fire('Error', 'El documento ya fue generado', 'error');
        }
      }, async err => {
        this.loading = false;
        await Swal.fire('Error', 'Error generando el certificado de paz y salvo, intentelo nuevamente', 'error');
      })
  }


  generateCertificadoDeDeuda(row) {
    this.loading = true;
    this.historyService.generateCertificadoDeDeuda(row.id_solicitud)
      .subscribe(async response => {
        this.loading = false;
        if (response && response.length > 0) {
          const responseRequest = response[0];
          await Swal.fire('Listo', 'Documento generado correctamente y enviado al correo ' + responseRequest.email, 'success');
        } else {
          await Swal.fire('Error', 'El documento ya fue generado', 'error');
        }
      }, async err => {
        this.loading = false;
        await Swal.fire('Error', 'Error generando el certificado de deuda, intentelo nuevamente', 'error');
      })
  }



  downloadCertificadoDeDeuda(row) {
    this.loading = true;
    this.historyService.downloadCertificadoDeDeuda(row.id_solicitud)
      .subscribe(async response => {
        this.loading = false;
        if(response && response.length > 0){
          const request = response[0];
          this.download(row.certificado+"_"+request.cedula ,request.file)
        }else{
          await Swal.fire('Error', 'No fue posible generar el documento, intentelo nuevamente o comuniquese con soporte', 'error');
        }
      }, async err => {
        this.loading = false;
        await Swal.fire('Error', 'No fue posible generar el documento, intentelo nuevamente o comuniquese con soporte', 'error');
      })
  }


  downloadPazYSalvo(row) {
    this.loading = true;
    this.historyService.downloadPazYSalvo(row.id_solicitud)
      .subscribe(async response => {
        this.loading = false;
        if(response && response.length > 0){
          const request = response[0];
          this.download(row.certificado+"_"+request.cedula ,request.file)
        }else{
          await Swal.fire('Error', 'No fue posible generar el documento, intentelo nuevamente o comuniquese con soporte', 'error');
        }
      }, async err => {
        this.loading = false;
        await Swal.fire('Error', 'No fue posible generar el documento, intentelo nuevamente o comuniquese con soporte', 'error');
      })
  }


  urltoFile(url, filename, mimeType) {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }


  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/pdf;base64,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }


}

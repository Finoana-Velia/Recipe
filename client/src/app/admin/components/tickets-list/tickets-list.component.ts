import { Component, OnInit } from '@angular/core';
import { PageResponse, Pagination } from '../../../core/models/PageResponse';
import { InvoiceService } from '../../../client/services/invoice.service';
import { NgForOf } from '@angular/common';
import { LoadingComponent } from '../../../core/components/loading/loading.component';
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';
import { formatDate } from '../../../client/util/FormatDate';
import { DangerDialogComponent } from '../../../core/components/danger-dialog/danger-dialog.component';
import { DialogResponse } from '../../../core/models/DialogResponse';
import { DialogConfirmComponent } from '../../../core/components/dialog-confirm/dialog-confirm.component';
import { InvoiceRequest } from '../../../client/models/Invoice';

@Component({
  selector: 'app-tickets-list',
  imports: [
    NgForOf,
    LoadingComponent,
    PaginationComponent,
    DangerDialogComponent,
    DialogConfirmComponent
  ],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent implements OnInit{

  pageResponse! : PageResponse;
  search : string = "";

  dialogDanger : boolean = false;
  dialogConfirm : boolean = false;
  idSelected! : number;

  ticket : any;
  
  constructor(private invoiceService : InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.findAll().subscribe(
      response => this.pageResponse = response
    );
  }

  dataFromPagination(event : Pagination) {
    this.invoiceService.findAll(this.search,event.page,event.size).subscribe(
      response => this.pageResponse = response
    );
  }

  exportTicket(id : number) {
    this.invoiceService.exportRequest(id).subscribe(
      response => {
        let downloadUrl = URL.createObjectURL(response);
        let link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "invoice_" + id + formatDate(new Date()) + ".pdf";
        link.click();
      }
    );
  }

  toggleDialogDanger(id : number) {
    this.dialogDanger = true;
    this.idSelected = id;
  }

  toggleDialogConfirm(id : number) {
    this.dialogConfirm = true;
    this.idSelected = id;
  }

  dataFromDialogDanger(event : DialogResponse) {
    this.dialogDanger = event.state;
    if(event.response && event.id) {
      this.invoiceService.deleteInvoice(event.id).subscribe(
        response => {
          console.log(response);
          location.reload();
        }
      )
    }
  }

  dataFromDialogConfirm(event : DialogResponse) {
    this.dialogConfirm = event.state;
    if(event.response && event.id) {
      this.invoiceService.confirmDelivery(event.id).subscribe(
        response => location.reload()
      )
    }
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions, EventClickArg } from '@fullcalendar/core/index.js';
import { Invoice, Statistics } from '../../../client/models/Invoice';
import { InvoiceService } from '../../../client/services/invoice.service';
import { ProductService } from '../../service/product.service';
import { PageResponse } from '../../../core/models/PageResponse';
import { NgForOf } from '@angular/common';
import { LoadingComponent } from '../../../core/components/loading/loading.component';
@Component({
  selector: 'app-dashboard',
  imports: [
   FullCalendarModule,
   NgForOf,
   LoadingComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit,AfterViewInit{

  invoices! : any[];
  invoice! : any;
  products! : PageResponse;
  stat! : Statistics;

  options : CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    eventClick: (arg) => this.handleEventClick(arg),
  }

  constructor(
    private invoiceService : InvoiceService,
    private productService : ProductService
  ) {}

  ngAfterViewInit(): void {
    this.invoiceService.findAll().subscribe(
      response => {
        this.invoices = response.content;
        const events : any[] = [];
        if(this.invoices.length !== 0) {
          this.invoices.forEach((data : any) => {
            events.push({
              id : data.id,
              title : data.reference,
              date : data.date,
              color : data.delivered ? 'green' : 'blue'
            })
          });
          this.options = { events : events};
        }
      }
    );
  }

  ngOnInit(): void {
    this.productService.findAll().subscribe(
      response => this.products = response
    );

    this.invoiceService.statistic().subscribe(
      response => this.stat = response
    );
  }

  handleEventClick(arg : any) {
    console.log(arg.event.id);
  }

  findImage(id : number) {
    return this.productService.getImage(id);
  }

}

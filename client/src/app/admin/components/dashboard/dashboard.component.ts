import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions, EventClickArg } from '@fullcalendar/core/index.js';
import { Invoice } from '../../../client/models/Invoice';
import { InvoiceService } from '../../../client/services/invoice.service';
@Component({
  selector: 'app-dashboard',
  imports: [
   FullCalendarModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  invoices! : any[];
  invoice! : any;

  options : CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    eventClick: (arg) => this.handleEventClick(arg),
  }

  constructor(private invoiceService : InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.findAll().subscribe(
      response => {
        this.invoices = response.content;
        const events : any[] = [];
        this.invoices.forEach((data : any) => {
          events.push({
            id : data.id,
            title : data.reference,
            date : data.date
          })
        });
        this.options = { events : events};
      }
    );
  }

  handleEventClick(arg : any) {
    console.log(arg.event.id);
  }

}

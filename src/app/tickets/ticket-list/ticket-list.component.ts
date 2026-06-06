import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];

  page: number = 1;
  limit: number = 10;
  searchTerm!: string;
  status!: string;
  priority!: string;
  mode = 'all';
  pageTitle: string = 'Tickets';
  searchSubject = new Subject<string>();

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.mode = this.route.snapshot.data['mode'] || 'all';

    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.searchTerm = value;

        this.page = 1;

        this.loadTickets();
      });

    switch (this.mode) {
      case 'assigned':
        this.pageTitle = 'Assigned Tickets';
        break;

      case 'resolved':
        this.pageTitle = 'Resolved Tickets';
        break;

      case 'my':
        this.pageTitle = 'My Tickets';
        break;

      default:
        this.pageTitle = 'All Tickets';
    }

    this.loadTickets();
  }

  displayedColumns: string[] = ['ticketNumber', 'title', 'status', 'priority'];

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }

  statusChanged(event: Event): void {
    const target = event.target as HTMLSelectElement;

    this.status = target.value;

    this.page = 1;

    this.loadTickets();
  }

  nextPage() {
    this.page++;

    this.loadTickets();
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;

      this.loadTickets();
    }
  }

  priorityChanged(event: Event): void {
    const target = event.target as HTMLSelectElement;

    this.priority = target.value;

    this.page = 1;

    this.loadTickets();
  }

  loadTickets(): void {
    let assignedTo;
    let createdBy;
    let status = this.status;

    switch (this.mode) {
      case 'assigned':
        assignedTo = 'me';
        break;

      case 'my':
        createdBy = 'me';
        break;

      case 'resolved':
        assignedTo = 'me';
        status = 'RESOLVED';
        break;
    }

    this.ticketService
      .getTickets(
        this.page,
        this.limit,
        this.searchTerm,
        status,
        this.priority,
        assignedTo,
        createdBy,
        this.mode,
      )
      .subscribe({
        next: (response: any) => {
          this.tickets = response.tickets;
        },

        error: (err) => {
          Swal.fire({
            text: err.error.message,
          });
        },
      });
  }

  viewTicket(id: string) {
    this.router.navigate(['/tickets', id]);
  }
}

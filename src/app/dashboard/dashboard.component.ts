import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketService } from '../services/ticket/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  currentDate = new Date();
  totalTickets = 0;
  openTickets = 0;
  assignedTickets = 0;
  inProgressTickets = 0;
  resolvedTickets = 0;
  recentTickets: any[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.getRecentTickets();
  }

  getRecentTickets(): void {
    this.ticketService.getTickets(1, 10, '', '', '').subscribe({
      next: (response: any) => {
        this.recentTickets = response.tickets.slice(0, 4);
      },

      error: (err) => {
        Swal.fire({
          text: err.error.message,
        });
      },
    });
  }

  loadDashboard(): void {
    this.ticketService.getDashboardStats().subscribe((res: any) => {

      this.totalTickets = res.totalTickets;

      this.openTickets = res.openTickets;

      this.assignedTickets = res.assignedTickets;

      this.inProgressTickets = res.inProgressTickets;

      this.resolvedTickets = res.resolvedTickets;

    });
  }
}

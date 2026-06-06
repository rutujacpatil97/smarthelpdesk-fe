import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { TicketService } from '../../services/ticket/ticket.service';
import { InitialsPipe } from '../../pipes/initials.pipe';
import { UserService } from '../../services/User/user.service';
4;
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
  imports: [CommonModule, FormsModule, DatePipe, InitialsPipe],
})
export class TicketDetailsComponent implements OnInit {
  ticket: any;
  engineers: any[] = [];
  selectedEngineer = '';
  currentUser: any;
  selectedStatus = '';
  statusComment = '';
  newComment = '';

  constructor(
    private ticketService: TicketService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.loadTicket();
    if (this.currentUser?.role == 'ADMIN') {
      this.loadEngineers();
    }
  }

  loadTicket(): void {
    const id = this.route.snapshot.params['id'];
    this.ticketService.getTicketById(id).subscribe({
      next: (response: any) => (this.ticket = response),
    });
  }

  loadEngineers(): void {
    this.userService.getUsers(1, 100, '', 'ENGINEER').subscribe({
      next: (response: any) => {
        this.engineers = response;
      },
    });
  }

  assignTicket(): void {
    if (!this.selectedEngineer) {
      Swal.fire({
        icon: 'warning',
        title: 'Select an engineer',
      });
      return;
    }

    this.ticketService
      .assignTicket(this.ticket._id, this.selectedEngineer)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Ticket Assigned',
          });

          this.loadTicket();
        },

        error: (err) => {
          Swal.fire({
            icon: 'warning',
            title: 'Assignment Failed',
            text: err.error.message,
          });
        },
      });
  }

  assignToMe(): void {
    this.ticketService
      .assignTicket(this.ticket._id, this.currentUser.id)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Ticket Assigned',
          });

          this.loadTicket();
        },

        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Assignment Failed',
            text: err.error.message,
          });
        },
      });
  }

  updateStatus(): void {
    if (!this.selectedStatus) {
      return;
    }

    if (!this.statusComment.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Comment required',
      });

      return;
    }

    this.ticketService
      .updateStatus(this.ticket._id, this.selectedStatus, this.statusComment)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Status Updated',
          });

          this.statusComment = '';

          this.loadTicket();
        },
      });
  }

  addComment(): void {
    if (!this.newComment.trim()) {
      return;
    }

    this.ticketService.addComment(this.ticket._id, this.newComment).subscribe({
      next: (response: any) => {
        this.ticket = response;

        this.newComment = '';

        Swal.fire({
          icon: 'success',
          title: 'Comment Added',
        });

        this.newComment = '';

        this.loadTicket();

      },
    });
  }

  reopenTicket(): void {
    this.ticketService
      .updateStatus(this.ticket._id, 'REOPENED', 'Ticket reopened by employee')
      .subscribe({
        next: (response: any) => {
          this.ticket = response;

          Swal.fire({
            icon: 'success',
            title: 'Ticket Reopened',
          });

          this.loadTicket();
        },
      });
  }
}

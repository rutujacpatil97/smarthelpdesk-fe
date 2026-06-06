import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Router } from '@angular/router';

import { TicketService } from '../../services/ticket/ticket.service';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})
export class CreateTicketComponent {
  ticketForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router,
  ) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['MEDIUM'],
    });
  }

  createTicket(): void {
    if (this.ticketForm.invalid) {
      return;
    }

    this.ticketService.createTicket(this.ticketForm.value).subscribe({
      next: () => {
        this.router.navigate(['/my-tickets']);
      },
    });
  }
}

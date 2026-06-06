import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { CreateTicketComponent } from './tickets/create-ticket/create-ticket.component';
import { authGuard } from './core/guards/auth.guard';
import { TicketDetailsComponent } from './tickets/ticket-details/ticket-details.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'tickets',
    component: TicketListComponent,
    canActivate: [authGuard],
    data: {
      mode: 'all',
    },
  },
  {
    path: 'my-tickets',
    component: TicketListComponent,
    canActivate: [authGuard],
    data: {
      mode: 'my',
    },
  },
  {
    path: 'assigned-tickets',
    component: TicketListComponent,
    canActivate: [authGuard],
    data: {
      mode: 'assigned',
    },
  },
  {
    path: 'resolved-tickets',
    component: TicketListComponent,
    canActivate: [authGuard],
    data: {
      mode: 'resolved',
    },
  },
  {
    path: 'create-ticket',
    component: CreateTicketComponent,
    canActivate: [authGuard]
  },
  {
    path: 'tickets/:id',
    component: TicketDetailsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

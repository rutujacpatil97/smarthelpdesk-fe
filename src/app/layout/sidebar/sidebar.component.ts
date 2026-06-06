import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  role = JSON.parse(localStorage.getItem('role') || '');

  menuItems: MenuItem[] = [];

  constructor(private router: Router) {
    this.loadMenu();
  }

  private loadMenu(): void {
    switch (this.role) {
      case 'ADMIN':
        this.menuItems = [
          {
            label: 'Dashboard',
            icon: 'dashboard',
            route: '/dashboard',
          },
          {
            label: 'All Tickets',
            icon: 'confirmation_number',
            route: '/tickets',
          },
          {
            label: 'Users',
            icon: 'group',
            route: '/users',
          }
        ];

        break;

      case 'ENGINEER':
        this.menuItems = [
          {
            label: 'Dashboard',
            icon: 'dashboard',
            route: '/dashboard',
          },
          {
            label: 'All Tickets',
            icon: 'confirmation_number',
            route: '/tickets',
          },
          {
            label: 'Assigned Tickets',
            icon: 'engineering',
            route: '/assigned-tickets',
          },
          {
            label: 'Resolved Tickets',
            icon: 'task_alt',
            route: '/resolved-tickets',
          },
        ];

        break;

      case 'EMPLOYEE':
      default:
        this.menuItems = [
          {
            label: 'Dashboard',
            icon: 'dashboard',
            route: '/dashboard',
          },
          {
            label: 'My Tickets',
            icon: 'assignment',
            route: '/my-tickets',
          },
          {
            label: 'Create Ticket',
            icon: 'add_circle',
            route: '/create-ticket',
          },
        ];

        break;
    }
  }
}

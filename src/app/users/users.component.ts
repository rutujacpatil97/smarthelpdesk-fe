import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../services/User/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  displayedColumns = ['name', 'email', 'role', 'actions'];

  page = 1;
  limit = 10;
  search = '';
  roles = ['ADMIN', 'ENGINEER', 'EMPLOYEE'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.page, this.limit, this.search).subscribe({
      next: (response: any) => {
        this.users = response;
      },
    });
  }

  searchUsers(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.search = target.value;

    this.loadUsers();
  }

  updateRole(user: any, event: Event): void {
    const target = event.target as HTMLSelectElement;

    const newRole = target.value;

    Swal.fire({
      title: 'Change Role?',
      text: `${user.name} will become ${newRole}`,
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (!result.isConfirmed) {
        this.loadUsers(); // reload table

        return;
      }

      this.userService.updateRole(user._id, newRole).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Role Updated',
          });

          this.loadUsers();
        },

        error: (err) => {
          this.loadUsers();

          Swal.fire({
            icon: 'error',
            title: 'User role update Failed!',
            text: err.error.message
          });
        },
      });
    });
  }

  deleteUser(id: string): void {
    Swal.fire({
      title: 'Delete User?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ef4444',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: (response: any) => {
            if (response.message == 'User deleted') {
              Swal.fire({
                icon: 'success',
                title: 'Deleted',
                text: 'User deleted successfully',
                timer: 2000,
                showConfirmButton: false,
              });
              this.loadUsers();
            }
          },

          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Unable to delete user',
            });
          },
        });
      }
    });
  }
}

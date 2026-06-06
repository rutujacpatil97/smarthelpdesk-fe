import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.baseUrl}/users`

  constructor(private http: HttpClient) {}

  getUsers(page: number, limit: number, search: string, role?: string) {
    let params: any = {
      page,
      limit,
    };

    if (search) {
      params.search = search;
    }

    if (role) {
      params.role = role;
    }

    return this.http.get(this.apiUrl, { params });
  }

  updateRole(id: string, role: string) {
    return this.http.patch(`${this.apiUrl}/${id}/role`, {
      role,
    });
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

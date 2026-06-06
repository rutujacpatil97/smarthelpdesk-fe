import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = `${environment.baseUrl}/tickets`

  constructor(private http: HttpClient) {}

  getTickets(
    page: number,
    limit: number,
    search?: string,
    status?: string,
    priority?: string,
    assignedTo?: string,
    createdBy?: string,
    mode?: string,
  ) {
    let params: any = {
      page,
      limit,
    };

    if (search) params.search = search;
    if (status) params.status = status;
    if (priority) params.priority = priority;
    if (assignedTo) params.assignedTo = assignedTo;
    if (createdBy) params.createdBy = createdBy;
    if (mode) params.mode = mode;

    return this.http.get(this.apiUrl, { params });
  }

  createTicket(body: any) {
    return this.http.post(this.apiUrl, body);
  }

  assignTicket(id: string, assignedTo: string) {
    return this.http.patch(`${this.apiUrl}/${id}/assign`, {
      assignedTo,
    });
  }

  getTicketById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, status: string, comment: string) {
    return this.http.patch(`${this.apiUrl}/${id}/status`, {
      status,
      comment,
    });
  }

  addComment(id: string, comment: string) {
    return this.http.post(`${this.apiUrl}/${id}/comment`, { comment });
  }

  getDashboardStats() {
    return this.http.get(`${this.apiUrl}/dashboard/stats`);
  }
}

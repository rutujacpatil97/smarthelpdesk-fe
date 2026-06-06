import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitialsPipe } from '../../pipes/initials.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [InitialsPipe]
})
export class HeaderComponent implements OnInit{
  constructor(private router: Router) {}

  user: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }

  logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}

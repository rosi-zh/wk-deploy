import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isCollapsed = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(): void {
    this.toggleCollapse();
    this.authService.logout()
    this.router.navigate(['/']);
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}

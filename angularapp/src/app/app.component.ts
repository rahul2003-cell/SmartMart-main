import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart Mart';
  showLogoutPopup: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

   confirmLogout(): void {
    this.authService.logout();
    this.showLogoutPopup = false;
    this.router.navigate(['/home']);
  }

  cancelLogout(): void {
    this.showLogoutPopup = false;
  }


  isUserLoggedIn(): boolean {
    return this.authService.isLoggedin();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isUser(): boolean {
    return this.authService.isUser();
  }

  logout(): void {
    this.authService.logout();
  }
  
openLogoutPopup(): void {
  this.showLogoutPopup = true;
}


}

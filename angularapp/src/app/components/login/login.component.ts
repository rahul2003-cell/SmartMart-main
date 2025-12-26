import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
        response => {
          this.router.navigate(['/home']);
        },
        error => {
          // Handle error responses
          console.error('Login failed', error);
        }
      );
    }
  }


  ngOnInit(): void {
  }

}

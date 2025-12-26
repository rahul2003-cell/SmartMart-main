import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm:FormGroup
  users:User[] = [];
  constructor(private fb:FormBuilder,private service:AuthService,private router:Router, private snackBar: MatSnackBar){

    this.registerForm = this.fb.group({
      username:['',Validators.required],
      email:['',Validators.required],
      password: ['',[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/)]],
      confirmPassword:['',Validators.required],
      mobileNumber:['',Validators.required],
      userRole:['',Validators.required],
    },  {validators: this.passwordMatchValidator })
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.service.register(this.registerForm.value).subscribe(
        (result) => {
          this.registerForm.reset();
          this.snackBar.open('Registration successful', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
          this.router.navigate(['/login']);
        },
        (error) => {
          this.registerForm.reset();
          this.snackBar.open('Registration not done due to existing Username', 'Close', { duration: 4000, panelClass: ['error-snackbar'] });
        }
      );
    }
  }
  ngOnInit(): void {
  }


}

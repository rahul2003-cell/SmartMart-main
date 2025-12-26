import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { AdminviewordersComponent } from './components/adminvieworders/adminvieworders.component';
import { AdminviewuserdetailsComponent } from './components/adminviewuserdetails/adminviewuserdetails.component';

import { AuthguardComponent } from './components/authguard/authguard.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UseraddcartComponent } from './components/useraddcart/useraddcart.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UsernavbarComponent } from './components/usernavbar/usernavbar.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewordersComponent } from './components/uservieworders/uservieworders.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminaddproductComponent } from './components/adminaddproduct/adminaddproduct.component'
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpIntercepterAuthService } from './services/http-interceptor-auth.service';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminviewuserprofileComponent } from './components/adminviewuserprofile/adminviewuserprofile.component';

import { AuthGuard } from './guards/auth.guard';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    AdminviewproductComponent,
    AdminnavbarComponent,
    AdminviewordersComponent,
    AdminviewuserdetailsComponent,
    AdminaddproductComponent,
    AdminviewfeedbackComponent,
    AuthguardComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    UseraddcartComponent,
    UseraddfeedbackComponent,
    UsernavbarComponent,
    UserviewfeedbackComponent,
    UserviewordersComponent,
    UserviewproductComponent,
    FooterComponent,
    PaymentComponent,
    AdminviewuserprofileComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSliderModule,
    

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterAuthService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

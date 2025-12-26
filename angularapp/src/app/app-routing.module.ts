import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { AdminviewordersComponent } from './components/adminvieworders/adminvieworders.component';
import { AdminviewuserdetailsComponent } from './components/adminviewuserdetails/adminviewuserdetails.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { UseraddcartComponent } from './components/useraddcart/useraddcart.component';
import { UserviewordersComponent } from './components/uservieworders/uservieworders.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminaddproductComponent } from './components/adminaddproduct/adminaddproduct.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminviewuserprofileComponent } from './components/adminviewuserprofile/adminviewuserprofile.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'payment', component: PaymentComponent },

  { path: 'admin/products', component: AdminviewproductComponent,  canActivate: [AuthGuard],data: {role : 'ADMIN'} },
  { path: 'admin/orders', component: AdminviewordersComponent,  canActivate: [AuthGuard], data: {role : 'ADMIN'}},
  { path: 'admin/users', component: AdminviewuserdetailsComponent, canActivate: [AuthGuard], data: {role : 'ADMIN'}},
  {path: 'admin/add-product', component: AdminaddproductComponent, canActivate: [AuthGuard], data: {role : 'ADMIN'}},
  {path: 'admin/view-feedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard], data: {role : 'ADMIN'}},
  { path: 'admin/add-product/:id', component: AdminaddproductComponent, canActivate: [AuthGuard],data: {role : 'ADMIN'} },
    {path: 'admin/user-profile/:id', component: AdminviewuserprofileComponent,canActivate: [AuthGuard],data: {role : 'ADMIN'} },

  { path: 'user/products', component: UserviewproductComponent, canActivate: [AuthGuard]},
  { path: 'user/cart', component: UseraddcartComponent, canActivate: [AuthGuard] },
  { path: 'user/orders', component: UserviewordersComponent, canActivate: [AuthGuard] },
  { path: 'user/feedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard] },
  { path: 'user/view-feedback', component: UserviewfeedbackComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent }

  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

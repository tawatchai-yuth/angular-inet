import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PackageComponent } from './package/package.component';
import { RegisterComponent } from './register/register.component';
import { RegisterusersComponent } from './registerusers/registerusers.component';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registerusers', component: RegisterusersComponent },
  { path: 'home', component: HomeComponent,canActivate: [AuthguardGuard] },
  { path: 'select/:id', component: PackageComponent,canActivate: [AuthguardGuard] },
  { path: 'register/:username/:id', component: RegisterComponent,canActivate: [AuthguardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

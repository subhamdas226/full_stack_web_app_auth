import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  
  {path : 'login' , component : LoginComponent},
  {path : 'register' , component : RegisterComponent},
  {path : '' , redirectTo : '/register', pathMatch:'full'},
  {path : 'main-page' , component : MainPageComponent , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

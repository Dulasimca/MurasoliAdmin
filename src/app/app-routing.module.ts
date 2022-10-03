import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailynewEntryComponent } from './dailynew-entry/dailynew-entry.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login-page', pathMatch: 'full' },
  {path: 'login-page', component:LoginComponent},
  {path: 'daily-new-entry', component:DailynewEntryComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryMasterComponent } from './country-master/country-master.component';
import { DailynewEntryComponent } from './dailynew-entry/dailynew-entry.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DistrictMasterEntryComponent } from './district-master-entry/district-master-entry.component';
import { FlashNewsEntryComponent } from './flash-news-entry/flash-news-entry.component';
import { LoginComponent } from './login/login.component';
import { MainNewsEntryComponent } from './main-news-entry/main-news-entry.component';
import { StateMasterEntryComponent } from './state-master-entry/state-master-entry.component';
import { UserMasterComponent } from './user-master/user-master.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login-page', pathMatch: 'full' },
  {path: 'login-page', component:LoginComponent},
  {path: 'daily-news-entry', component:DailynewEntryComponent},
  {path: 'main-news-entry', component:MainNewsEntryComponent},
  {path: 'flash-news-entry', component:FlashNewsEntryComponent},
  {path: 'user-master', component:UserMasterComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'district-master', component:DistrictMasterEntryComponent},
  {path: 'state-master', component:StateMasterEntryComponent},
  {path: 'country-master', component:CountryMasterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

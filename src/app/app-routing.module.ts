import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryMasterComponent } from './country-master/country-master.component';
import { DailyNewspaperUploadComponent } from './daily-newspaper-upload/daily-newspaper-upload.component';
import { DailynewEntryComponent } from './dailynew-entry/dailynew-entry.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DistrictMasterEntryComponent } from './district-master-entry/district-master-entry.component';
import { FlashNewsEntryComponent } from './flash-news-entry/flash-news-entry.component';
import { LoginComponent } from './login/login.component';
import { MainNewsEntryComponent } from './main-news-entry/main-news-entry.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './Services/authguard';
import { StateMasterEntryComponent } from './state-master-entry/state-master-entry.component';
import { UserMasterComponent } from './user-master/user-master.component';

const routes: Routes = [
  { path:'',   redirectTo:'/login-page', pathMatch:'full' },
  {path: 'login-page', component:LoginComponent},
  {path: 'daily-news-entry', component:DailynewEntryComponent, canActivate:[AuthGuard]},
  {path: 'main-news-entry', component:MainNewsEntryComponent, canActivate:[AuthGuard]},
  {path: 'flash-news-entry', component:FlashNewsEntryComponent, canActivate:[AuthGuard]},
  {path: 'user-master', component:UserMasterComponent, canActivate:[AuthGuard]},
  {path: 'district-master', component:DistrictMasterEntryComponent, canActivate:[AuthGuard]},
  {path: 'state-master', component:StateMasterEntryComponent, canActivate:[AuthGuard]},
  {path: 'country-master', component:CountryMasterComponent, canActivate:[AuthGuard]},
  {path: 'menu', component:MenuComponent},
  {path: 'newspaper-upload', component:DailyNewspaperUploadComponent, canActivate:[AuthGuard]},
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
